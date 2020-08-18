'use strict';
import {Given, When, Then,setWorldConstructor, JsonFormatter} from 'cucumber';
import {browser, element, by, protractor} from 'protractor';
import {expect, assert} from 'chai';

import LoginPage = require('../Pages/LoginPage');
const login: LoginPage = new LoginPage();

import SearchPage = require('./../Pages/SearchPage');
const search: SearchPage = new SearchPage();

import window_switch = require('./../utils/browser_helper')
const switch_window: window_switch = new window_switch();

var until = protractor.ExpectedConditions;

export function World ({attach, parameters}) {
this.attach = attach;
this.parameters = parameters;
};
setWorldConstructor(World);

//------------------------------------------------------------------------------------
  Given('I launch the SCSB application',{timeout: 5 * 10000}, async function(){
    login.openBrowser();
    await browser.wait(until.visibilityOf(login.select_institution), 2000, "Home page hasn't displayed");
});

When('I login with valid credentials', {timeout: 10 * 10000}, async function () {
  await login.login_with_valid_credentials()
}); 

When('I click login button', {timeout: 10*10000}, async()=>{
   await login.bt_submit.click();
});

Then('I should see following error messages as {string}',{timeout: 5*10000}, async(txt_msg)=>{
    const app_msg =  await login.err_msg.getText();
    assert.equal(app_msg, txt_msg)
}); 

When('I enter invalid credentials', {timeout: 5*10000}, async()=>{
  await login.login_with_invalid_credentials()
});

Then('I should see the error message {string}',{timeout: 5*10000}, async(txt_error)=>{
  const login_error_msg =  await login.txt_error_msg.getText();
  assert.equal(login_error_msg, txt_error); 
});


When('I click Recap {string} on login page:',{timeout: 5*10000}, async(lnk_txt)=>{
  await browser.wait(login.twitter_block.isPresent(),10000, "The SearchPage hasn't displayed")
  await login.click_home_link(lnk_txt);
});

When('I click submit button',{timeout: 5*10000}, async()=>{
  await browser.sleep(2000);
});

Then('I should navigate to search page', {timeout: 10*5000}, async()=>{
 await browser.wait(search.txt_search_box.isPresent(),30000, "The SearchPage hasn't displayed")
});

When('I click logout', {timeout: 10*5000}, async()=>{
  await browser.wait(search.lnk_logout.isPresent(),10000, "The SearchPage hasn't displayed")
  await search.lnk_logout.click();
});

Then('I should navigate login page',{timeout: 10*5000}, async()=>{
   await browser.wait(login.bt_submit.isPresent(),30000, "The SearchPage hasn't displayed")
});

Then('I should see Recap tweet timeline in login page',{timeout: 10*5000}, async()=>{
 await browser.wait(until.visibilityOf(login.twitter_block),30000, "The SearchPage hasn't displayed")
});

When('I click Institutions {string} on login page:',{timeout: 2*100000}, async(txt_institutions)=>{
  await browser.wait(until.visibilityOf(login.twitter_block),30000, "The SearchPage hasn't displayed")
  await login.click_logo(txt_institutions);
});

Then('I should navigate to logo url {string}',{timeout: 10*5000}, async(txt_webpage)=>{
  const current_uri = await browser.getCurrentUrl()
  assert.equal(current_uri,txt_webpage);
  
});

Then('I should navigate to corresponding {string}',{timeout: 10*5000}, async(txt_webpage)=>{
  const current_uri = await switch_window.switch_window();
  await switch_window.switch_window_origin();
  assert.equal(current_uri,txt_webpage);
});
//-------------------------------------------------------------------------------------

