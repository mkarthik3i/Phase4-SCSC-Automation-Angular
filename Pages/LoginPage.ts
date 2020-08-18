import {browser, element, by, protractor} from 'protractor';

var testdata = require('./../config/testdata.json');

import UtilsPage = require('../utils/utils');
const UtilPage: UtilsPage = new UtilsPage();

import SearchPage = require('./../Pages/SearchPage');
const search: SearchPage = new SearchPage();

var until = protractor.ExpectedConditions;

var urlwithvalidcredetails = testdata.url_test;

class LoginPage {        

  //-------------------------------------------------------
  txt_username           = element(by.id('username')); // User Name
  txt_password           = element(by.id('password')); // Password
  bt_submit              = element(by.id('submitBtn'));   // submit Button
  select_institution     = element(by.id('institution')); // select Instituation
  btn_login              = element(by.name('submit')); // Login button
  err_msg                = element(by.className('help-block')); //Home page error message -This Field is required
  txt_error_msg          = element(by.xpath("//*[@id='fm1']/div/span")); //Login Page error message - Invalid credentials.
  twitter_block          = element(by.className('twitter-block')); //Twitter
  logo_cul               = element(by.className('member-columbia-univ-logo'));//CUL Logo
  logo_pul               = element(by.className('member-princeton-univ-logo'));//PUL Logo
  logo_nypl              = element(by.className('member-ny-public-logo'));//NYPL Logo
  lnk_home               = element(by.linkText("Home")); // Home
  lnk_facility           = element(by.linkText("Facility & Storage")); //Facility & Storage  
  lnk_opertations        = element(by.linkText("Operations & Statistics")); //Operations & Statistics 
  lnk_collections        = element(by.linkText("Collections & Services")); //Collections & Services 
  lnk_information        = element(by.linkText("Information & Publications")); //Information & Publications


  //------------------------------------------------------
  
  async openBrowser(){  
    await browser.get(urlwithvalidcredetails["url"], 80000);
    await browser.wait(until.visibilityOf(this.select_institution), 20000, "Home Page hasn't displayed");
   };

async login_with_valid_credentials(){
   await UtilPage.selectDropdownByText('HTC', "Instituation hasn't selected in UI");
   await UtilPage.clickElement(this.bt_submit, "Submit button hasn't displayed");
   await browser.sleep(10000);
    console.log("UserName Available = " + await this.txt_username.isPresent())
    if (await this.txt_username.isPresent() == true){
    await browser.wait(until.visibilityOf(this.txt_username), 30000, "The User Name text field hasn't displayed");
    await UtilPage.sendtext(this.txt_username, urlwithvalidcredetails["username"], "User Name hasn't displayed");
    await UtilPage.sendtext(this.txt_password, urlwithvalidcredetails["password"], "Password hasn't displayed");
    await UtilPage.clickElement(this.btn_login, "Submit button hasn't displayed");
    await browser.wait(until.visibilityOf(search.txt_search_box), 30000, "Search box hasn't displayed");
  }else{
    if (await search.txt_search_box.isPresent() != true){
      await this.openBrowser();
      await this.successfull_login();
    };

  }
};
async successfull_login(){
  await UtilPage.selectDropdownByText('HTC', "Instituation hasn't selected in UI");
   await UtilPage.clickElement(this.bt_submit, "Submit button hasn't displayed");
   await browser.sleep(10000);
    console.log("UserName Available = " + await this.txt_username.isPresent())
    if (await this.txt_username.isPresent() == true){
    await browser.wait(until.visibilityOf(this.txt_username), 30000, "The User Name text field hasn't displayed");
    await UtilPage.sendtext(this.txt_username, urlwithvalidcredetails["username"], "User Name hasn't displayed");
    await UtilPage.sendtext(this.txt_password, urlwithvalidcredetails["password"], "Password hasn't displayed");
    await UtilPage.clickElement(this.btn_login, "Submit button hasn't displayed");
    await browser.wait(until.visibilityOf(search.txt_search_box), 30000, "Search box hasn't displayed");
    }
};


async lauch_search_page(){
  try{
    await browser.wait(until.visibilityOf(search.txt_search_box), 30000, "Search box hasn't displayed");
     }catch(e){
      console.log(e);
    }finally{
            this.openBrowser();
            await UtilPage.selectDropdownByText('HTC', "Instituation hasn't selected in UI");
            await UtilPage.clickElement(this.bt_submit, "Submit button hasn't displayed");
            await browser.sleep(5000);
          if (await this.txt_username.isPresent() == true){
              await browser.wait(until.visibilityOf(this.txt_username), 30000, "The User Name text field hasn't displayed");
              await UtilPage.sendtext(this.txt_username, urlwithvalidcredetails["username"], "User Name hasn't displayed");
              await UtilPage.sendtext(this.txt_password, urlwithvalidcredetails["password"], "Password hasn't displayed");
              await UtilPage.clickElement(this.btn_login, "Submit button hasn't displayed");
              await browser.wait(until.visibilityOf(search.txt_search_box), 30000, "Search box hasn't displayed");
          }
       }
};

async login_with_invalid_credentials(){
  await UtilPage.selectDropdownByText('HTC', "Instituation hasn't selected in UI");
  await UtilPage.clickElement(this.bt_submit, "Submit button hasn't displayed");
  await browser.sleep(5000);
 if (await this.txt_username.isPresent() == true){
   await browser.wait(until.visibilityOf(this.txt_username), 30000, "The User Name text field hasn't displayed");
   await UtilPage.sendtext(this.txt_username,testdata.invalidCredentials["username"], "User Name hasn't displayed");
   await UtilPage.sendtext(this.txt_password,testdata.invalidCredentials["password"], "Password hasn't displayed");
   await UtilPage.clickElement(this.btn_login, "Submit button hasn't displayed");
 };
}

async click_logo(institutions){
  await browser.sleep(2000);
  switch (institutions){
    case 'CUL':
      await UtilPage.clickElement(this.logo_cul, "CUL logo hasn't displayed");
      break;
    case 'PUL':
      await UtilPage.clickElement(this.logo_pul, "PUL logo hasn't displayed");
      break;
    case 'NYPL':
      await UtilPage.clickElement(this.logo_nypl, "NYPL logo hasn't displayed");
      break;
      
    };
};

async click_home_link(institutions: any){
  await browser.sleep(2000);
  switch(institutions){
    case 'Home':
        await UtilPage.clickElement(this.lnk_home, "Home link page hasn't displayed");
        break;
    case 'Facility & Storage' :
      await UtilPage.clickElement(this.lnk_facility, "Facility & Storage page hasn't displayed");
      break;
    case 'Operations & Statistics' :
        await UtilPage.clickElement(this.lnk_opertations, "Operations & Statistics page hasn't displayed");
      break;
    case 'Collections & Services' :
      await UtilPage.clickElement(this.lnk_collections, "Collections & Services page hasn't displayed");
      break;
    case 'Information & Publications' :
      await UtilPage.clickElement(this.lnk_information, "Information & Publications page hasn't displayed");
      break;

  };

  };

};
export = LoginPage;