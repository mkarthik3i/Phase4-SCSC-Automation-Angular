
import {element, by, browser, protractor} from "protractor"
import {expect, assert, util} from 'chai';

import SearchPage = require('./../Pages/SearchPage');
const search: SearchPage = new SearchPage();

import LoginPage = require('./../Pages/LoginPage');
const login: LoginPage = new LoginPage();

import BulkRequestPage = require('./../Pages/BulkRequestPage');
const bulkrequest: BulkRequestPage = new BulkRequestPage();

import UtilsPage = require('../utils/utils');
const UtilPage: UtilsPage = new UtilsPage();

var until = protractor.ExpectedConditions;
var testdata = require('./../config/testdata.json')

class RequestPage{

  //----------------------Request tab Page Objects -----------------------------------------------------------
  txt_itembarcode              = element(by.id("itemBarcodeId")); // itemBarcodeId Text box
  select_requestingIns         = element(by.id("requestingInstitutionId"))// Requesting Institution 
  select_requestType           = element(by.id("requestTypeId")); //Request Type 
  txt_select_dl                = element(by.id("deliveryLocationId"));//Delivery Location 
  txt_patronBarcode            = element(by.id("patronBarcodeId"));
  txt_patronEmail              = element(by.id("patronEmailId")); //patronEmailId.
  txt_requestNotes             = element(by.id("requestNotesId")); //requestNotes
  btn_create_request           = element(by.id("createrequestsubmit")); // Create Request button
  txt_select_delivery_location = element(by.id("deliverylocation_request")) //get All delivery locations
  btn_clear                    = element(by.id("createrequestclear"))// Clear Button

  //EDD Request
  txt_StartPage               = element(by.id("StartPage")); // Start Page
  txt_EndPage                 = element(by.id("EndPage")); // End Page
  txt_VolumeNumber            = element(by.id("VolumeNumber")) // Volume Number
  txt_Issue                   = element(by.id("Issue")); //Issue
  txt_article_author          = element(by.id("ArticleAuthor")); //ArticleAuthor
  txt_ArticleChapterTitle     = element(by.id("ArticleChapterTitle")); //ArticleChapterTitle


  //Request DeailsPage
  lnk_search_requests          = element(by.linkText("Search Requests")); //Search Requests
  txt_serach_itemBarcode       = element(by.id("itemBarcode")); //itemBarcode
  btn_serach_searchrequests    = element(by.id("searchRequestsButton")); //searchRequestsButton
  lnk_goback                   = element(by.linkText("Go Back")); // Go Back
  first_item_status            = element(by.id("status-0")); //  First request status
  btn_first_notes              = element(by.id("notesButton-0")); // First request notes button
  btn_first_item_cancel        = element(by.id("cancelButton-0"));// Cancel Button for First search Result
  btn_proceed                  = element(by.id("proceedBtn"));// Proceed Button
  txt_cancelStatus             = element(by.id("cancelStatus"));// Cancel Status
  search_request_result        = element(by.id("request-result-table"));// Search Result in request page
  txt_first_item_barcode       = element(by.id("requestRowItemBarcode-0"))// First Item barcode
  txt_first_item_dl            = element(by.id("searchResultRows0.deliveryLocation"));// First item delivery location id 
  txt_first_request_id         = element(by.id("requestRowRequestId-0"));// First item request id
  txt_first_patron_code        = element(by.id("searchResultRows0.patronBarcode")); //First item patron code
  txt_first_req_institution    = element(by.id("searchResultRows0.requestingInstitution")); //First item patron code

