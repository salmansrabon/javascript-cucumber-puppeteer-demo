const { When, Then, Given, Before, AfterAll, After } = require("cucumber")
const browserObject = require("../../browser");
var { setDefaultTimeout } = require('cucumber');
const { loginSelectors } = require('../../selectors/loginSelectors');
const { expect } = require("chai");

setDefaultTimeout(60 * 1000);
let browser, page;
Before(async function () {
    browser = await browserObject.startBrowser();
    page = await browser.newPage();
})
Given("User visits e-commerce website-1", async function () {
    await page.goto("http://automationpractice.com")
})

When('User enters {string} and {string}-1', async function (username, password) {
    await page.waitForSelector(loginSelectors.loginButtonSelector);
    let loginButton = await page.$(loginSelectors.loginButtonSelector);
    await loginButton.click();
    await page.waitForNavigation();

    await page.type(loginSelectors.emailSelector, username);
    await page.type(loginSelectors.passwordSelector, password);

    await page.click(loginSelectors.submitButtonSelector);

});

Then('User can logged in successfully', async function () {
    await page.waitForSelector(loginSelectors.logoutButtonSelector);
    let logoutButton = await page.$(loginSelectors.logoutButtonSelector);

    expect(logoutButton != null).equals(true);
    await logoutButton.click();

});


After(async () => {
    await browser.close();
});