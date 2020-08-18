
import {element,by, browser,protractor} from 'protractor';

import UtilsPage = require('../utils/utils');
const UtilPage: UtilsPage = new UtilsPage();

var until = protractor.ExpectedConditions;
var api = require('../utils/api');

class SearchPage {        
//----------------------Search Page -----------------------------------------------------------

txt_search_box               = element(by.id("fieldValue")); //Search Input box
lnk_logout                   = element(by.className('logout')); // Logout button
image_showFacetsIcon         = element(by.id("showFacets")); //image_showFacetsIcon     
btn_resetSearch              = element(by.id("resetSearch")); //Reset Button
btn_search                   = element(by.id("search")); //Search button
select_all_fields            = element(by.id("fieldName")); //All fields drop down

//Search_results id's
search_results               = element(by.id("search-result-table")); //Search Results
first_search_result_chckbox  = element(by.name("searchResultRows[0].selected")); // First Serach Results
second_search_result_chckbox = element(by.name("searchResultRows[1].selected")); // First Serach Results
lnk_next                     = element(by.linkText("Next"));// Next button

btn_request                  = element(by.id("requestButton")); // Request Selected Items(s)
btn_export                   = element(by.id("export")); // Export Selected Records   
txt_err_msg                  = element(by.xpath("//div[@class='search-results-container']//span[2]")); // No search results found. Please refine search conditions.                               
lnk_random_title_txt         = element(by.id("searchResultsDataTitleS-7")) ; //  Title text       
macr_record_content          = element(by.className("contentdetail")); // Macr record page id 
txt_first_item_status        = element(by.className("status1")).element(by.tagName("img")); // First Item(barcode) status   
input_first_item_cc          = element(by.id("searchResultsDataCustCodeS-0"));//Search Result first item Customer Code.  
input_first_item_OI          = element(by.id("searchResultsDataOwnInstS-0")); //Search Result first item Owning institution.


//tabs
tab_search                   = element(by.className("tab-search"));// Search Tab
tab_collections              = element(by.linkText("Collection"));// Collections Tab
tab_request                  = element(by.linkText("Request"));// Request Tab
tab_bulkrequest              = element(by.linkText("Bulk Request"));// BulkRequest Tab
tab_reports                  = element(by.className("tab-reports")); // Report Tab
tab_roles                    = element(by.className("tab-role")); // Roles Tab
tab_users                    = element(by.className("tab-users")); //Users Tab
tab_jobs                     = element(by.className("")); // Jobs Tab

//Facts Page Objects
select_all_facts_verify      = element(by.id("selectAllFacets")) ;//selectAllFacets Checkbox
select_all_facts_chcbox      = element(by.className('facet-text')); //selectAllFacets Checkbox text
checkbox_ownInstId           = element(by.xpath("/html[1]/body[1]/section[1]/div[1]/div[1]/div[1]/div[1]/div[1]/form[1]/fieldset[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[2]/div[1]/div[1]/h4[1]")); //checkbox_ownInstId
checkbox_cgdId               = element(by.xpath("/html[1]/body[1]/section[1]/div[1]/div[1]/div[1]/div[1]/div[1]/form[1]/fieldset[1]/div[1]/div[1]/div[1]/div[2]/div[3]/div[2]/div[1]/h4[1]")); //Collecton Group Checkboxes
checkbox_availabilityId      = element(by.xpath("/html[1]/body[1]/section[1]/div[1]/div[1]/div[1]/div[1]/div[1]/form[1]/fieldset[1]/div[1]/div[1]/div[1]/div[2]/div[3]/div[2]/div[2]/h4[1]")); //checkbox_availabilityId
checkbox_materialTypeId      = element(by.xpath("/html[1]/body[1]/section[1]/div[1]/div[1]/div[1]/div[1]/div[1]/form[1]/fieldset[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[2]/div[1]/div[2]/h4[1]")); //checkbox_materialTypeId
Checkbox_use_restriction     = element(by.xpath("/html[1]/body[1]/section[1]/div[1]/div[1]/div[1]/div[1]/div[1]/form[1]/fieldset[1]/div[1]/div[1]/div[1]/div[2]/div[3]/div[2]/div[3]/h4[1]")); //use_restriction Checkbox
all_checkbox_facts           = element.all(by.className("facetCheckBox"));// Used in Click_facts method
//----------------------End--------------------------------------------------------------------