  //success and error message id's
  txt_request_error_msg        = element(by.id("errorMessageSpanId1"))//All items must be attached to the same bibliographic record, have the same customer code, and the same availability.
  alert_notes_window           = element(by.id("requestNotesModalContent")); //Request Notes window
  alert_note_window_close      = element(by.id("requestNotesModalContent")).element(by.className("close")); //Close Request Notes Window
  alert_requestNotesData       = element(by.id("requestNotesData"));// requestNotesData
  deliveryLocation_err_msg     = element(by.id("deliveryLocationErrorMessage")); //deliveryLocationErrorMessage
  request_success_msg          = element(by.id("successTextIdForRequest"));
  itembarcode_err_msg          = element(by.id("itemBarcodeErrorMessage")); // Item barcode is required.
  patronbarcode_err_msg        = element(by.id("patronBarcodeErrorMessage")); //Item barcode is required.
  requestInstitution_err_msg   = element(by.id("requestingInstitutionErrorMessage")); //Requesting institution is required.
  EmailMandatory_err_msg       = element(by.id("EmailMandatoryErrorMessage")); //EmailMandatoryErrorMessage
  startPage_err_msg            = element(by.id("startPageErrorMessage")); //startPageErrorMessage
  endPage_err_msg              = element(by.id("endPageErrorMessage")); //endPageErrorMessage
  articleTitle_err_msg         = element(by.id("articleTitleErrorMessage")); //articleTitleErrorMessage
  btn_clear_request_details    = element(by.id("createrequestclear")); // Clear all fields
  lnk_clickhere_1_msg          = "goToSearchRequest(this.getAttribute('data1'))";//Your request was received and will be processed.To track the request's status, please click here
  lnk_clickhere_2_msg          = "loadCreateRequestForSamePatron()";//To create another request for the same patron, please click here
  lnk_clickhere_3_msg          = "loadCreateRequest()";//To create another request for a different patron, please click here
//--------------------------------------------------------------------------------------------
async available_barcode_from_las(Owning_instituation: any){
      await browser.sleep(1000);
      await search.image_showFacetsIcon.click();
      await browser.sleep(1000);
      await search.click_facts('NotAvailable');
      await search.get_items_details_as_per_instituation(Owning_instituation);
      await search.image_showFacetsIcon.click();
      await browser.sleep(1000);
      return await search.get_available_barcode_from_las();
};


async verify_error_message(table_value: any){
  let app_error_msg: any
  switch (table_value.trim()){
    case 'Item barcode is required.':
        app_error_msg = await this.itembarcode_err_msg.getText();
        break;
    case 'Patron barcode is required.':
       app_error_msg = await this.patronbarcode_err_msg.getText();
       break;
    case 'Requesting institution is required.':
       app_error_msg = await this.requestInstitution_err_msg.getText();
       break;
    case 'Delivery location is required.':
       app_error_msg = await this.deliveryLocation_err_msg.getText();
       break;
    case 'Patron Email Address is required.':
        app_error_msg = await this.EmailMandatory_err_msg.getText();
        break;
    case 'Start page is required.':
        app_error_msg = await this.startPage_err_msg.getText();
        break;
    case 'End page is required.':
        app_error_msg = await this.endPage_err_msg.getText();
        break;
    case 'Article / Chapter title is required.':
        app_error_msg = await this.articleTitle_err_msg.getText();
        break;
    case 'Bulk Request Name is required.' :
      app_error_msg = bulkrequest.err_msg_bulkrequest_name.getText();
      break;
    case 'CSV file is required' :
      app_error_msg = bulkrequest.err_msg_CSV_file.getText();
      break;
 }
 return app_error_msg;

};

async enter_mandatory_fields_for_request(txt_barcode: any, Owning_instituation: any, txt_requesting_instituation: any, Request_Type: any){
  let dl_with_patron_info: string[] = new Array(2);

  await this.txt_itembarcode.sendKeys(txt_barcode);
  await this.select_requesting_instituation(txt_requesting_instituation);
  await browser.sleep(1000);

  let patron_code: any;
  switch(Request_Type){
    case 'RECALL' :
        patron_code = await this.select_patron_barcode_recall_request(txt_requesting_instituation);
        break;
    default:
        patron_code = await this.select_patron_barcode(txt_requesting_instituation);
        break;
  };
  
  await this.txt_patronBarcode.sendKeys(patron_code);
  await this.select_requestType.sendKeys(Request_Type.toUpperCase());
  await browser.sleep(1000);
  await this.txt_patronEmail.sendKeys(testdata.RequestDetails["EmailId"]);
  await this.txt_requestNotes.sendKeys(testdata.RequestDetails["Notes"]);

  switch(Request_Type.toUpperCase()){
    case "EDD":
      await this.enter_edd_details()
      return "There is no delivery location for EDD Request"
    default:
      let get_dl = await this.select_delivery_location(txt_barcode, txt_requesting_instituation);
      dl_with_patron_info[0] = get_dl
      dl_with_patron_info[1] = patron_code
      return dl_with_patron_info;
      
  };
};

async enter_edd_details(){
  try{
  await this.txt_StartPage.sendKeys(testdata.EDDDetails["StartPage"]);
  }catch(e){
    await browser.sleep(1000);
    await UtilPage.selectDropdownByText('EDD', "Request Type is not displayed");
    await browser.sleep(1000);
    await this.txt_StartPage.sendKeys(testdata.EDDDetails["StartPage"]);
  };
  await this.txt_EndPage.sendKeys(testdata.EDDDetails["EndPage"]);
  await this.txt_VolumeNumber.sendKeys(testdata.EDDDetails["VolumeNumber"]);
  await this.txt_article_author.sendKeys(testdata.EDDDetails["ArticleAuthor"]);
  await this.txt_Issue.sendKeys(testdata.EDDDetails["Issue"]);
  await this.txt_ArticleChapterTitle.sendKeys(testdata.EDDDetails["ArticleChapterTitle"])
};

async select_requesting_instituation(txt_requesting_instituation: any){
  let request_instituation_input = await this.select_requestingIns;
  let select_element_text =await request_instituation_input.all(by.tagName('option'));

  for(let i=0; select_element_text.length>i; i++){
    let request_inst_value = await select_element_text[i].getText();
       if (request_inst_value ==   txt_requesting_instituation){
        await select_element_text[i].click();
        await browser.sleep(3000);
        return "done"
       }
  }
};

async select_patron_barcode(Owning_instituation: any){
  let  patronbarcode: any;
  switch(Owning_instituation){
    case "PUL":
      patronbarcode = testdata.RequestDetails["PUL_patronbarcode"][Math.floor(Math.random() * testdata.RequestDetails["PUL_patronbarcode"].length)];
      //await this.txt_patronBarcode.sendKeys(patronbarcode);
      break;
    case "CUL":
      patronbarcode = testdata.RequestDetails["CUL_patronbarcode"][Math.floor(Math.random() * testdata.RequestDetails["CUL_patronbarcode"].length)];
      //await this.txt_patronBarcode.sendKeys(patronbarcode);
      break;
    case "NYPL":
      patronbarcode = testdata.RequestDetails["NYPL_patronbarcode"][Math.floor(Math.random() * testdata.RequestDetails["NYPL_patronbarcode"].length)];
      //await this.txt_patronBarcode.sendKeys(patronbarcode);
      break;
  };
  return patronbarcode;
};

async select_patron_barcode_recall_request(Owning_instituation: any){
  let  patronbarcode: any;
  switch(Owning_instituation){
    case "PUL":
      patronbarcode = testdata.RequestDetails["PUL_recall_patronbarcode"][Math.floor(Math.random() * testdata.RequestDetails["PUL_recall_patronbarcode"].length)];
      //await this.txt_patronBarcode.sendKeys(patronbarcode);
      break;
    case "CUL":
      patronbarcode = testdata.RequestDetails["CUL_recall_patronbarcode"][Math.floor(Math.random() * testdata.RequestDetails["CUL_recall_patronbarcode"].length)];
      //await this.txt_patronBarcode.sendKeys(patronbarcode);
      break;
    case "NYPL":
      patronbarcode = testdata.RequestDetails["NYPL_recall_patronbarcode"][Math.floor(Math.random() * testdata.RequestDetails["NYPL_recall_patronbarcode"].length)];
      //await this.txt_patronBarcode.sendKeys(patronbarcode);
      break;
  };
  return patronbarcode;
}





