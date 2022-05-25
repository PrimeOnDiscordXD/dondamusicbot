// Importing discord.js packages
const Discord = require("discord.js");
const Intents = require("discord.js");
const client = new Discord.Client({ disableMention: 'everyone', intents: [Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_VOICE_STATES], partials: ['CHANNEL', 'MESSAGE', 'GUILD_MEMBER', 'REACTION'] })
const { MessageEmbed, MessageActionRow, MessageButton, WebhookClient, GuildMember, Collection } = require("discord.js")


// Importing content from config.js file
const { token, owner } = require('./config');


// packages
const ms = require("ms")
const fs = require("fs");

const figlet = require('figlet');

// Schemas importing

// ———————————————[Global Variables]———————————————
client.commands = new Collection()


const functions = fs.readdirSync("./functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
// Initializing the project.

//slash commands
require("./slash-register")(true) // type true between the () to update commands
let commands = require("./slash-register").commands;

// Cool terminal style
figlet('DondaMusic Beta', function(err, data) {
    if (err) {
        console.log('Something went wrong with figlet');
        console.dir(err);
        return;
    }
    console.log(data)
});

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./events")
    client.login(token)
})();



