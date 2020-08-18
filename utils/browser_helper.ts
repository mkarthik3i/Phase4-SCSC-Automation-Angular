'use strict';

const { browser } = require("protractor");

class WindowNavigate{
    async switch_window(){
        await browser.sleep(1000);
        await browser.getAllWindowHandles().then(async function(handles: any[]){
        await browser.driver.switchTo().window(handles[1]).then(async function(){
        });
    });
    return await browser.getCurrentUrl();
    };
    
    async switch_window_origin(){
      await browser.driver.close();
      await browser.getAllWindowHandles().then(async function(handles: any[]){
       await browser.switchTo().window(handles[0]).then(function(){
            //do your stuff on the pop up window
        });
    });
    return await browser.getCurrentUrl();
    };
    
};
export = WindowNavigate;