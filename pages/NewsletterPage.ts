import { Page, expect, Locator } from '@playwright/test';
import { MyAccountPage } from './MyAccountPage';

export class NewsletterPage {
    private readonly page: Page;

    // Locators
    private readonly radioBtnNo: Locator;
    private readonly radioBtnYes: Locator;
    private readonly backBtn: Locator;
    private readonly continueBtn: Locator;
    private readonly msgHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        this.radioBtnNo = page.getByLabel('No');
        this.radioBtnYes = page.getByLabel('Yes');
        this.backBtn = page.locator("a[class='btn btn-default']");
        this.continueBtn = page.locator("input[class='btn btn-primary']");
        this.msgHeading = page.locator('h1:has-text("Newsletter Subscription")');

    }

    async isYesRadioBtnSelected() : Promise<boolean>{
        return await this.radioBtnYes.isChecked();
    }

    async isNoRadioBtnSelected() {
        return await this.radioBtnNo.isChecked();
    }

    async clickBack() {
        await this.backBtn.click();
        return new MyAccountPage(this.page);
    }

    async clickContinue() {
        await this.continueBtn.click();
        return new MyAccountPage(this.page);
    }

    async isNewsletterPageDisplayed() {
        try {
            const isVisible = await this.msgHeading.isVisible();
            return isVisible;
        }
        catch (error) {
            console.log(`Error checking Newsletter page heading visibility :${error}`);
            return false;
        }
    }
}