        async field_values(txt_value){
            let test_txt = 'Testing' ;
            switch(txt_value){
                case 'search':
                    test_txt = await this.txt_search_box.getAttribute('type');
                    break;
                case 'Use Restriction':
                    test_txt = await this.Checkbox_use_restriction.getText();
                    break;
                case 'OWNING INSTITUTION':
                    test_txt = await this.checkbox_ownInstId.getText();
                    break;
                case 'Collection group':
                    test_txt = await this.checkbox_cgdId.getText();
                    break;
                case 'Availability':
                    test_txt = await this.checkbox_availabilityId.getText();
                    break;
                case 'material type':
                    test_txt = await this.checkbox_materialTypeId.getText();
                    break;
                case 'All fields':
                    test_txt = await this.select_all_fields.getText();
                    break;
                case 'Submit':
                    test_txt = await this.btn_search.getAttribute('type');
                    break;
                case 'ResetSearch':
                    test_txt = await this.btn_resetSearch.getAttribute('id');
                    break;
            }
            return test_txt.toUpperCase();
        };
    async verify_elements(txt_input: any){
        let retuen_txt_value = 'Testing'
        await UtilPage.selectDropdownByText(txt_input, 'The' + txt_input +"hasn't displayed");
        await browser.sleep(1000);
        retuen_txt_value = await this.select_all_fields.getAttribute('value')
        return retuen_txt_value.toUpperCase();
     };

        async click_facts(txt_facts: any){
           //let facts_name = await element.all(by.className("facetCheckBox"));
           await browser.sleep(2000);
           let facts_name = await this.all_checkbox_facts;
            for(var i=0; i < facts_name.length; i++){
                const facts_value =await facts_name[i].getAttribute('value');
                if(facts_value == txt_facts){
                    await facts_name[i].click();
                    await browser.sleep(1000);
                    return;
                }
            }
        };
        
async get_items_details_as_per_instituation(Owning_instituation){
            switch(Owning_instituation){
              case 'PUL':
                  await this.click_facts('NYPL');
                  await this.click_facts('CUL');
                  break;
              case 'CUL':
                  await this.click_facts('NYPL');
                  await this.click_facts('PUL');
                  break;
              case 'NYPL':
                  await this.click_facts('PUL');
                  await this.click_facts('CUL');
                  break;
            };
          
};

async get_barcode_from_scsb(){
    await this.btn_search.click();
    await browser.wait(until.visibilityOf(this.search_results), 15000 , "The Search Result hasn't displayed");
   
    try{
    await UtilPage.selectDropdownByText('50', "The Show Entries dropdown hasn't displayed");
    await browser.sleep(5000);
    await this.lnk_next.click();
    await browser.sleep(5000);
    }catch(e){
    }finally{
    }

    let barcode_in_scsb:string[]= new Array(100);
    let i = 0;

    do{
        let barcode: any;
        try{
             barcode = await element(by.id("searchResultsDataBarS-"+i)).getText();
        }catch(e){
            barcode ="";
        };
        barcode_in_scsb[i]= barcode;
        i = i + 1
    } while(i <= 49);

    //To remove empty values
    barcode_in_scsb = barcode_in_scsb.filter(item => item);
 
    //To get random value from array
    //let scsb_barcode = barcode_in_scsb[Math.floor(Math.random() * barcode_in_scsb.length)];
    return barcode_in_scsb;
}

async get_available_barcode_from_las(){
    let scsb_available_barcode_values= await this.get_barcode_from_scsb();

    let barcode_LAS: string[] = new Array(5);
 
    for(let i=0; scsb_available_barcode_values.length>i; i++){
        let barcode = scsb_available_barcode_values[i];
        let Response = await api.getRequest('http://recapgfa-dev.princeton.edu:9092/lasapi/rest/lasapiSvc/itemStatus?filter={"itemStatus":[{"itemBarCode":"'+barcode+'"}]}')
            //console.log(Response)
            try{
                let test1 = Response.data['dsitem'];
                let test2 = test1['ttitem'];
                let las_item_status = test2[0]['itemStatus'];
               // console.log(las_item_status);
                if(las_item_status=="IN"){
                    barcode_LAS[0] = barcode
                    barcode_LAS[1] = 'IN'
                    return barcode_LAS;

               }
            }catch(e){
                barcode_LAS[0] = scsb_available_barcode_values[Math.floor(Math.random() * scsb_available_barcode_values.length)];
                barcode_LAS[1] = 'Barcode availability status not verified in LAS'
                return barcode_LAS;
            }
    };
    barcode_LAS[0] = scsb_available_barcode_values[Math.floor(Math.random() * scsb_available_barcode_values.length)];
    barcode_LAS[1] = 'There is no LAS available barcode for first 50 items'
    return barcode_LAS;
};

async get_cc_from_1st_search_result(){

    let item_info: string[] = new Array(5);

    await UtilPage.selectDropdownByText("Barcode", "Barcode field hasn't displayed in search page");
    await this.btn_search.click();
    await browser.wait(until.visibilityOf(this.search_results), 20000, "Search result hasn't diplayed in search page");

    item_info[0] = await this.txt_search_box.getAttribute('value');
    item_info[1] = await this.input_first_item_OI.getText();
    item_info[2] = await this.input_first_item_cc.getText();

    return item_info
}
    
};
export = SearchPage;