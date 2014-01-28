Meteor.publish("userData", function() {
	return Meteor.users.find({
		_id: this.userId
	}, {
		fields: {
			'budgets': true,
			'transactions': true,
			'categories': true
		}
	});
});

Meteor.users.allow({
	update: function() {
		return true;
	},
	insert: function() {
		return true;
	}
})
