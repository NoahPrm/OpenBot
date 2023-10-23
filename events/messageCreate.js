const { PermissionsBitField } = require('discord.js');
const client = require('..');

client.on('prefixUpdate', newPrefix => {
  client.prefix = newPrefix;
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(client.prefix)) return;

  const args = message.content.slice(client.prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {
    try {
      command.execute(client, message, args);
    } catch (error) {
      console.error(error);
      message.reply('> An error occurred while executing this command. Please contact the developers of OpenBot.');
    }
  }
});