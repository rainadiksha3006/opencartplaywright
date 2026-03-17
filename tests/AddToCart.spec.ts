/**
 * Test Case : Add product to cart
 * Tags : @master @regression
 * 
 * Steps
 * 1) Navigate to the application
 * 2) Enter an existing product name  in search box
 * 3) Click on search button
 * 4) Verify the product appears in the search results
 * 5) Select the product
 * 6) Seelct the quantity
 * 7) Add the product to the cart
 * 8) Verify the success message
 * 
 */

import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "../pages/ProductPage";

//Shared instances
let config: TestConfig;
let homePage: HomePage;
let searchResultsPage: SearchResultsPage;
let productPage: ProductPage;

test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl);

    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
    productPage = new ProductPage(page);
})

test.afterEach(async ({ page }) => {
    await page.close();
})

test('Add to cart test @master @regression', async () => {

    let product = config.productName;
    let qty = config.productQuantity;

    //2) Enter an existing product name  in search box
    await homePage.enterProductName(product);

    //3) Click on search button
    await homePage.clickSearch();

    //verify the search results page is diaplyed
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy()

    // 4) Verify the product appears in the search results
    expect(await searchResultsPage.isProductExist(product)).toBeTruthy();

    if (await searchResultsPage.isProductExist(product)) {
        // 5) Select the product
        await searchResultsPage.selectProduct(product);

        //6) Select the quantity
        await productPage.setQuantity(qty);

        //7) Add the product to the cart
        await productPage.addToCart();
    }

    //8) Verify the success message
    expect(await productPage.isConfirmationMessageVisible()).toBeTruthy();

});
