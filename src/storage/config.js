/**
 * @name christmascountdownbot
 * @author eartharoid <contact@eartharoid.me>
 * @copyright 2020 Isaac Saunders (eartharoid)
 * @license GPL-3.0
 */

module.exports = {
	prefix: 'x!',
	colour: '#D5002C',
	footer: 'Christmas Countdown by eartharoid',
	website: {
		pretty: 'www.christmascountdown.live',
		url: 'https://www.christmascountdown.live/'
	},
	docs: {
		commands: 'https://docs.christmascountdown.live/discord/commands',
		locales: 'https://docs.christmascountdown.live/discord/locales',
		settings: 'https://docs.christmascountdown.live/discord/settings',
		timezones: 'https://docs.christmascountdown.live/discord/timezones',
	},
	support: 'https://go.eartharoid.me/discord',
	presence: {
		activities: ['the countdown to Christmas', 'in the snow', 'christmascountdown.live'],
		types: ['WATCHING', 'PLAYING', 'WATCHING']
	}, 
	cooldown: 5,
	respawn: true, // respawn dead shards?
	debug: false,
};
  