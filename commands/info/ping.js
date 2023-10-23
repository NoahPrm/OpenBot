module.exports = {
	name: 'ping',
	description: 'Check bot\'s ping.',
	
	execute(client, message, args) {

		message.reply(`> Pong! **${client.ws.ping} ms**`)

	},
  };