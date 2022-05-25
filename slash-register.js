const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config');
const fs = require('fs');
const command = require('nodemon/lib/config/command');
const { client } = require('./index.js');
const commands = [];
const commandList = new Map();

module.exports = async (updateCommands) => {
	const commandFolders = fs.readdirSync('./commands');
	for (const folder of commandFolders) {
		const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`./commands/${folder}/${file}`);
			commands.push(command.data.toJSON());
			if(file.userPermissions) file.defaultPermissions = false;
			commandList.set(command.data.name, command)
		}
	}

	const rest = new REST({ version: '9' }).setToken(token);
	const clientId = '923613775465156658';
	const guildId = "943868676514402364"; // 904851446997057536 <- upstairs discord 943868676514402364 <- testing discord (stomething server)

	if (updateCommands) {
		(async () => {
			try {
				console.log('Started refreshing application (/) commands.');

				await rest.put(
					Routes.applicationCommands(clientId),
					{ body: commands },
				);

				await rest.put(
					Routes.applicationGuildCommands(clientId, guildId),
					{ body: commands },
				);

				console.log('Successfully reloaded application (/) commands.');
			} catch (error) {
				console.error(error);
			}
		})();
	}

}
module.exports.commands = commandList;