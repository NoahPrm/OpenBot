const { EmbedBuilder } = require('discord.js');
const client = require('..');
const config = require('../config.json');

client.on('messageDelete', async deletedMessage => {
    if (deletedMessage.author.bot) return;

    const logsChannel = config.channels.logs;
    const language = config.language;

    if (!logsChannel || (language !== 'fr' && language !== 'FR' && language !== 'en' && language !== 'EN')) {
        return;
    }

    const logEmbed = new EmbedBuilder()
        .setAuthor({ name: deletedMessage.author.username, iconURL: deletedMessage.author.displayAvatarURL() })
        .setFooter({ text: deletedMessage.guild.name })
        .setTimestamp();

    if (language.toLowerCase() === 'fr') {
        logEmbed.setTitle('**Un nouveau message a été supprimé sur le serveur.**');
        logEmbed.addFields(
            { name: 'Auteur', value: `${deletedMessage.author.tag} (${deletedMessage.author.id})` },
            { name: 'Contenu', value: `${deletedMessage.content}` },
            { name: 'Salon', value: `${deletedMessage.channel}` }
        );
    } else {
        logEmbed.setTitle('**A new message has been deleted in the server.**');
        logEmbed.addFields(
            { name: `Author`, value: `${deletedMessage.author.tag} (${deletedMessage.author.id})` },
            { name: `Content`, value: `${deletedMessage.content}` },
            { name: `Channel`, value: `${deletedMessage.channel}` }
        );
    }

    const logsChannelObject = deletedMessage.guild.channels.cache.get(logsChannel);
    if (logsChannelObject) {
        logsChannelObject.send({ embeds: [logEmbed] });
    }
});