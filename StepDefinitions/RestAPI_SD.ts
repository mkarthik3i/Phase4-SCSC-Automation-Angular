'use strict';
import {Given, When, Then,setWorldConstructor, JsonFormatter} from 'cucumber';
import {browser, element, by, protractor} from 'protractor';
import {expect, assert} from 'chai';

import RequestPage = require('../Pages/RequestPage');
const request: RequestPage = new RequestPage();

import SearchPage = require('./../Pages/SearchPage');
const search: SearchPage = new SearchPage();
import ApiPage = require('./../Pages/ApiPage');
const restapi: ApiPage = new ApiPage();

var api = require('../utils/api');
var testdata = require('./../config/testdata.json')
var until = protractor.ExpectedConditions;

export function World ({attach, parameters}) {
this.attach = attach;
this.parameters = parameters;
};
setWorldConstructor(World);

//------------------------------------------------------------------------------------

let responce_result: any;
When('I send request for {string}', {timeout: 5 * 10000}, async(txt_rest_service)=>{
  responce_result = await restapi.restApi_services(txt_rest_service, item_info);
});

Then('I should receive {string} status with details',{timeout: 5 * 10000}, async function(txt_msg){
  let get_status = responce_result[0]['Status'];
  this.attach("Rest Api Responce = " + JSON.stringify(responce_result));
  assert.equal(txt_msg, get_status, "Rest service is failure");
});

Then('I should receive successful responce from API',{timeout: 5 * 10000}, async function(){
  let get_status = responce_result[0]['success'];
  this.attach("Rest Api Test Data = " + JSON.stringify(responce_result[1]));
  this.attach("Rest Api Responce = " + JSON.stringify(responce_result[0]));
  assert.equal(get_status, true, "The REST serive is not functioning");
});

let item_info: any;
When('I obtain picklocation for item',{timeout: 5 * 10000}, async()=>{
  item_info = await search.get_cc_from_1st_search_result();
});

When('I obtain required details for item',{timeout: 5 * 10000}, async()=>{
  item_info = await request.get_request_serach_result_1st_item_details();
});
