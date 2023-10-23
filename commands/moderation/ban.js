const { PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban someone from the server',
  execute(client, message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return message.reply("You don't have the permission to ban members.");
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Please mention the user you want to ban.');
    }

    const member = message.guild.members.cache.get(user.id);
    if (!member) {
      return message.reply('The mentioned user is not a member of this server.');
    }

    const reason = args.slice(1).join(' ') || 'No reason given';

    if (user.bot) {
      return message.reply('You cannot ban a bot user.');
    }

    if (!user.bot && user.dmChannel) {
      user.send(`> You have been banned from the server **${message.guild.name}** for "${reason}" by ${message.author}.`)
        .catch(console.error);
    }

    member.ban({ reason: reason })
      .then(() => {
        message.reply(`> ${user.tag} has been banned from the server for "${reason}" by ${message.author}`);
      })
      .catch(error => {
        console.error(error);
        message.reply('> There was an error banning the user.');
      });
  },
};