// Importing content from config.js file
const { token, owner } = require('../config');

// packages
const ms = require("ms")
const fs = require("fs");

const figlet = require('figlet');



module.exports = {
    name: 'error',
    async execute(interaction, client, err) {
        if (err.code === 1006) return;
        else console.log(error);
    }
}
