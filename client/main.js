Meteor.subscribe('userData');

Handlebars.registerHelper('ifNegative', function(o, options) {
	if (o < 0) {
		return options.fn(this);
	}
	return options.inverse(this);
});