  async select_delivery_location(txt_barcode: any, txt_requesting_instituation: any){
    await browser.sleep(2000);
    await this.txt_select_delivery_location.click();
    await browser.sleep(2000);
    let delivery_location = await this.txt_select_delivery_location;
    let select_element_text: any;
     select_element_text =await delivery_location.all(by.tagName('option'));

     console.log(select_element_text.length);
    let dl_value_count = select_element_text.length;
    if(dl_value_count == 1){
      console.log("2attemept for to get DL")
      await this.select_requestingIns.click();
      await this.select_requesting_instituation('NYPL');
      await browser.sleep(1000);
      await this.select_requesting_instituation('PUL');
      await browser.sleep(2000);
      await this.select_requesting_instituation(txt_requesting_instituation);
      await browser.sleep(2000);
      await this.txt_select_delivery_location.click();
      let delivery_location = await this.txt_select_delivery_location;
       select_element_text =await delivery_location.all(by.tagName('option'));
    }
 
    let delivery_location_list: string[] = new Array(50);

    for(let i = 1; select_element_text.length>i; i++){
      delivery_location_list[i]= await select_element_text[i].getText();
    };

    //To remove empty values
    delivery_location_list = delivery_location_list.filter(item => item);

    //To get random value from array
    let delivery_location_txt = delivery_location_list[Math.floor(Math.random() * delivery_location_list.length)];
    //return delivery_location_txt;
    let  dl: any;
    await browser.sleep(2000);
           dl = delivery_location_txt;
          if(dl != undefined){
            await this.txt_select_dl.sendKeys(dl);
            await browser.sleep(1000);
            await this.txt_select_delivery_location.click();
            return dl;
          }else{
            return "There is no delivery location for the barcode = "+txt_barcode;
          };
   
  };
 
