const { defineConfig } = require("cypress");

const path = require('node:path');
const dotenv = require('dotenv');

const resultadoEnv = dotenv.config({ path: path.resolve(__dirname, '.env.test') });

if (resultadoEnv.error && resultadoEnv.error.code !== 'ENOENT') {
  throw resultadoEnv.error;
}

const variaveisObrigatorias = ['BASE_URL', 'TEST_USER_EMAIL', 'TEST_USER_PASSWORD'];
const variaveisAusentes = variaveisObrigatorias.filter((nome) => !process.env[nome]?.trim());

if (variaveisAusentes.length > 0) {
  throw new Error(`Defina ${variaveisAusentes.join(', ')} no .env.test ou no ambiente. Use .env.example como modelo.`);
}

module.exports = defineConfig({
  env: {
    TEST_USER_EMAIL: process.env.TEST_USER_EMAIL,
    TEST_USER_PASSWORD: process.env.TEST_USER_PASSWORD,
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    reportFilename: 'automation-exercise',
    reportTitle: 'Automation Exercise - Resultados dos testes',
    reportPageTitle: 'Relatório de testes - Automation Exercise',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    saveJson: true,
    overwrite: true,
  },
  e2e: {
    baseUrl: process.env.BASE_URL,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});

