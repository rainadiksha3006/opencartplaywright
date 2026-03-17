import { Page, Locator } from "@playwright/test"
import { LogoutPage} from "../pages/LogoutPage";
import {NewsletterPage} from "../pages/NewsletterPage";

export class MyAccountPage {

 private readonly page: Page;
 private readonly msgHeading:Locator;
 private readonly lnkLogout:Locator;
 private readonly lnkNewsletter :Locator;

 constructor(page:Page)
 {
    this.page = page;

    //Initialize locators with CSS elements
    this.msgHeading = page.locator('h2:has-text("My Account")');
    this.lnkLogout = page.locator("a:nth-child(13)");
    this.lnkNewsletter = page.locator("a:nth-child(12)");
 }

 //verifies if My Account Page is displayed

 async isMyAccountPageDisplayed():Promise<boolean>{
    try{
        const isVisible = await this.msgHeading.isVisible();
        return isVisible;
    }
    catch(error)
    {
        console.log(`Error checking My Account page heading visibility:${error}`);
        return false;

    }
 }

 async clickOnLogout(){
    try{
        await this.lnkLogout.click();
        return new LogoutPage(this.page);
    }
    catch(error){
        console.log(`Unable to click Logout link:${error}`);
        throw error; //Re-throw the error to fail the test
    }
 }

async getPageTitle(){
    return (this.page.title());
}

async clickOnNewsletter(){
    try{
        await this.lnkNewsletter.click();
        return new NewsletterPage(this.page);
    }
    catch(error){
        console.log(`Unable to click on Newsletter link:${error}`);
        throw error;
    }
}

}