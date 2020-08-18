
import {element, by, browser, protractor} from "protractor"
import {expect, assert, util} from 'chai';


var search = require('./SearchPage')

import UtilsPage = require('../utils/utils');
import { request } from "http";
const UtilPage: UtilsPage = new UtilsPage();

var until = protractor.ExpectedConditions;
var testdata = require('./../config/testdata.json')

class BulkRequest{

  //----------------------BulkRequest Page Objects -----------------------------------------------------------
  
  //error_msg
  err_msg_bulkrequest_name              = element(by.id("BulkRequestNameErrorMessage")); // Bulk Request Name is required.
  err_msg_Requesting_institution        = element(by.id("requestingInstitutionErrorMessage"));//Requesting institution is required.
  err_msg_CSV_file                      = element(by.id("bulkRequestFileRequired"));//CSV file is required
  err_msg_delivery_location             = element(by.id("deliveryLocationErrorMessage"));//Delivery location is required.
  err_msg_patron_barcode                = element(by.id("patronBarcodeErrorMessage"));//Patron barcode is required.
 
 //BulkRequest
  txt_bulkrequest_name              = element(by.id("BulkRequestName")); // Bulk Request Name*
  txt_Requesting_institution        = element(by.id("requestingInstitutionId"));//Item Owning/Requesting Institution *
  txt_CSV_file                      = element(by.id("file"));//Upload File (CSV file only)*
  txt_delivery_location             = element(by.id("deliveryLocation"));//Delivery Location*
  txt_patron_barcode                = element(by.id("patronBarcodeId"));//Patron Barcode *
  txt_patron_email_id               = element(by.id("patronEmailId"));//Patron Email Address
  txt_request_notes                 = element(by.id("requestNotesId"));//Request Notes
  btn_create_bulk_request           = element(by.id("createrequestsubmit"));//createBulkRequest
  btn_clear                         = element(by.id("createrequestclear"));//createrequestclear

  //BUlk request detailspage

  txt_bulk_request_name_search      = element(by.id("bulkRequestNameSearch"));
  first_item_status                 = element(by.xpath("//*[@id='requestResults-0']/td[10]/span/span"));// PROCESSED
 //----------------------------------------------------------------------------------------------------------------------------------


    async verify_clear_status(){
      let bulkrequest_name = await(this.txt_bulkrequest_name.getAttribute("value"));
          assert.isEmpty(bulkrequest_name, 'bulkrequest_name field is not empty');
      let CSV_file = await this.txt_CSV_file.getAttribute('value');
          assert.isEmpty(CSV_file, 'CSV_file field is not empty');
      let Requesting_institution = await this.txt_Requesting_institution.getAttribute('value');
          assert.isEmpty(Requesting_institution, 'Requesting_institution is not empty');
      let patron_barcode = await this.txt_patron_barcode.getAttribute('value');
          assert.isEmpty(patron_barcode, 'patron_barcode field is not empty');
      let delivery_location = await this.txt_delivery_location.getAttribute('value');
          assert.isEmpty(delivery_location, 'delivery_location field is not empty');
      let patron_email_id = await this.txt_patron_email_id.getAttribute('value');
          assert.isEmpty(patron_email_id, 'patron_email_id field is not empty');
      let request_notes = await this.txt_request_notes.getAttribute('value');
          assert.isEmpty(request_notes, 'request_notes field is not empty');
      };

async select_delivery_location(){
     await this.txt_delivery_location.click();
     await browser.sleep(3000);
     await this.txt_delivery_location.click();
     await browser.sleep(2000);
     let dl: any[] = new Array(1);
     var get_dl_list = await this.txt_delivery_location.all(by.tagName('option'));

     if(get_dl_list.length == 1){
        return " There is no delivery location in drop down"
     };

     for(let i=0; get_dl_list.length>i; i++){
         dl[i] = await get_dl_list[i].getText();
     }
     //To remove empty values
     let dl_value = dl.filter(item => item);
     this.txt_delivery_location.sendKeys(dl_value[0]);
     return dl_value[0];
};

//-------------------
};
export = BulkRequest;