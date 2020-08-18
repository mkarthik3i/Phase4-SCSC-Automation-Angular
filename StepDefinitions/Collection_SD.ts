import {browser,protractor, element, by} from 'protractor';
import {Given, When, Then, setWorldConstructor} from 'cucumber';
import {expect, assert} from 'chai';

import SearchPage = require('./../Pages/SearchPage');
const search: SearchPage = new SearchPage();

import UtilsPage = require('../utils/utils');
const UtilPage: UtilsPage = new UtilsPage();

import LoginPage = require('./../Pages/LoginPage');
const login: LoginPage = new LoginPage();

import RequestPage = require('./../Pages/RequestPage');
const request: RequestPage = new RequestPage();

import CollectionPage = require('./../Pages/CollectionPage');
const collection: CollectionPage = new CollectionPage();

import window_switch = require('./../utils/browser_helper')
const switch_window: window_switch = new window_switch();

var until = protractor.ExpectedConditions;
//----------------------------
export function World ({attach, parameters}) {
   this.attach = attach;
   this.parameters = parameters;
   };
   setWorldConstructor(World);


//----------------------
When('I navigate to Collection page', {timeout: 10*10000}, async()=>{ 
  try{
   await search.tab_collections.click();
   await browser.wait(until.visibilityOf(collection.txt_barcode), 20000, "CollectionPage hasn't displayed");
  }catch(e){
     try{ 
         await login.login_with_valid_credentials();
         await browser.wait(until.visibilityOf(search.txt_search_box), 20000, "Search page hasn't displayed");
         await search.tab_collections.click();
         await browser.wait(until.visibilityOf(collection.txt_barcode), 20000, "CollectionPage hasn't displayed");
     }catch(e){
        await login.openBrowser();
        await login.login_with_valid_credentials();
        await browser.wait(until.visibilityOf(search.txt_search_box), 20000, "Search page hasn't displayed");
        await search.tab_collections.click();
        await browser.wait(until.visibilityOf(collection.txt_barcode), 20000, "CollectionPage hasn't displayed");
     }
  }
});

Then('I should see collection page with following elements:', {timeout: 10*10000}, async(data)=>{ 
   var txt_rows = data.rows();
   for(var index in txt_rows){
      let txt_value = txt_rows[index][0];
      await collection.verify_elements(txt_value);
   };
});

When('I click display records', {timeout: 10*10000}, async()=>{ 
   try{
      await collection.btn_displayRecords.click();
   }catch(e){
      await collection.btn_displayRecords.click(); 
   };
});

Then('I should see the {string} message', {timeout: 10*10000}, async(txt_msg)=>{ 
   switch(txt_msg){
      case 'No results found.' :
         (await browser.wait(until.visibilityOf(collection.err_msg_no_result_found), 20000, txt_msg+" Error message hasn't displayed"));
         let get_text = await collection.err_msg_no_result_found.getText();
         assert.equal(txt_msg, get_text);
         break;
      case 'Barcode(s) not found' :
         await browser.wait(until.visibilityOf(collection.err_msg_barcode_not_found), 20000, txt_msg+" Error message hasn't displayed");
         let get_err_text = await collection.err_msg_barcode_not_found.getText();
         assert.include(get_err_text, txt_msg);
         break;         
   };
});

When('I enter valid barcode {string} in collection search box', {timeout: 10*10000}, async(txt_barcode)=>{ 
   await collection.txt_barcode.sendKeys(txt_barcode);
   await collection.btn_displayRecords.click();
   await browser.wait(until.visibilityOf(collection.collection_search_result), 20000, "Collection Search result hasn't displayed")
});

When('I click clear search', {timeout: 10*10000}, async()=>{ 
   await collection.btn_clearSearch.click();
});

Then('I should see the entered barcode cleared in collection search box', {timeout: 10*10000}, async()=>{ 
   let get_text = await collection.txt_barcode.getAttribute('value')
   assert.isEmpty(get_text,"Barcode value is not cleared");
   await browser.wait(until.invisibilityOf(collection.collection_search_result), 20000, "Collection Search result has displayed") 
});

Then('I should see search results in collection page', {timeout: 10*10000}, async()=>{ 
   await browser.wait(until.visibilityOf(collection.collection_search_result), 20000, "Collection Search result hasn't displayed")
});

When('I enter invalid barcode {string} in collection search box', {timeout: 10*10000}, async(txt_barcode)=>{ 
   await collection.txt_barcode.sendKeys(txt_barcode);
});

Then('I should see search results with following elements:', {timeout: 10*10000}, async(table_data)=>{ 
   let row = table_data.rows();
   for(let index in row){
      let txt_value = row[index][0];
      let get_text = await collection.get_collection_page.getText();
      assert.include(get_text, txt_value, txt_value+" field hasn't displayed");
   };
});

let get_barcode: any;
When('I obtain available barcode for {string}', {timeout: 10*10000}, async function (owning_instituation){ 
   get_barcode = await collection.get_barcode_in_scsb_las('NotAvailable', owning_instituation, 'testing');
   this.attach("Barcode = "+get_barcode);
})

When('I obtain Notavailable barcode for {string}', {timeout: 10*10000}, async function (owning_instituation){ 
   get_barcode = await collection.get_barcode_in_scsb_las('Available', owning_instituation, 'testing');
   this.attach("Barcode = "+get_barcode);
});

When('I obtain {string} barcode for {string}', {timeout: 10*10000}, async(CGD, owning_instituation)=>{ 
   get_barcode = await collection.get_barcode_in_scsb_las('NotAvailable', owning_instituation, CGD);
   console.log("tt")
});

When('I enter valid Barcode in collection search box', {timeout: 10*10000}, async()=>{ 
   await collection.txt_barcode.sendKeys(get_barcode);
});

