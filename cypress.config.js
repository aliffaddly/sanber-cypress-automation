const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://kasirdemo.belajarqa.com/",
    specPattern: "cypress/support/e2e",
    chromeWebSecurity: false
  }, 
});
