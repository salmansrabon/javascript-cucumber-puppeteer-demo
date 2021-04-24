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

Given("User visits e-commerce website-2", async function () {
    await page.goto("http://automationpractice.com")
})
When('User enters {string} and {string}-2', async function (username, password) {
    await page.waitForSelector(loginSelectors.loginButtonSelector);
    let loginButton = await page.$(loginSelectors.loginButtonSelector);
    await loginButton.click();
    await page.waitForNavigation();

    await page.type(loginSelectors.emailSelector, username);
    await page.type(loginSelectors.passwordSelector, password);

    await page.click(loginSelectors.submitButtonSelector);

});
Then('User gets error message', async function () {
    await page.waitForXPath(loginSelectors.errorXPath);
    let [errorElement] = await page.$x(loginSelectors.errorXPath);
    let errorText = await page.evaluate(e => e.textContent, errorElement);
    console.log(errorText);
    expect(errorText).includes('There is 1 error')

});

After(async () => {
    await browser.close();
});