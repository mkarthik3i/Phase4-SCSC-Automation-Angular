'use strict';
import {browser,protractor, element, by} from 'protractor';
import {Given, When, Then, setWorldConstructor} from 'cucumber';
import {expect, assert, util} from 'chai';

import SearchPage = require('./../Pages/SearchPage');
const search: SearchPage = new SearchPage();

import RequestPage = require('./../Pages/RequestPage');
const request: RequestPage = new RequestPage();

import LoginPage = require('./../Pages/LoginPage');
const login: LoginPage = new LoginPage();

import UtilsPage = require('../utils/utils');
const UtilPage: UtilsPage = new UtilsPage();

var api = require('../utils/api');
var until = protractor.ExpectedConditions;
var testdata = require('./../config/testdata.json')
//----------------------------
export function World ({attach, parameters}) {
   this.attach = attach;
   this.parameters = parameters;
   };
   setWorldConstructor(World);

//----------------------

When('I navigate to request page', {timeout: 110*10000}, async()=>{ 
  try{
   await search.tab_request.click();
   await browser.wait(until.visibilityOf(request.txt_itembarcode), 20000, "The Request page hasn't displayed")
  }catch(e){
     try{
           await login.login_with_valid_credentials();
           await search.tab_request.click();
           await browser.wait(until.visibilityOf(request.txt_itembarcode), 20000, "The Request page hasn't displayed");
     }catch(e){
        await login.openBrowser();
        await login.login_with_valid_credentials();
        await search.tab_request.click();
        await browser.wait(until.visibilityOf(request.txt_itembarcode), 20000, "The Request page hasn't displayed");
     };
   
  }
}); 

When('I click create button', {timeout: 10*10000}, async()=>{ 
   await request.btn_create_request.click();
});

When('I select {string} as a request type', {timeout: 10*10000}, async(RequestType)=>{ 
   await UtilPage.selectDropdownByText(RequestType, "The Request Type hasn't displayed");
});

Then('I should see mandatory fields error messages:', {timeout: 10*10000}, async(table_data)=>{ 
   let row = table_data.rows();
   for(let index in row){
      let table_value = row[index][0];
      let app_error_msg = await request.verify_error_message(table_value);
      assert.equal(app_error_msg, table_value);
   }
});

let las_available_barcode: any;
let available_barcode: any;
When('I obtaining {string} available barcode in LAS', {timeout: 10*10000}, async function(Owning_instituation){ 
   available_barcode = await request.available_barcode_from_las(Owning_instituation);
   las_available_barcode = available_barcode[0];
   if(las_available_barcode.indexOf('T') !== -1){
      await browser.wait(until.visibilityOf(request.EmailMandatory_err_msg), 1000, available_barcode);
      };
   let las_barcode_status = available_barcode[1];
   this.attach("LAS available "+Owning_instituation+" Barcode = "+las_available_barcode);
   this.attach("Barcode Status in LAS = "+las_barcode_status);
   //The below script for RestApI
   await search.txt_search_box.sendKeys(las_available_barcode);
});

//Rest Api Step


 //----------------------------------

When('I enter own institution {string} to {string} mandaory information for {string} request',{timeout: 10*10000}, async function(Owning_instituation, Requesting_Instituation, Request_Type){ 
   let get_return_txt = await request.enter_mandatory_fields_for_request(las_available_barcode, return_values, Requesting_Instituation, Request_Type);
   this.attach("The LAS available "+Owning_instituation+" Barcode = "+las_available_barcode);
   this.attach("Delivery Location info:: "+ get_return_txt[0]);
   this.attach("Patron code:: "+ get_return_txt[1]);
});



When('I click CreateRequest button',{timeout: 10*10000}, async()=>{
   await browser.sleep(1000);
   try{
      await request.btn_create_request.click();
      await browser.wait(until.visibilityOf(request.request_success_msg), 20000,  "The request hasn't created successfully");
   }catch(e){
      await request.btn_create_request.click();
      await browser.wait(until.visibilityOf(request.request_success_msg), 20000,  "The request hasn't created successfully");
   };
});

Then('I should see the following success message:',{timeout: 10*10000}, async(table_data)=>{
   let success_msg_txt = await request.request_success_msg.getText();
   let row = table_data.rows();
   for(let index in row){
      let txt_msg = row[index][0];
      expect(success_msg_txt.toLocaleUpperCase()).contain(txt_msg.toLocaleUpperCase());
   }
});

