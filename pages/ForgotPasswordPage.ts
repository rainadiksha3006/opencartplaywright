import { Page, Locator, expect } from "@playwright/test";

export class ForgotPasswordPage {

    private readonly page: Page;
    private readonly heading: Locator;

    constructor(page: Page) {
        this.page = page;

        this.heading = page.locator("h1:has-text('Forgot Your Password?')");
    }

    async isForgotPasswordPageVisible() {
        try {
            const isVisible = await this.heading.isVisible();
            return isVisible;
        }
        catch (error) {
            console.log(`Error loading Forgot Password page due to error: ${error}`)
            return false;
        }
    }


}