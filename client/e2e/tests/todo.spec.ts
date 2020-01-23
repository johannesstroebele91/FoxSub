import { browser } from "protractor";

describe('angularjs homepage todo list', () => {
  beforeEach(() => {
    browser.get('http://localhost:4200/')
  });
  it('just a test to see if protractor works', () => {
    expect(browser.getTitle()).toContain('Subscription Managerssss')
  });
});

