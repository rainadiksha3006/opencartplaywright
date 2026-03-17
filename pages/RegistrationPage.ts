import {Page,Locator} from "@playwright/test"

export class RegistrationPage{

private readonly page:Page;

//Locators 
private readonly txtFirstName:Locator;
private readonly txtLastName:Locator;
private readonly txtEmail:Locator;
private readonly txtTelephone:Locator;
private readonly txtPassword:Locator;
private readonly txtConfirmPassword:Locator;
private readonly chkdPolicy:Locator;
private readonly btnContinue:Locator;
private readonly msgConfirmation:Locator;
private readonly newsletterYesRadioBtn:Locator

private readonly fNameErrorMsg:Locator;
private readonly lnameErrorMsg:Locator;
private readonly emailErrorMsg:Locator;
private readonly telephoneErrorMsg:Locator;
private readonly passwordErrorMsg:Locator;
private readonly privacyPolicyErrorMsg:Locator;

//constructor
constructor(page:Page)
{
    this.page = page ;

    //Initialize locators with CSS elements
    this.txtFirstName = page.locator('#input-firstname')
    this.txtLastName = page.locator('#input-lastname')
    this.txtEmail = page.locator('#input-email')
    this.txtTelephone = page.locator('#input-telephone')
    this.txtPassword = page.locator('#input-password')
    this.txtConfirmPassword = page.locator('#input-confirm')
    this.chkdPolicy = page.locator('input[name="agree"]')
    this.btnContinue = page.locator('input[value="Continue"]')
    this.msgConfirmation = page.locator('h1:has-text("Your Account Has Been Created!")');

    this.newsletterYesRadioBtn =  page.locator("input[value='1'][name='newsletter']");

    this.fNameErrorMsg =   page.locator('div').filter({ hasText: 'First Name must be between 1 and 32 characters!' }).last();
    this.lnameErrorMsg = page.locator('div').filter({ hasText: 'Last Name must be between 1 and 32 characters!' }).last()
    this.emailErrorMsg = page.locator('div').filter({ hasText: 'E-Mail Address does not appear to be valid!' }).last();
    this.telephoneErrorMsg =  page.locator("//div[contains(text(),'Telephone must be between 3 and 32 characters!')]");
    this.passwordErrorMsg = page.locator("//div[contains(text(),'Password must be between 4 and 20 characters!')]");
    this.privacyPolicyErrorMsg = page.locator("//div[contains(text(),'Warning: You must agree to the Privacy Policy!')]");
}

//Action methods

async setFirstName(fname:string){
    await this.txtFirstName.fill(fname);
}

async setLastName(lname:string){
    await this.txtLastName.fill(lname);
}

async setEmail(email:string){
    await this.txtEmail.fill(email);
}

async setTelephone(tel:string){
    await this.txtTelephone.fill(tel);
}

async setPassword(pwd:string){
    await this.txtPassword.fill(pwd);
}

async setConfirmPassword(pwd:string){
    await this.txtConfirmPassword.fill(pwd);
}

async setPrivacyPolicy(){
    await this.chkdPolicy.click();
}

async clickContinue(){
    await this.btnContinue.click();
}

async getConfirmationMessage(): Promise<string>{
    return await this.msgConfirmation.textContent() ?? '';
}

async getFirstNameErrorMessage() {
    return await this.fNameErrorMsg.textContent() ?? '';
}

async getLastNameErrorMessage() {
    return await this.lnameErrorMsg.textContent() ?? '';
}

async getEmailErrorMessage() {
    return await this.emailErrorMsg.textContent() ?? '';
}


async getTelephoneErrorMessage() {
    return await this.telephoneErrorMsg.textContent() ?? '';
}

async getPasswordErrorMessage() {
    return await this.passwordErrorMsg.textContent() ?? '';
}

async getPrivacyPolicyErrorMessage() {
    return await this.privacyPolicyErrorMsg.textContent() ?? '';
}

async subscribeNewsletter(){
    await this.newsletterYesRadioBtn.click();
}

}









