import moment from 'moment';

module.exports = {

	createdAtSetter: function (rawDate) {
		try {
			console.log('createdAtSetter rawDate=>', rawDate);
			return ModelService.simpleDate(rawDate);
		} catch (e) {
			sails.log.error(e);
			throw e;
		}
	},

	updatedAtSetter: function (rawDate) {
		try {
			return ModelService.simpleDate(rawDate);
		} catch (e) {
			sails.log.error(e);
			throw e;
		}
	},

	simpleDate: function (rawDate) {
		try {
			console.log('simpleDate rawDate=>', rawDate);
			return moment(rawDate).format("YYYY/MM/DD");
		} catch (e) {
			sails.log.error(e);
			throw e;
		}
	},

	simpleDateWithHours: function (rawDate) {
		try {
			return moment(rawDate).format("YYYY/MM/DD HH:mm:SS");
		} catch (e) {
			sails.log.error(e);
			throw e;
		}
	},
}