  async get_available_barcode_based_on_requesting_instituation(Owning_instituation: any, Requesting_Instituation: any){
    try{
      await search.tab_request.click();
      await browser.wait(until.visibilityOf(this.txt_itembarcode),20000, "Request Page hasn't displayed");
      await this.lnk_search_requests.click();
      await browser.wait(until.visibilityOf(this.txt_serach_itemBarcode), 20000, "Request details page hasn't displayed");
      }catch(e){
        await login.openBrowser();
        await login.login_with_valid_credentials();
        await browser.sleep(5000);
        await search.tab_request.click();
        await browser.wait(until.visibilityOf(this.txt_itembarcode),20000, "Request Page hasn't displayed");
        await this.lnk_search_requests.click();
        await browser.wait(until.visibilityOf(this.txt_serach_itemBarcode), 20000, "Request details page hasn't displayed");
      };

    await UtilPage.selectDropdownByText(Owning_instituation, "The "+Owning_instituation+ "hasn't displayed");
    await UtilPage.selectDropdownByText("RETRIEVAL ORDER PLACED", "The request type hasn't displayed");
    try{
    await this.btn_serach_searchrequests.click();
    await browser.wait(until.visibilityOf(this.search_request_result), 20000, "Search results haven't displayed in request details page");
    }catch(e){
      await this.btn_serach_searchrequests.click();
      await browser.wait(until.visibilityOf(this.search_request_result), 20000, "Search results haven't displayed in request details page");
    }
    
    await UtilPage.selectDropdownByText("50", "Show entres field hasn't displayed")
    await browser.sleep(5000);
    await browser.wait(until.visibilityOf(this.search_request_result), 20000, "Search results haven't displayed in request details page");

    let i = 0;
    let txt_requesting_value: any;
    let txt_owning_institution: any;

    do{
        try{
        txt_requesting_value = await element(by.id("searchResultRows"+i+".requestingInstitution")).getAttribute("value");
        txt_owning_institution = await element(by.id("searchResultRows"+i+".owningInstitution")).getAttribute("value");
        }catch(e){
          return ("There is no test data for Owning_instituation= "+Owning_instituation+" Requesting_Instituation = "+Requesting_Instituation+ " in request details Page ");
        }
       let request_details: string[] = new Array(5);
            if(Requesting_Instituation == txt_requesting_value && Owning_instituation == txt_owning_institution){
              await browser.sleep(1000);
              let request_patron_barcode = await element(by.id("searchResultRows"+i+".patronBarcode")).getAttribute("value");
              await browser.sleep(1000);
              let request_item_barcode = await element(by.id("requestRowItemBarcode-"+i)).getAttribute("value");
              await browser.sleep(1000);
              let request_item_delivery_location = await element(by.id("searchResultRows"+i+".deliveryLocation")).getAttribute("value");
              await browser.sleep(1000);
              request_details[0] = request_item_barcode;
              request_details[1] = request_patron_barcode;
              request_details[2] = Requesting_Instituation;
              request_details[3] = request_item_delivery_location;
              return request_details;
            }
        i = i + 1;

    }while(i<=24)
        return ("There is no test data for Owning_instituation= "+Owning_instituation+" Requesting_Instituation = "+Requesting_Instituation+ " in request details Page ");
  };

