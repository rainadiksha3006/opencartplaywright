import { Page, Locator } from '@playwright/test';
import { HomePage } from "../pages/HomePage";

export class LogoutPage {
    private readonly page: Page;
    private readonly btnContinue: Locator;

    constructor(page: Page) {
        this.page = page;

        this.btnContinue = page.locator('.btn.btn-primary');
    }

    //Click the Continue button after logout 
    async clickContinue(): Promise<HomePage> {

        await this.btnContinue.click();
        return new HomePage(this.page);
    }

    //verifies Continue button is visible
    async isContinueButtonVisible() {
        return await this.btnContinue.isVisible();
    }

}