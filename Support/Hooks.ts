import {browser} from 'protractor';
import {Before, After} from 'cucumber';

Before(function (scenario) {       
        console.log("Application Loading......!");
        console.log(this);
        browser.manage().deleteAllCookies();

// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
});

 After(async function(scenario){
        if (scenario.result.status == 'failed'){
                await browser.sleep(1000);
                //await browser.executeScript("document.body.style.transform='scale(0.8)'");
                await browser.executeScript("document.body.style.zoom='75%';");
                await browser.sleep(1000);
                const screenShot = await
                browser.takeScreenshot();
                this.attach(screenShot, "image/png")
       };
    }); 

   async({Given, When, Then, setDefaultTimeout}) => {
     setDefaultTimeout(2 * 80000);  
    };