let request_status: any
Then('I should see the barcode status in request details page',{timeout: 110*10000}, async function(){
   await request.lnk_search_requests.click();
   await browser.wait(until.visibilityOf(request.txt_serach_itemBarcode), 20000, "Request details page hasn't displayed")
   await request.txt_serach_itemBarcode.sendKeys(las_available_barcode);
   await request.btn_serach_searchrequests.click()
   await browser.wait(until.visibilityOf(request.first_item_status), 20000, "Search results haven't displayed in request details page")
   await browser.sleep(20000);
   request_status = await request.first_item_status.getText();
   this.attach("Request Status:: "+ request_status);
   if(request_status == "EXCEPTION"){
      await request.btn_first_notes.click();
      await browser.wait(until.visibilityOf(request.alert_notes_window), 10000, "The Request Notes hasn't displayed");
      let notes_txt = await request.alert_requestNotesData.getText();
      await browser.sleep(1000);
      this.attach("Exception Eror Detail :: "+notes_txt);
      await request.alert_note_window_close.click();
      await browser.sleep(1000); 
   };
   
});

When('I should see the barcode status is not available in search results',{timeout: 13*10000}, async function(){
   try{
      await search.tab_search.click();
      await browser.wait(until.visibilityOf(search.txt_search_box), 20000, "Search Page hasn't displayed");
   }catch(e){
      try{
         await login.login_with_valid_credentials();
         await browser.wait(until.visibilityOf(search.txt_search_box), 20000, "Search Page hasn't displayed");
      }catch(e){
         await login.openBrowser();
         await login.login_with_valid_credentials();
         await browser.wait(until.visibilityOf(search.txt_search_box), 20000, "Search Page hasn't displayed");
      };
   }
   await search.verify_elements("Barcode");
   await search.txt_search_box.sendKeys(las_available_barcode);
   await browser.sleep(5000);
   await search.btn_search.click();
   await browser.wait(until.visibilityOf(search.search_results), 20000, "Search Results hasn't displayed");
   let item_status = await search.txt_first_item_status.getAttribute("alt");
   this.attach("The barcode status in SCSB = "+item_status);
   assert.equal(item_status, "Out")
});

When('I should see the barcode status as {string}',{timeout: 10*10000}, async function(RequestStatus){
   assert.equal(request_status, RequestStatus);
});

let cancelled_barcode: any; 
let cancelled_request_id: any;
When('I search with {string} and request status as {string} barcode',{timeout: 10*10000}, async function(institutions, RequestStatus){
   await request.lnk_search_requests.click();
   await browser.wait(until.visibilityOf(request.txt_serach_itemBarcode), 20000, "Request Details page hasn't displayed")
   await UtilPage.selectDropdownByText(institutions, "The institutions hasn't displayed in request page");
   await UtilPage.selectDropdownByText(RequestStatus, "The RequestStatus hasn't displayed in request page");
   await browser.sleep(5000);
   try{
      await request.btn_serach_searchrequests.click();
      await browser.wait(until.visibilityOf(request.search_request_result), 20000, "Search results hasn't displayed in request page");
   }catch(e){
      await request.btn_serach_searchrequests.click();
      await browser.wait(until.visibilityOf(request.search_request_result), 20000, "Search results hasn't displayed in request page");
   }
   cancelled_barcode = await request.txt_first_item_barcode.getAttribute("value");
   cancelled_request_id = await request.txt_first_request_id.getAttribute("value");
});
When('I click cancel button',{timeout: 10*10000}, async function(){
   await request.btn_first_item_cancel.click();
   await browser.sleep(1000);
   await request.btn_proceed.click();
   await browser.wait(until.visibilityOf(request.txt_cancelStatus), 20000, "The Cancellation status hasn't displayed")
});
Then('I should see {string} message',{timeout: 10*10000}, async function(cancel_msg){
   let cancellationinfo = await request.txt_cancelStatus.getText();
   this.attach("The barcode "+cancelled_barcode+" Cancellation Status :: "+cancellationinfo);
   assert.equal(cancel_msg, cancellationinfo );
   await element(by.id("cancelRequestModalContent")).element(by.className("close")).click();
   await browser.sleep(1000);
});

When('I refile the same barcode in RestAPI with {string} message',{timeout: 10*10000}, async function(success_msg){
   await browser.sleep(1000);
      const url = testdata.RestAPI['url']+testdata.RestAPI['refile'];
      const test_payload =JSON.stringify({"itemBarcodes": [cancelled_barcode], "requestIds": [parseInt(cancelled_request_id)]});
      const payload ={"itemBarcodes": [cancelled_barcode], "requestIds": [parseInt(cancelled_request_id)]}
      this.attach("Refile test data = " + test_payload);
      const responce =  await api.postRequest(url, payload);
      try{
          let api_responce = await responce.data["screenMessage"]
         this.attach("Refile API responce: = " + await responce.data["screenMessage"]);
         //assert.equal(api_responce, success_msg);
      }catch(e){
         this.attach("Refile API responce: = Not Refiled successfully in RestApi")
      }
});

