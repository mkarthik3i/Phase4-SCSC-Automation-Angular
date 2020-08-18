
import {element,by, browser,protractor} from 'protractor';

import UtilsPage = require('../utils/utils');
const UtilPage: UtilsPage = new UtilsPage();

import SearchPage = require('./../Pages/SearchPage');
const search: SearchPage = new SearchPage();

import LoginPage = require('./../Pages/LoginPage');
const login: LoginPage = new LoginPage();

var until = protractor.ExpectedConditions;
var api = require('../utils/api');

let get_barcodes: any;
class CollectionPage {        
//----------------------Collection Page -----------------------------------------------------------

txt_barcode                     = element(by.id("barcodeFieldId")); //Barcode Input box
btn_displayRecords              = element(by.id("displayRecords"));// Display Records
btn_clearSearch                 = element(by.id("clearSearch"))//clearSearch
inp_notesListId                 = element(by.id("notesListId"));//Multiple item barcodes separated by commas(,) can be added to retrieve the records.
err_msg_no_result_found         = element(by.id("errorMessageSpanId"));//No results found.
collection_search_result        = element(by.id("collection-result-table_wrapper"));//Collection Search Results
err_msg_barcode_not_found       = element(by.id("barcodesNotFoundErrorMessageSpanId"));//Barcode(s) not found -
lnk_barcode_title               = element(by.id("titleLinkId")); //barcode title
radio_edit_cgd                  = element(by.id("editCgdclick"));//Edit CGD  radio button
radio_deaccession               = element(by.xpath("//div[@class='radio-inline radio padding-left-0 margin-left-15']//label[1]")); //Deaccession radio button
get_collection_page             = element(by.id("collectionContentId"));
txt_cgd_change_notes            = element(by.id("CGDChangeNotes")); //CGD Change Notes *
btn_save                        = element(by.id("collectionUpdateCgdButton"));// Save button
icon_close                      = element(by.className("close"));//close icon x

success_msg                     = element(by.xpath("//*[@id='collectionUpdateMessage']/div/div/span[2]"));// The CGD has been successfully updated.
txt_error_msg                   = element(by.className("bg-danger")).all(by.tagName("span"));//Deaccessioning the item failed 

//Edit CGD
get_collection_details_text     = element(by.className("modal-body"));// Collection details page
select_new_cgd                  = element(by.id("newCGD"));// New CGD
item_cgd_value                  = element(by.id("cgdSpanId"));//CGD value
err_msg_cgdNotes                = element(by.id("cgdNotesErrorMessage"));//Please enter CGD change notes.
err_msg_cgd                     = element(by.id("cgdErrorMessage"));//CGD
//Deaccession
err_msg_delivery_location       = element(by.id("locationErrorMessage"));//Delivery Location
err_msg_deaccessionNotes        = element(by.id("deaccessionNotesErrorMessage"));// deaccessionNotesErrorMessage
btn_collectionDeaccession       = element(by.id("collectionDeaccessionButton")); //Deaccession Item
select_delivery_location        = element(by.id("DeliveryLocation"));//Delivery Location select box
txt_deaccession_notes           = element(by.id("DeaccessionNotes"));//Deaccession Notes 
//-------------------------------------------------------------------------------------------------------

async verify_elements(table_value){
    switch(table_value){
        case 'search box' :
            await browser.wait(until.visibilityOf(this.txt_barcode), 20000, "Barcode field hasn't displayed");
            break;
        case 'Display records button' :
            await browser.wait(until.visibilityOf(this.btn_displayRecords), 20000, "Display Records button hasn't displayed");
            break;
        case 'Note text' :
            await browser.wait(until.visibilityOf(this.inp_notesListId), 20000, "Collection Notes hasn't displayed");
            break;
        case 'Clear Serach' :
            await browser.wait(until.visibilityOf(this.btn_clearSearch), 20000, "Clear Serach button hasn't displayed");
            break;

    };
};

async get_barcode_in_scsb_las(barcode_status: any, owning_instituation: any, txt_shared: any){
        await search.image_showFacetsIcon.click();
        await browser.sleep(1000);
        await search.click_facts(barcode_status);
        if(txt_shared == 'Shared'){
            await search.click_facts('Private');
            await search.click_facts('Open');
        };
        await search.get_items_details_as_per_instituation(owning_instituation);
        get_barcodes = await search.get_available_barcode_from_las();
        if(get_barcodes.indexOf('T') !== -1){
            await browser.wait(until.visibilityOf(this.txt_barcode), 1000, get_barcodes);
        };
        return get_barcodes[0];
}

async choose_new_cgd(current_cgd: any){
    await browser.sleep(3000);
    switch(current_cgd){
        case 'Open' :
            await UtilPage.selectDropdownByText('Private', "New CGD value hasn't displayed");
            return 'Private'
        case 'Shared' :
            await UtilPage.selectDropdownByText('Open', "New CGD value hasn't displayed");
            return 'Open'
        case 'Private' :
            await UtilPage.selectDropdownByText('Shared', "New CGD value hasn't displayed");
            return 'Shared'
    }
};

async verify_error(err_text: any){
    await browser.sleep(5000);
    switch(err_text){
        case 'Choose a new CGD.' :
            return await this.err_msg_cgd.getText();
        case 'Please enter CGD change notes.' :
            await browser.sleep(3000);
            let get_cgd_value = await this.select_new_cgd.getAttribute('value');
            await this.choose_new_cgd(get_cgd_value);
            await browser.sleep(1000);
            await this.btn_save.click();
            await browser.sleep(1000);
            return await this.err_msg_cgdNotes.getText();
        case 'This is a mandatory field.' :
            let dsfds =this.err_msg_delivery_location.getText();
            return await this.err_msg_delivery_location.getText();
        case 'Please enter deaccession notes.' :
            return await this.err_msg_deaccessionNotes.getText();
    }
};

async choose_delivery_location(){
    await browser.sleep(3000);
    await this.select_delivery_location.click();
    let dl_list = await this.select_delivery_location;
    let options = await dl_list.all(by.tagName('option'));

    let dl: string[] = new Array(50);

    for(let i=0; options.length>i; i++){
        dl[i] = await options[i].getText();
    }

    let delivery_location = dl.filter(item => item);

    let delivery_location_txt = delivery_location[Math.floor(Math.random() * delivery_location.length)];
    await this.select_delivery_location.sendKeys(delivery_location_txt);
    console.log('rr')
}
    
};
export = CollectionPage;