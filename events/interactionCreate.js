// Importing content from config.js file
const { token, owner } = require('../config');


// packages
const ms = require("ms")
const fs = require("fs");

const figlet = require('figlet');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        // slash command handler

        await interaction.deferReply();
        if (interaction.isCommand()) {
            let name = interaction.commandName;
            let options = interaction.options;

            let commands = require("../slash-register").commands;
            let commandMethod = commands.get(name);
            if (!commandMethod) return

            commandMethod.run(client, interaction, options)

        } else if (interaction.isButton()) {

            let button_id = interaction.customId;
            // button_id = (commandname)-(uderid)-ban-(id)
            let [command, user_id, action, id] = button_id.split("-");
            // ["ban", "id"]
            let guild = interaction.guild;
            let member = guild.members.cache.get(id);

            if (member.id !== user_id) return;

            let buttonCallback = commands.get(command);
            if (!buttonCallback) return;

            buttonCallback.button(client, interaction, member, action)
        }
    }
};
