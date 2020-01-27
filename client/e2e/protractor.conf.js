exports.config = {
  rootElement: 'body',
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['../dist/e2e/tests/todo.spec.js'],
  getPageTimeout: 12000,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--no-sandbox']
    }
  }
};