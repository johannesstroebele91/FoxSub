exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['../dist/e2e/tests/todo.spec.js']
};