When('I should see cancelled item barcode in available in SCSB search page',{timeout: 10*10000}, async function(){
  try{
   await search.tab_search.click();
   await browser.wait(until.visibilityOf(search.txt_search_box),20000, "search page hasn't displayed")
  }catch(e){
   await login.login_with_valid_credentials();
   await browser.wait(until.visibilityOf(search.txt_search_box),20000, "search page hasn't displayed")
  }
   await search.verify_elements("Barcode");
   await search.txt_search_box.sendKeys(cancelled_barcode);
   await search.btn_search.click();
   await browser.wait(until.visibilityOf(search.search_results), 20000, "Search Results hasn't displayed")
   let item_status = await search.txt_first_item_status.getAttribute("alt");
   this.attach("The barcode status in SCSB = "+item_status);
   assert.equal(item_status, "In ReCAP")
});

let return_values: any
When('I obtaining based on {string} and {string} available barcode in SCSB request', {timeout: 10*10000}, async function(Owning_instituation, Requesting_Instituation){
   try{
   await browser.wait(until.visibilityOf(search.txt_search_box), 20000, "Search Page hasn't displayed");
   }catch(e){
      await browser.sleep(5000);
      login.login_with_valid_credentials();
      await browser.wait(until.visibilityOf(search.txt_search_box), 20000, "Search Page hasn't displayed");
   }
   return_values = await request.get_available_barcode_based_on_requesting_instituation(Owning_instituation, Requesting_Instituation);
   las_available_barcode = return_values[0];
   let actualText = return_values[0];
   if(actualText.indexOf('T') !== -1){
      await browser.wait(until.visibilityOf(search.btn_export), 1000, return_values);
   };
   await browser.sleep(3000);
   await request.txt_serach_itemBarcode.sendKeys(las_available_barcode);
});

When('I checkout the barcode in RestAPI with {string} message', {timeout: 10*10000}, async function(api_responce){
   await browser.sleep(1000);
      const url = testdata.RestAPI['url']+testdata.RestAPI['checkOut'];
      const test_payload =JSON.stringify({"itemBarcodes": [return_values[0]], "itemOwningInstitution": return_values[2], "patronIdentifier": return_values[1]});
      const payload ={"itemBarcodes": [return_values[0]], "itemOwningInstitution": return_values[2], "patronIdentifier": return_values[1]};
      this.attach("checkOut API test data: = " + test_payload);
      const responce =  await api.postRequest(url, payload);
      let checkout_responce = await responce.data["screenMessage"]
      this.attach("checkOut API responce: = " + await responce.data["screenMessage"]);
      //assert.equal(checkout_responce, api_responce);
   
});

let txt_Owning_instituation: any;
When('I search with {string} items in search box', {timeout: 10*10000}, async function(Owning_instituation){
   txt_Owning_instituation = Owning_instituation
   await search.image_showFacetsIcon.click();
   await browser.sleep(1000);
   await search.click_facts('NotAvailable');
   await search.get_items_details_as_per_instituation(Owning_instituation);
    let txt_barcode1 = await search.get_barcode_from_scsb();
   await search.txt_search_box.sendKeys(txt_barcode1[0]+','+txt_barcode1[1]);
   await UtilPage.selectDropdownByText('Barcode', "Barcode fields hasn't displayed")
   await search.btn_search.click();
   await browser.wait(until.visibilityOf(search.search_results), 20000, "Search result hasn't displayed");
});

let page: any;
When('I select items randomly in {string} page', {timeout: 10*10000}, async function(txt_page){
   page = txt_page;
   switch(txt_page){
      case 'Search' :
            await search.first_search_result_chckbox.click();
            await search.second_search_result_chckbox.click();
            break;
      case 'Request-EDD':
         await request.get_barcode_as_per_request_type('EDD ORDER PLACED', txt_Owning_instituation);
         break;
      case 'Request-RECALL':
         await request.get_barcode_as_per_request_type('RECALL ORDER PLACED', txt_Owning_instituation);
         break;
   }
});

When('I select Request Selected Records button', {timeout: 10*10000}, async()=>{
   await search.btn_request.click();
   await browser.wait(until.visibilityOf(request.txt_itembarcode), 20000, "Request page hasn't displayed")
   let itembarcode = await request.txt_itembarcode.getText();
   assert.notEqual(itembarcode, null);
});

