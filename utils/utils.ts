import { browser, by, element, protractor } from "protractor";

var until = protractor.ExpectedConditions;
class CommonUtils{

    async selectDropdownByText(txt_input, err_msg,){
        let element_txt =await browser.element(by.tagName('option'))
        //await browser.wait(until.visibilityOf(element_txt), 30000, err_msg);
        let select_element_text = element.all(by.tagName('option'));
        let rr1 =await select_element_text.count();
       await select_element_text.each(async(element) => {
        let txt_select_element = await element.getAttribute('value');
        if(txt_select_element == txt_input){
            await element.click();
          return txt_select_element;
        } 
       });
    };

    async selectDropdownByNumber(element, index, err_msg) {
        await browser.wait(until.visibilityOf(element), 30000, err_msg);
        await element.all(by.tagName('option')).then(async function(options) {
           await options[index].click();
        });      
    };

    async clickElement(element, err_msg){
        await browser.wait(until.visibilityOf(element), 50000, err_msg);
            await element.click();
          
     };  

    async sendtext(element, txt_value, err_msg){
        await browser.wait(until.visibilityOf(element), 30000, err_msg);
        await element.sendKeys(txt_value);
    };

    async waitBrowserForElement(element, err_msg){
        await browser.wait(until.visibilityOf(element), 30000, err_msg); 
    };

    async scrollIntoView (element: any) {
        await browser.executeScript(async (element: any)=>{
           await element.scrollIntoView();
        }, await element.getWebElement());
      };

    async uploadFile (element, fileToUpload :string, err_msg :string){
        await browser.wait(until.visibilityOf(element), 30000, err_msg);
        var path =require('path')
        var absolutePath = path.resolve(__dirname, fileToUpload);
        await element.sendKeys(absolutePath);
    }

    async clickwithButtonext(element, err_msg :string){
        await browser.wait(until.visibilityOf(element), 30000, err_msg);
        await element.click;
    }

    async clickElement_with_mouse_move(element, err_msg){
        await browser.wait(until.visibilityOf(element), 30000, err_msg);
        await browser.actions().mouseMove(element).click().perform();
        browser.sleep(30000);
     };
    

}
export = CommonUtils;