When('I click on the barcode title', {timeout: 10*10000}, async()=>{ 
   try{
   await collection.lnk_barcode_title.click();
   await browser.wait(until.visibilityOf(collection.get_collection_details_text), 20000, "Collection details page hasn't displayed")
   }finally{
      await browser.sleep(5000);
   }
});

Then('I should see item detail page with following elements', {timeout: 10*10000}, async(table_data)=>{
   let row = table_data.rows();
   for(let index in row){
      let txt_value = row[index][0];
      let get_text = await collection.get_collection_details_text.getText();
      console.log(get_text)
      assert.include(get_text.toLocaleUpperCase(), txt_value.toLocaleUpperCase(), txt_value+" value hasn't displayed");
   };
});

Then('I should see item detail page', {timeout: 10*10000}, async()=>{ 
   await browser.wait(until.visibilityOf(collection.get_collection_details_text), 20000, "Collection details page hasn't displayed")
   await browser.sleep(3000);
});

When('I can see Edit CGD selected by default', {timeout: 10*10000}, async()=>{ 
   let get_value = await collection.radio_edit_cgd.getAttribute('checked');
   assert.equal('true', get_value,"Edit CGD value is not selected" )
});

let get_new_cgd_value: any;
When('I select New CGD', {timeout: 10*10000}, async()=>{ 
   let get_cgd_value = await collection.select_new_cgd.getAttribute('value');
   get_new_cgd_value = await collection.choose_new_cgd(get_cgd_value);
   console.log(get_cgd_value);
});

When('I enter CGD change notes', {timeout: 10*10000}, async()=>{
   await browser.wait(until.visibilityOf(collection.txt_cgd_change_notes), 20000, "Change Notes hasn't displayed");
   await collection.txt_cgd_change_notes.sendKeys('Testing');
});

When('I click Save', {timeout: 10*10000}, async()=>{ 
   await browser.sleep(2000);
   try{
      await browser.wait(until.visibilityOf(collection.btn_save), 20000, "Save button hasn't displayed");
      await collection.btn_save.click();
   }catch(e){
      await browser.wait(until.visibilityOf(collection.btn_save), 20000, "Save button hasn't displayed");
      await collection.btn_save.click();
   }
});

Then('I should see {string}', {timeout: 10*10000}, async function(success_msg){ 
   try{
      await browser.wait(until.visibilityOf(collection.success_msg), 20000, "The success_msg hasn't displayed");
      let get_msg_text = await collection.success_msg.getText();
      assert.equal(get_msg_text,success_msg, "The "+ success_msg+" hasn't displayed");
   }catch(e){
      let get_error_msg = await collection.txt_error_msg.getText();
      this.attach("The Error message is := "+ get_error_msg[1]);
                await browser.sleep(1000);
                //await browser.executeScript("document.body.style.transform='scale(0.8)'");
                await browser.executeScript("document.body.style.zoom='75%';");
                await browser.sleep(1000);
                const screenShot = await
                browser.takeScreenshot();
                this.attach(screenShot, "image/png")
   };
});

When('I search with same barcode in collection page', {timeout: 10*10000}, async()=>{ 
   try{
      await collection.icon_close.click();
      await browser.wait(until.visibilityOf(collection.txt_barcode), 20000, "Collection page hasn't displayed");
   
   }catch(e){
      await collection.icon_close.click();
      await browser.wait(until.visibilityOf(collection.txt_barcode), 20000, "Collection page hasn't displayed");
   }
      await browser.sleep(2000);
   await collection.btn_displayRecords.click();
   //await browser.wait(until.visibilityOf(collection.collection_search_result), 20000, "Collection search Result hasn't displayed");
});

Then('I should see updated CGD value in search result', {timeout: 10*10000}, async()=>{
   let get_cgd_value = await collection.item_cgd_value.getText();
   assert.equal(get_new_cgd_value, get_cgd_value, "The item CGD hasn't modified successfully")
});

Then('I should see the following error details', {timeout: 10*10000}, async(table_data)=>{
   let row = table_data.rows();
   for(let index in row){
      let txt_value = row[index][0];
      let get_text = await collection.verify_error(txt_value);
      try{
         assert.equal(get_text, txt_value, txt_value+" error message hasn't displayed" );
      }catch(e){
         await collection.radio_deaccession.click();
         await browser.wait(until.visibilityOf(collection.select_delivery_location), 20000, "Deaccession Page hasn't displayed");
         await collection.btn_collectionDeaccession.click()
         await browser.sleep(5000);
         let get_text = await collection.verify_error(txt_value);
         assert.equal(get_text, txt_value, txt_value+" error message hasn't displayed" );
      }
   };
});

When('I choose deaccession', {timeout: 10*10000}, async()=>{
   await browser.sleep(5000);
   await browser.wait(until.visibilityOf(collection.radio_deaccession), 20000, "Deaccession radio button hasn't displayed");
   await collection.radio_deaccession.click();
   await browser.sleep(5000);
   await browser.wait(until.visibilityOf(collection.select_delivery_location), 20000, "Deaccession Page hasn't displayed");
});

When('I click deaccession item button', {timeout: 10*10000}, async()=>{
   try{
      await collection.btn_collectionDeaccession.click()
      await browser.sleep(5000);
   }catch(e){
      await collection.btn_collectionDeaccession.click()
      await browser.sleep(5000);
   }
});

When('I select delivery Location', {timeout: 10*10000}, async()=>{
   await collection.choose_delivery_location();
});

When('I enter deaccession notes', {timeout: 10*10000}, async()=>{
   await collection.txt_deaccession_notes.sendKeys('testing');
});
