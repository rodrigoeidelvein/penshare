/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const {GoogleSocialLogin} = require('cypress-social-logins').plugins
require('dotenv').config();

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    on('task', {
        GoogleSocialLogin: GoogleSocialLogin
    })

    config.env.USER_EMAIL = process.env.USER_EMAIL
    config.env.USER_PASSWORD = process.env.USER_PASSWORD
    config.env.LOGIN_URL = process.env.LOGIN_URL

    return config;
}
