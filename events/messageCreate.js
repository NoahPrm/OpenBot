const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const client = require('..');

const prefix = client.prefix;

client.on('messageCreate', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
  
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const cmd = args.shift().toLowerCase();
  
	if (cmd.length === 0) return;
  
	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));
  
	if (command) {
	  try {
		command.execute(client, message, args);
	  } catch (error) {
		console.error(error);
		message.reply('> An error as occured while executing this command. Please contact the developers of OpenBot.');
	  }
	}
  });
  