  async get_barcode_as_per_request_type(RequestType: any, txt_Owning_instituation: any){
    try{
    await search.tab_request.click();
    await browser.wait(until.visibilityOf(this.txt_itembarcode),20000, "Request Page hasn't displayed");
    }catch(e){
      await login.login_with_valid_credentials();
      await browser.sleep(5000);
      await search.tab_request.click();
      await browser.wait(until.visibilityOf(this.txt_itembarcode),20000, "Request Page hasn't displayed");
    }

    await this.lnk_search_requests.click();
    await browser.wait(until.visibilityOf(this.txt_serach_itemBarcode), 20000, "Request Details page hasn't displayed")
    await UtilPage.selectDropdownByText(txt_Owning_instituation, "The institutions hasn't displayed in request page");
    await UtilPage.selectDropdownByText(RequestType, "The RequestStatus hasn't displayed in request page");
    try{
      await this.btn_serach_searchrequests.click();
      await browser.wait(until.visibilityOf(this.search_request_result), 20000, "Search results haven't displayed in request details page");
      }catch(e){
        await this.btn_serach_searchrequests.click();
        await browser.wait(until.visibilityOf(this.search_request_result), 20000, "Search results haven't displayed in request details page");
      };
    let get_barcode = await this.txt_first_item_barcode.getAttribute('value');
    await search.tab_search.click();
    await search.txt_search_box.sendKeys(get_barcode);
    await UtilPage.selectDropdownByText('Barcode', "The Barcode field hasn't displayed");
    await search.btn_search.click();
    await browser.wait(until.visibilityOf(search.search_results), 20000, "Search result hasn't displayed");
    await browser.sleep(2000);
    await search.first_search_result_chckbox.click();
    return get_barcode;
  }

  async verify_clear_status(){
    let itemBarcode_value = await(this.txt_itembarcode.getAttribute("value"));
   assert.isEmpty(itemBarcode_value, 'Item barcode field is not empty');
   let request_ins_value = await this.select_requestingIns.getAttribute('value');
   assert.isEmpty(request_ins_value, 'request_ins_value field is not empty');
   //let patron_value = this.txt_patronBarcode.getText();
   //let patron_value1 = this.txt_patronBarcode.getAttribute('value');
   //assert.isEmpty(patron_value, 'Patron field is not empty');
   let email_id_value = await this.txt_patronEmail.getAttribute('value');
   assert.isEmpty(email_id_value,'Patron email id is not empty');
   let dl_value = await this.txt_select_dl.getAttribute('value');
   assert.isEmpty(dl_value,'Delivery Location field is not empty');
   await this.select_requestType.sendKeys('EDD');
   await browser.sleep(1000);
   let start_page_value = await this.txt_StartPage.getAttribute('value');
    assert.isEmpty(start_page_value, 'Start Page field is not empty');
   let end_page_value = await this.txt_EndPage.getAttribute('value');
    assert.isEmpty(end_page_value, 'End Page field is not empty');
   let volume_value = await this.txt_VolumeNumber.getAttribute('value');
    assert.isEmpty(volume_value, 'Volume field is not empty');
   let issue_value = await this.txt_Issue.getAttribute('value');
    assert.isEmpty(issue_value, 'Issue field is not empty');
   let articleauthor_value = await this.txt_article_author.getAttribute('value');
    assert.isEmpty(articleauthor_value, 'Article Author field is not empty');
   let article_title_value = await this.txt_ArticleChapterTitle.getAttribute('value');
    assert.isEmpty(article_title_value, 'Article Title field is not empty');
   let notes_value = await this.txt_requestNotes.getAttribute('value');
    assert.isEmpty(notes_value, 'Notes field is not empty');
  };

  async click_success_message_link(txt_msg: any){
    let txt_link = await element(by.id("successTextIdForRequest")).all(by.tagName('a'));
    for(let i=0; txt_link.length>i; i++){
      let on_click_element = await txt_link[i].getAttribute('onclick');
        if(on_click_element ==  txt_msg){
          await txt_link[i].click();
          i = 10;
        }

    }
  }


  async get_request_serach_result_1st_item_details(){
    await this.btn_serach_searchrequests.click();
    await browser.wait(until.visibilityOf(this.search_request_result), 20000, "Request search result hasn't displayed")
    let request_first_item_details: string[] = new Array(5);
    
              let request_patron_barcode = await this.txt_first_patron_code.getAttribute("value");
              let Requesting_Instituation = await this.txt_first_req_institution.getAttribute('value');
              let request_item_barcode = await this.txt_first_item_barcode.getAttribute("value");
              let request_item_delivery_location = await this.txt_first_item_dl.getAttribute("value");
              request_first_item_details[0] = request_item_barcode;
              request_first_item_details[1] = request_patron_barcode;
              request_first_item_details[2] = Requesting_Instituation;
              request_first_item_details[3] = request_item_delivery_location;
              return request_first_item_details;
  };
};
export = RequestPage;