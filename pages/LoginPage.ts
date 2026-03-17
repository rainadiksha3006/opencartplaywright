import { Page, Locator } from "@playwright/test"
import { ForgotPasswordPage } from "./ForgotPasswordPage";

export class LoginPage {

   private readonly page: Page;
   private readonly txtEmailAddress: Locator;
   private readonly txtPassword: Locator;
   private readonly loginBtn: Locator;
   private readonly txtErrorMsg: Locator;
   private readonly forgottenPasswordLink: Locator;

   constructor(page: Page) {
      this.page = page;

      this.txtEmailAddress = page.locator('#input-email');
      this.txtPassword = page.locator('#input-password');
      this.loginBtn = page.locator("input[value='Login']");
      this.txtErrorMsg = page.locator('.alert.alert-danger.alert-dismissible')
      this.forgottenPasswordLink = page.locator("div[class='form-group'] a");
   }

   async enterEmailAddress(email: string) {
      await this.txtEmailAddress.clear();
      await this.txtEmailAddress.fill(email);
   }

   async enterPassword(pwd: string) {
      await this.txtPassword.clear();
      await this.txtPassword.fill(pwd);
   }

   async clickOnLoginButton() {
      await this.loginBtn.click();
   }

   //single method for all actions.
   async login(email: string, pwd: string) {
      await this.txtEmailAddress.fill(email);
      await this.txtPassword.fill(pwd);
      await this.loginBtn.click();
   }

   async getLoginErrorMessage() {
      return (this.txtErrorMsg.textContent());
   }

   async clickOnForgetPasswordLink() {
      try {
         await this.forgottenPasswordLink.click();
         return new ForgotPasswordPage(this.page);
      }
      catch (error) {
         console.log(`Unable to click on Forget Password link:${error}`)
         throw error;
      }
   }
}