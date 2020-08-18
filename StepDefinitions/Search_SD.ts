import {browser,protractor, element, by} from 'protractor';
import {Given, When, Then, setWorldConstructor} from 'cucumber';
import {expect, assert} from 'chai';

import SearchPage = require('./../Pages/SearchPage');
const search: SearchPage = new SearchPage();

import LoginPage = require('./../Pages/LoginPage');
const login: LoginPage = new LoginPage();

import RequestPage = require('./../Pages/RequestPage');
const request: RequestPage = new RequestPage();

import window_switch = require('./../utils/browser_helper')
const switch_window: window_switch = new window_switch();

var until = protractor.ExpectedConditions;

let search_filter_name: any;
//----------------------------
export function World ({attach, parameters}) {
   this.attach = attach;
   this.parameters = parameters;
   };
   setWorldConstructor(World);

//----------------------


//----------------------

Then('I should see search page with following elements:', {timeout: 5*10000}, async(data)=>{ 
   await browser.wait(until.elementToBeClickable(search.image_showFacetsIcon), 50000, "The Show Facts button hasn't displayed");
   await search.image_showFacetsIcon.click();
   await browser.sleep(1000);

   var txt_rows = data.rows();
   for(var index in txt_rows){
      let txt_value = txt_rows[index][0];
      let return_value = await search.field_values(txt_value);
      expect(return_value).contain(txt_value.toUpperCase());
   };
});

When('I select All fields drop down', {timeout: 5*10000}, async()=>{
   await browser.wait(until.elementToBeClickable(search.select_all_fields), 50000, "All fields dropdown hasn't displayed");
   await search.select_all_fields.click();
});

Then('I could see the following elements in all fields dropdown box:', {timeout: 5*10000}, async(data)=>{
   var txt_row = data.rows();

   for(var index in txt_row){
      let txt_value = txt_row[index][0];
      let return_value = await search.verify_elements(txt_value);
      expect(return_value).contain(txt_value.toUpperCase());
      console.log(return_value);
   };
});

When('I enter {string} in search box',{timeout: 5*10000}, async(txt_value)=>{
   await browser.wait(until.visibilityOf(search.txt_search_box), 30000, "Search box hasn't displayed");
   if(search_filter_name !='ALL Fields'){
      await search.txt_search_box.sendKeys(txt_value) 
   };
});

When('I select {string} in All fields dropdown box',{timeout: 2*10000}, async(dd_value)=>{
   search_filter_name = dd_value
   await search.verify_elements(dd_value);
});

When('I click search button',{timeout: 5*10000}, async()=>{
   await browser.wait(until.elementToBeClickable(search.btn_search), 30000, "Search button hasn't displayed");
   await search.btn_search.click()
});

Then('I should see the search results based on the keyword',{timeout: 3*10000}, async()=>{
   await browser.wait(until.visibilityOf(search.search_results), 20000, "Search reasult haven't displayed");
});

When('I click the {string} button', {timeout: 5*10000}, async(btn_button_click)=>{ 
   await browser.wait(until.visibilityOf(search.first_search_result_chckbox), 30000, "The Search Results haven't displayed");
   await search.first_search_result_chckbox.click();
   await browser.sleep(2000);
   switch(btn_button_click){
      case 'Request Selected Records':
         await browser.wait(until.visibilityOf(search.btn_request), 3000, "The Request Selected Records button hasn't displayed"); 
         try{
         await search.btn_request.click();
         }catch(e){
            await browser.sleep(3000);
            await login.login_with_valid_credentials();
            await browser.wait(until.visibilityOf(search.txt_search_box), 20000, "Search Page hasn't displayed");
            await search.btn_search.click();
            await browser.wait(until.visibilityOf(search.first_search_result_chckbox), 30000, "The Search Results haven't displayed");
            await search.first_search_result_chckbox.click();
            await browser.sleep(2000);
         }

         break;
      case 'Export Selected Records':
         await browser.wait(until.visibilityOf(search.btn_export), 3000, "The Export Selected Records button hasn't displayed");
         await search.btn_export.click();
         break;
      }
});

Then('I should navigate to corrosping {string}', {timeout: 5*10000}, async(txt_value)=>{
   switch(txt_value){
      case 'Request_Page' :
         await browser.wait(until.visibilityOf(request.txt_itembarcode), 3000, "The Request Page hasn't displayed"); 
         break;
      case 'Downloade_fie' :
         await browser.wait(until.visibilityOf(search.btn_export), 3000, "The download button hasn't displayed"); 
         break;
      }
});

