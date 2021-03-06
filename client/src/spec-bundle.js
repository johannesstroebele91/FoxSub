require("core-js/es/reflect");
import 'reflect-metadata';

require("zone.js/dist/zone");
require("zone.js/dist/zone-testing");
const testing = require('@angular/core/testing');

const browser = require('@angular/platform-browser-dynamic/testing'); beforeAll(() => {
  testing.TestBed.resetTestEnvironment();
  testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule,
    browser.platformBrowserDynamicTesting());
});
const context = require.context("./", true, /\.spec\.ts$/);
context.keys().map(context);
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
const modules = requireAll(context);