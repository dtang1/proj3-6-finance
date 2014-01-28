Meteor.publish("userData", function() {
	return Meteor.users.find({
		_id: this.userId
	}, {
		fields: {
			'budgets': true,
			'transactions': true
		}
	});
});
