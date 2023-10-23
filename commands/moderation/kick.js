const { PermissionsBitField } = require("discord.js")

module.exports = {
    name: 'kick',
    description: 'Kick someone off the server',
    execute(client, message, args) {
      if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
        return message.reply("> You don't have the permission to kick members.");
      }
  
      const user = message.mentions.users.first();
      if (!user) {
        return message.reply('> Please mention the user you want to kick.');
      }
  
      const member = message.guild.members.cache.get(user.id);
      if (!member) {
        return message.reply('> The mentioned user is not a member of this server.');
      }
  
      const reason = args.slice(1).join(' ') || 'No reason given';
  
      if (user.bot) {
        return message.reply('> You cannot kick a bot user.');
      }
      
      if (!user.bot && user.dmChannel) {
        user.send(`> You have been kicked from the server **${message.guild.name}** for "${reason}" by ${message.author}.`)
          .catch(console.error);
      }
      
      member.kick(reason)
        .then(() => {
          message.reply(`> ${user.tag} has been kicked from the server for "${reason}" by ${message.author}`);
        })
        .catch(error => {
          console.error(error);
          message.reply('> There was an error kicking the user.');
        });
      
    },
  };
  