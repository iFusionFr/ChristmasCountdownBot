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

const Christmas = require('../../modules/christmas');

class DaysCommand extends Command {
	constructor() {
		super('days', {
			aliases: ['days', 'total-days', 'days-left'],
			description: {
				content: 'Show days left until Christmas, in the user\'s or server\'s timezone.',
				premium: false
			},
			clientPermissions: ['EMBED_LINKS', 'SEND_MESSAGES'],
		});
	}

	async exec(message) {

		let uSettings = await message.author.settings(),
			gSettings = await message.guild?.settings();
		
		i18n.setLocale(uSettings?.locale || gSettings?.locale || 'en-GB');

		let xmas = new Christmas(uSettings?.timezone || gSettings?.timezone),
			days = xmas.days;

		let text = i18n.__n('There is **%d** day left until Christmas!', 'There are **%d** days left until Christmas!', days),
			footer = i18n.__('View the live countdown at [%s](%s).', this.client.config.website.pretty, this.client.config.website.url);

		let embed = new Embed(uSettings, gSettings)
			.setAuthor(message.author.username, message.author.displayAvatarURL())
			.setURL(this.client.config.website.url + '/total#days')
			.setDescription(text + '\n\n' + footer)
			.setTimestamp();

		if (xmas.isToday)
			embed
				.setTitle(i18n.__('It\'s Christmas Day! :tada:'))
				.setDescription(text + `\n\n${i18n.__('Merry Christmas!')}` + `\n\n${footer}`);
		else if (xmas.isTomorrow)
			embed
				.setTitle(i18n.__('It\'s Christmas Eve!'));		
		else
			embed
				.setTitle(i18n.__n('%d day left', '%d days left', days));

		// ❯ return a promise
		return message.util.send(embed);

	}
}

module.exports = DaysCommand;