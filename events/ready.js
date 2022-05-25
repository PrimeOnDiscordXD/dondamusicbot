// Importing content from config.js file
const { token, owner } = require('../config');

// packages
const ms = require("ms")
const fs = require("fs");

const figlet = require('figlet');

// Schemas importing
const mongoose = require('mongoose')
module.exports = {
    name: 'ready',
    async execute(client) {

        console.log("⚡ DondaMusic is online")
        client.user.setActivity("ye music", { type: "COMPETING" })
    }
}