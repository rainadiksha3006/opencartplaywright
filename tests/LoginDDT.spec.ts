import { test, expect } from "@playwright/test"
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { TestConfig } from "../test.config";
import { DataProvider } from "../utils/dataProvider";


//Load JSON test data from the file logindata.json
const jsonPath = "testdata/logindata.json";
const jsonTestData: any = DataProvider.getTestDataFromJson(jsonPath);

for (const data of jsonTestData) {

    test(`Login test with JSON Data : ${data.testName} @datadriven`, async ({ page }) => {

        const config = new TestConfig();
        await page.goto(config.appUrl);

        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage = new LoginPage(page);
        await loginPage.login(data.email, data.password);

        if (data.expected.toLowerCase() === "success") {
            const myAccountPage = new MyAccountPage(page);
            const isLoggedIn = await myAccountPage.isMyAccountPageDisplayed();
            expect(isLoggedIn).toBe(true);
        }

        else {
            const errorMsg = await loginPage.getLoginErrorMessage();
            expect(errorMsg).toBe(' Warning: No match for E-Mail Address and/or Password.');
        }

    })
}


//Load CSV test data from the file logindata.csv
/* const csvPath = "testdata/logindata.csv";
const csvTestData: any = DataProvider.getTestDataFromCSV(csvPath);

for (const data of csvTestData) {

    test(`Login test with CSV Data : ${data.testName} @datadriven`, async ({ page }) => {

        const config = new TestConfig();
        await page.goto(config.appUrl);

        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage = new LoginPage(page);
        await loginPage.login(data.email, data.password);

        if (data.expected.toLowerCase() === "success") {
            const myAccountPage = new MyAccountPage(page);
            const isLoggedIn = await myAccountPage.isMyAccountPageDisplayed();
            expect(isLoggedIn).toBe(true);
        }

        else {
            const errorMsg = await loginPage.getLoginErrorMessage();
            expect(errorMsg).toBe(' Warning: No match for E-Mail Address and/or Password.');
        }

    })
} */