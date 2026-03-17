/**
 * Test Case:Product Search
 * 
 * Tags: @master @regression
 * 
 * Steps
 * 1)Navigate to application URL
 * 2)Enter the product name in search field
 * 3)Click the search button
 * 4)Verify if the product is diaplyed in the search results
 */


import {test,expect} from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import {SearchResultsPage} from "../pages/SearchResultsPage"
import {TestConfig} from "../test.config";

//Declare reusable variables
let config:TestConfig;
let homePage:HomePage;
let searchResultsPage:SearchResultsPage;

test.beforeEach(async ({page}) => {
    config = new TestConfig();
    await page.goto(config.appUrl);   //Navigate to application

    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
})

test.afterEach(async ({page}) =>{
    await page.close();
})

test('Product Search Test @master @regression' , async () =>{
    const productName = config.productName;

//Enter the product name in search field
await homePage.enterProductName(productName);

//Click the search button
await homePage.clickSearch();

//Verify that the search results page is displayed
expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

//Verify if the searched product is displyed in the search results
expect (await searchResultsPage.isProductExist(productName)).toBeTruthy();

})