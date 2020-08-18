import { Given, When, Then } from "cucumber";
import LoginPage = require('./../Pages/LoginPage');
import SearchPage = require('./../Pages/SearchPage');
import {browser, element,by,protractor, until, ElementFinder, $, $$} from 'protractor';
import {expect, assert} from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
var chai = require('chai');
chai.use(chaiAsPromised);
const login: LoginPage = new LoginPage();



export{
    Given, When, Then , LoginPage  ,browser, element,by,protractor, until, ElementFinder, $, $$, expect, assert,
}