When('I enter required details in request page', {timeout: 10*10000}, async()=>{
   await request.select_requesting_instituation(txt_Owning_instituation);
   let patron_code = request.select_patron_barcode(txt_Owning_instituation);
   await request.txt_patronBarcode.sendKeys(patron_code);
   await browser.sleep(1000);
   await request.txt_patronEmail.sendKeys(testdata.RequestDetails["EmailId"]);
   await request.txt_requestNotes.sendKeys(testdata.RequestDetails["Notes"]);
   if(inp_request_type == 'EDD'){
      await request.select_requestType.sendKeys('EDD');
      await request.enter_edd_details();
   }else{
      await request.select_delivery_location('dummy', txt_Owning_instituation);
   };
  
});

Then('I should see message {string}', {timeout: 10*10000}, async(error_msg)=>{
   await browser.wait(until.visibilityOf(request.txt_request_error_msg), 20000, "The request error message hasn't displayed");
   let app_error_msg = await request.txt_request_error_msg.getText();
   assert.equal(app_error_msg, error_msg )
});

let inp_request_type: any
When('I select an items randomly in search page for {string} request', {timeout: 10*10000}, async(request_type)=>{
   await browser.sleep(3000);
   try{
      await browser.wait(until.visibilityOf(search.search_results), 20000, "Search result hasn't displayed");
   }catch(e){
      await search.btn_search.click();
      await browser.wait(until.visibilityOf(search.search_results), 20000, "Search result hasn't displayed");
   };
   inp_request_type = request_type;
   switch(request_type){
      case 'RETRIEVAL':
         await browser.sleep(1000);
         await search.first_search_result_chckbox.click();
         break;
      case 'EDD':
         await search.first_search_result_chckbox.click();
         break;
      case 'RECALL':
         await request.get_barcode_as_per_request_type('RETRIEVAL ORDER PLACED', txt_Owning_instituation);
         break;

   };
});

When('I click clear button', {timeout: 10*10000}, async()=>{
   await request.btn_clear.click();
});
Then('I should see all entered details are cleared', {timeout: 10*10000}, async()=>{
await request.verify_clear_status();
});

When('I navgate to search request page', {timeout: 10*10000}, async()=>{
   await request.lnk_search_requests.click();
   await browser.wait(until.visibilityOf(request.txt_serach_itemBarcode), 20000, "Search request page hasn't displayed");
});

When('I click Go Back link', {timeout: 10*10000}, async()=>{
   await request.lnk_goback.click();
});

Then('I should see request page', {timeout: 10*10000}, async()=>{
   await browser.wait(until.visibilityOf(request.txt_itembarcode), 20000, "Request page hasn't displayed");
});

When('I enter mandaory information for {string} request', {timeout: 10*10000}, async(request_type)=>{
   await request.enter_mandatory_fields_for_request('32101073570135', 'PUL', 'PUL', request_type);
})

Then('I should see Successfully request created message', {timeout: 10*10000}, async()=>{
   await browser.wait(until.visibilityOf(request.request_success_msg), 20000,  "The request hasn't created successfully")
});

When('I click the Click here link on Successful {string}', {timeout: 10*10000}, async(message)=>{
   
   switch(message){
      case "Your request was received and will be processed.To track the request's status, please click here":
            await request.click_success_message_link(request.lnk_clickhere_1_msg)
            break;
      case "To create another request for the same patron, please click here":
            await request.click_success_message_link(request.lnk_clickhere_2_msg)
            break;
      case "To create another request for a different patron, please click here":
            await request.click_success_message_link(request.lnk_clickhere_3_msg)
            break;
   }
   
});

When('I should naviagte {string} with required details', {timeout: 10*10000}, async(txt_page)=>{
   switch(txt_page){
      case 'Search_Request':
            await browser.wait(until.visibilityOf(request.first_item_status), 2000, "Search result hasn't displayed in Search request");
            break;
      case 'Request':
            await browser.sleep(5000);
            await browser.wait(until.visibilityOf(request.txt_itembarcode), 2000, "Request page hasn't displayed");
            let patron_value = await request.txt_patronBarcode.getAttribute("value");
            assert.isNotEmpty(patron_value, "Patron field is empty")
            let email_id = await request.txt_patronEmail.getAttribute('value');
            assert.isNotEmpty(email_id, "Patron Email id field is empty")
            let request_ins = await request.select_requestingIns.getAttribute('value')
            assert.isNotEmpty(request_ins, "Requesting Institution field is empty")
            break;
      case 'Request1':
            await browser.sleep(5000);
            await browser.wait(until.visibilityOf(request.txt_itembarcode), 2000, "Request page hasn't displayed");
            let email_id_value = await request.txt_patronEmail.getAttribute('value');
            assert.isEmpty(email_id_value, "Patron Email id field is not empty")
            let request_ins_value = await request.select_requestingIns.getAttribute('value')
            assert.isEmpty(request_ins_value, "Requesting Institution field is not empty")
            break;
   }
   await browser.sleep(2000);
   
});