When('I click ResetSearch button', {timeout: 5*10000}, async()=>{
   await browser.wait(until.visibilityOf(search.txt_search_box), 30000, "Search box hasn't displayed");
   await search.txt_search_box.sendKeys('txt_value');
   await search.btn_resetSearch.click();
});

Then('I should see content cleared and visible placeolder text {string} in search box', {timeout: 5*10000}, async(txt_placeholder)=>{
   const serach_box_placeholder_txt = await search.txt_search_box.getAttribute('placeholder');
   assert.equal(txt_placeholder, serach_box_placeholder_txt);
});

When('I should see all checkboxe filters are checked by default', {timeout: 5*10000}, async()=>{
   await search.image_showFacetsIcon.click();
   await browser.sleep(1000);
   let value = await search.select_all_facts_verify.isSelected();
   expect(value).to.be.true;
});

When('I search with invalid keyword {string} in search box', {timeout: 5*10000}, async(txt_value)=>{
      await browser.wait(until.visibilityOf(search.txt_search_box), 30000, "Search box hasn't displayed");
      await search.txt_search_box.sendKeys(txt_value);
});

Then('I should see error message as {string}', {timeout: 5*10000}, async(txt_value)=>{
   await browser.wait(until.visibilityOf(search.txt_err_msg), 30000, txt_value+ "message hasn't displayed");
   let app_error_msg = await search.txt_err_msg.getText();
   assert.equal(app_error_msg,txt_value);
});

When('I uncheck all Facets Option', {timeout: 5*10000}, async()=>{
   await search.image_showFacetsIcon.click();
   await browser.sleep(1000);
   await search.select_all_facts_chcbox.click();
});

Then('I should see the search results',{timeout: 5*10000}, async()=>{
   await browser.wait(until.visibilityOf(search.search_results), 30000, "Search reasult haven't displayed");
});

When('I select tital of bib record randomly',{timeout: 5*10000}, async()=>{
   await search.lnk_random_title_txt.click();
});

Then('I should navigate bib record detail page',{timeout: 5*10000}, async()=>{
   await switch_window.switch_window();
   await browser.wait(until.visibilityOf(search.macr_record_content), 30000, "Bib(Marc Page)detail page haven't displayed");
   await switch_window.switch_window_origin();
});

When('I uncheck {string} Check boxes',{timeout: 5*10000}, async(txt_facts)=>{
   await search.image_showFacetsIcon.click();
   await browser.sleep(1000); 
   switch(txt_facts.trim()){
      case 'Bib Facets':
         await search.click_facts('NYPL');
         await search.click_facts('CUL');
         await search.click_facts('PUL');
         await search.click_facts('Monograph');
         await search.click_facts('Serial');
         await search.click_facts('Other');
         break;
      case 'Item Facets':
         await search.click_facts('Shared');
         await search.click_facts('Private');
         await search.click_facts('Open');
         await search.click_facts('Available');
         await search.click_facts('NotAvailable');
         await search.click_facts('NoRestrictions');
         await search.click_facts('InLibraryUse');
         await search.click_facts('SupervisedUse');
         break;
      case 'Bib & Item Facts':
         await search.select_all_facts_chcbox.click();
   }
});

When('I click on {string} Button',{timeout: 5*10000}, async(txt_link)=>{
   await element(by.linkText(txt_link)).click();
});

When('I should see search results when click the followig link button:', {timeout: 20*10000}, async function(table_data){
  var row = table_data.rows();
  
  for(let index in row){
   let lnk_txt = row[index][0];
   await browser.sleep(2000);
   this.attach("Clicked Link := "+lnk_txt);
   await element(by.linkText(lnk_txt)).click();
   await browser.sleep(2000);
   await browser.wait(until.visibilityOf(search.search_results), 30000, "Search reasult haven't displayed");
  }
});

When('I should see the search results as per following show entries:', {timeout: 5*10000}, async(table_data)=>{
  let row =table_data.rows();
  for(let index in row){
     let txt_value = row[index][0];
     let result_value = txt_value -1
     await browser.sleep(2000);
     await search.verify_elements(txt_value);
     await browser.wait(until.visibilityOf(element(by.id("searchResultsDataTitleS-"+result_value))), 20000,  "Search result is not displayed"+ txt_value +" Entries in search Page")
  }
   
});