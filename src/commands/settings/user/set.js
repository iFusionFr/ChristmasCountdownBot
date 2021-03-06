/**
 * @name christmascountdownbot
 * @author eartharoid <contact@eartharoid.me>
 * @copyright 2020 Isaac Saunders (eartharoid)
 * @license GPL-3.0
 */

const {
	// Argument,
	Command,
} = require('discord-akairo');

const { Embed, i18n: i18nOptions } = require('../../../bot');

const { I18n } = require('i18n');
const i18n = new I18n(i18nOptions);

class UserSetSettingsCommand extends Command {
	constructor() {
		super('user-set', {
			aliases: ['user-set'],
			category: 'hidden',
			description: {
				content: 'Set user settings',
				usage: '[settings]',
				examples: [
					'set timezone: America/New_York'
				]
			},
			clientPermissions: ['EMBED_LINKS', 'SEND_MESSAGES'],
			args: [
				{
					id: 'locale',
					match: 'option',
					flag: 'locale:',
					type: 'locale', // custom
				// type: 'lowercase'
				},
				{
					id: 'timezone',
					match: 'option',
					flag: 'timezone:',
					type: 'timezone', // custom
				// type: 'lowercase'
				},
			],
		});
	}


	async exec(message, args) {
		let uSettings = await message.author.settings(),
			gSettings = await message.guild?.settings();
		
		i18n.setLocale(uSettings?.locale || gSettings?.locale || 'en-GB');

		if (!uSettings)
			uSettings = await this.client.db.User.create(require('../../../models/user').defaults(message.author));

		let invalid = [],
			counter = 0;

		for (let arg in args) {
			if (!args[arg]) {
				if (message.content.includes(arg + ':'))
					invalid.push([arg, this.client.config.options[arg]?.error || 'Invalid input (see docs)']);
				continue;
			}

			uSettings.set(arg, args[arg]);

			counter++;
		}

		uSettings.save(); // update database

		if (invalid.length > 0) {
			let docs = this.client.config.docs.settings;
			let list = '';

			for (let i in invalid)
				list += `❯ [\`${invalid[i][0]}\`](${docs}/user#${invalid[i][0]}) » ${i18n.__(invalid[i][1])}\n`;

			return message.util.send(
				new Embed()
					.setTitle(':x: User settings')
					.setDescription(i18n.__('There were some issues with the provided options:\n%s\n**Click on the blue setting name to see the documentation.**',
						list
					))
			);
		}

		const capitalise = (str) => str.charAt(0).toUpperCase() + str.slice(1);
		// const capitalise = (str) => str.replace(/^\w/, first => first.toUpperCase());

		let embed = new Embed();

		if (counter === 0)
			embed
				.setTitle(i18n.__('User settings'))
				.setDescription(i18n.__('Nothing changed.'));
		else
			embed
				.setTitle(i18n.__(':white_check_mark: User settings updated'));
		
		for (let arg in args)
			embed.addField(i18n.__(capitalise(arg)), uSettings.get(arg) !== null ? `\`${uSettings.get(arg)}\`` : i18n.__('none'), true);

		return message.util.send(embed);

	}
}

module.exports = UserSetSettingsCommand;