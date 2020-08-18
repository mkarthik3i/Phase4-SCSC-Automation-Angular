
import {element,by, browser,protractor} from 'protractor';

import UtilsPage = require('../utils/utils');
const UtilPage: UtilsPage = new UtilsPage();

import SearchPage = require('./../Pages/SearchPage');
const search: SearchPage = new SearchPage();

import RequestPage = require('./../Pages/RequestPage');
const request: RequestPage = new RequestPage();

var until = protractor.ExpectedConditions;
var api = require('../utils/api');
var testdata = require('./../config/testdata.json')

let responce: any
let url = testdata.RestAPI["url"];
class RestapiPage {        
//----------------------Collection Page -----------------------------------------------------------

async restApi_services(txt_rest_service: any, item_info: any){
    let payload: any;
    let responce_with_testdata: any[] = new Array(2);
    switch(txt_rest_service){
        case 'purgeEmailAddress' :
            responce = await api.getRequest(url+testdata.RestAPI["purgeEmailAddress"]);
            payload ="";
            break;
        case 'purgeExceptionRequests' :
            responce = await api.getRequest(url+testdata.RestAPI["purgeExceptionRequests"]);
            payload ="";
            break;
        case 'holdItem' :
            let get_patron_code = await request.select_patron_barcode(item_info[1])
             payload = {
                "author": "string",
                "bibId": "string",
                "callNumber": "string",
                "itemBarcodes": [
                    item_info[0]
                ],
                "itemOwningInstitution": item_info[1],
                "patronIdentifier": get_patron_code,
                "pickupLocation": item_info[2],
                "title": "string",
                "trackingId": "string"
              }
            responce = await api.postRequest(url+testdata.RestAPI["holdItem"], payload);
        case 'cancelHoldItem' :
            payload = {
                "bibId": "string",
                "itemBarcodes": [
                    item_info[0]
                ],
                "itemOwningInstitution": item_info[2],
                "patronIdentifier": item_info[1],
                "pickupLocation": item_info[3],
                "trackingId": "string"
              }
              responce = await api.postRequest(url+testdata.RestAPI["holdItem"], payload);
      };
     let responce_result: any;
        try{
            responce_result = await responce.data
        }catch(e){
          responce_result = " There is no responce or RestApi serive is not functioning"
        }
        responce_with_testdata[0] = responce_result;
        responce_with_testdata[1] = payload;
    return responce_with_testdata;
};


};
export = RestapiPage;