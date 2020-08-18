'use strict';
import {browser,protractor, element, by} from 'protractor';
import {Given, When, Then, setWorldConstructor} from 'cucumber';
import {expect, assert, util} from 'chai';

import SearchPage = require('./../Pages/SearchPage');
const search: SearchPage = new SearchPage();

import RequestPage = require('./../Pages/RequestPage');
const request: RequestPage = new RequestPage();

import BulkRequestPage = require('./../Pages/BulkRequestPage');
const bulkrequest: BulkRequestPage = new BulkRequestPage();

import UtilsPage = require('../utils/utils');
const UtilPage: UtilsPage = new UtilsPage();

var until = protractor.ExpectedConditions;
var testdata = require('./../config/testdata.json')
//----------------------------

When('I navigate to bulkrequest page', {timeout: 10*10000}, async()=>{ 
   await search.tab_bulkrequest.click();
   await browser.wait(until.visibilityOf(bulkrequest.txt_bulkrequest_name), 20000, "Bulk Request page hasn't displayed")
}); 

let bulkrequest_name: any;
var path = require('path');
When('I enter {string} details', {timeout: 10*10000}, async(txt_institution)=>{ 
   bulkrequest_name = Math.random()+'_testing';
   await bulkrequest.txt_bulkrequest_name.sendKeys(bulkrequest_name);
   var fileToUpload = './../config/'+'bulkrequest_test_data.csv',
   absolutePath = path.resolve(__dirname, fileToUpload);
   await bulkrequest.txt_CSV_file.sendKeys(absolutePath);
   await UtilPage.selectDropdownByText(txt_institution,"Item Owning/Requesting Institution hasn't displayed");
   let patroncode = request.select_patron_barcode(txt_institution);
   await bulkrequest.txt_patron_barcode.sendKeys(patroncode);
   await bulkrequest.select_delivery_location();
   await bulkrequest.txt_patron_email_id.sendKeys(testdata.RequestDetails["EmailId"]);
   await bulkrequest.txt_request_notes.sendKeys(testdata.RequestDetails["Notes"]);
});


Then('I should see all fields are empty', {timeout: 10*10000}, async()=>{ 
   await bulkrequest.verify_clear_status();
});

Then('I should see the bulkrequest status in bulkrequest details page', {timeout: 10*10000}, async()=>{ 
   await request.lnk_search_requests.click();
   await browser.wait(until.visibilityOf(bulkrequest.txt_bulk_request_name_search), 20000, "Bulk Request detail page hasn't dislayed");
});

Then('I should see the bulkrequest status as {string}', {timeout: 10*10000}, async(txt_status)=>{ 
   await bulkrequest.txt_bulk_request_name_search.sendKeys(bulkrequest_name);
   await request.btn_serach_searchrequests.click();
   try{
      await browser.wait(until.visibilityOf(request.search_request_result), 20000, "Bulk request serach result hasn't displayed");
      await browser.sleep(10000);
      let get_status = await bulkrequest.first_item_status.getText();
      assert.equal(get_status, txt_status, "BUlk request hasn't created successfully");
   }catch(e){
      await request.btn_serach_searchrequests.click();
      await browser.wait(until.visibilityOf(request.search_request_result), 20000, "Bulk request serach result hasn't displayed");
      await browser.sleep(5000);
      let get_status = await bulkrequest.first_item_status.getText();
      assert.equal(get_status, txt_status, "BUlk request hasn't created successfully");

   };
});