/**
 * @name christmascountdownbot
 * @author eartharoid <contact@eartharoid.me>
 * @copyright 2020 Isaac Saunders (eartharoid)
 * @license MIT
 */

const spacetime = require('spacetime');

module.exports = class ChristmasCountdown {
	constructor(timezone) {
		this.timezone = timezone || 'UTC';

		this.now = spacetime.now(this.timezone);

		///////////////////////////////// FOR TESTING //
		// this.now = spacetime('December 24, 2020', this.timezone); //  FOR TESTING
		/////////////////////////////////			  //

		let year = this.now.year();

		if (this.now.month() === 11 && this.now.date() > 24) // months are 0 based, because why not?
			year++; // if it's already Christmas, set date to next Christmas

		this.christmas = spacetime(`December 25, ${year} 0:00:00`, this.timezone); // midnight on Christmas day

		// for (let i = 1; i <= 31; i++)
		// 	console.log(
		// 		'October',
		// 		i,
		// 		spacetime(`October ${i}, 2020 0:00:00`, this.timezone).diff(this.christmas, 'days')
		// 	);

		// for (let i = 1; i <= 30; i++)
		// 	console.log(
		// 		'November',
		// 		i,
		// 		spacetime(`November ${i}, 2020 0:00:00`, this.timezone).diff(this.christmas, 'days')
		// 	);

		// for (let i = 1; i <= 31; i++)
		// 	console.log(
		// 		'December',
		// 		i,
		// 		spacetime(`December ${i}, 2020 0:00:00`, this.timezone).diff(this.christmas, 'days')
		// 	);
	}

	get months() {
		return this.now.diff(this.christmas, 'months');
	}

	get weeks() {
		return this.now.diff(this.christmas, 'weeks');
	}

	get days() {
		return this.now.diff(this.christmas, 'days');
	}

	get sleeps() {
		return this.days + 1;
	}

	get hours() {
		return this.now.diff(this.christmas, 'hours');
	}

	get minutes() {
		return this.now.diff(this.christmas, 'minutes');
	}

	get seconds() {
		return this.now.diff(this.christmas, 'seconds');
	}

	get total() {
		let n = this.now.diff(this.christmas, 'seconds');
		let days = n / (24 * 3600) ;

		n = n % (24 * 3600);
		let hours = n / 3600;

		n %= 3600;
		let minutes = n / 60;

		n %= 60;
		let seconds = n;

		let live = {
			months_based: this.christmas.since(this.now).diff,
			days_based: { days, hours, minutes, seconds },
		};

		return live;
	}

	get isToday() {
		// a new spacetime is used rather than this.christmas as we want THIS Christmas for certain, not next Christmas
		return this.now.isSame(spacetime(`December 25, ${this.now.year()} 0:00:00`, this.timezone), 'date');
	}

	get isTomorrow() {
		return this.now.isSame(this.christmas.subtract(1, 'days'), 'date');
	}

};