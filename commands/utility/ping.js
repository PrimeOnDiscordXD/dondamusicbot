const { SlashCommandBuilder } = require("@discordjs/builders")
const { Interaction } = require("discord.js");

module.exports.data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong");

module.exports.run = (client, interaction) => {
    interaction.editReply({
        content: "Pong!"
    })
}