const fs = require('fs');
const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'setprefix',
  description: "Change the bot's prefix",
  execute(client, message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply('> You must have administrator permissions to change the prefix.');
    }

    const newPrefix = args[0];
    if (!newPrefix) {
      return message.reply('> Please provide a new prefix.');
    }

    fs.readFile('config.json', 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading the configuration file:', err);
        return message.reply('> An error occurred while reading the configuration file.');
      }

      const config = JSON.parse(data);

      config.prefix = newPrefix;

      fs.writeFile('config.json', JSON.stringify(config, null, 2), 'utf-8', (err) => {
        if (err) {
          console.error('Error writing the configuration file:', err);
          return message.reply('> An error occurred while writing the configuration file.');
        }

        client.prefix = newPrefix;

        message.reply(`> Bot's server prefix has been changed to: \`${newPrefix}\``);

        client.emit('prefixUpdate', newPrefix);
      });
    });
  },
};