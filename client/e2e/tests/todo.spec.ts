import { browser, element, by } from "protractor";
import { async } from "@angular/core/testing";

describe('angularjs homepage todo list', () => {

  it('just a test to see if protractor works', async () => {
    // await browser.waitForAngularEnabled(false);

    // browser.ignoreSynchronization = true;
    await browser.get('http://localhost:4200/login')

    expect(browser.getTitle()).toContain('Subscription Manager')
  });
});
