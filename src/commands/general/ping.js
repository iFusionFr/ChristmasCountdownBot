/**
 * @name christmascountdownbot
 * @author eartharoid <contact@eartharoid.me>
 * @copyright 2020 Isaac Saunders (eartharoid)
 * @license GPL-3.0
 */

const { Command } = require('discord-akairo');
const { Embed, i18n: i18nOptions } = require('../../bot');

const { I18n } = require('i18n');
const i18n = new I18n(i18nOptions);

class PingCommand extends Command {
	constructor() {
		super('ping', {
			aliases: ['ping'],
			description: {
				content: 'Show bot ping and shard info.',
			},
			clientPermissions: ['EMBED_LINKS', 'SEND_MESSAGES'],
		});
	}

	async exec(message) {
		const { client } = message;
		let uSettings = await message.author.settings(),
			gSettings = await message.guild?.settings();
		
		i18n.setLocale(uSettings?.locale || gSettings?.locale || 'en-GB');

		let embed = new Embed()
			.setTitle(i18n.__('Pong!'))
			.addField(i18n.__('Shard number'), client.shard.ids, false)
			.addField(i18n.__('Avg. ping'), client.ws.ping + 'ms', true)
			.addField(i18n.__('Shard ping'), client.ws.shards.get(client.shard.ids[0]).ping + 'ms', true)
		let m = await message.util.send(embed);

		// ❯ return a promise
		return message.util.edit(embed.addField(i18n.__('Overall latency'), m.createdTimestamp - message.createdTimestamp  + 'ms', true));
		// m.edit
	}
}

module.exports = PingCommand;