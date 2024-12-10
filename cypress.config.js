const { defineConfig } = require("cypress");

module.exports = defineConfig({
 

  e2e: {
    baseUrl: 'https://www.advantageonlineshopping.com/',
    defaultCommandTimeout: 15000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
