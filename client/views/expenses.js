Template.expenseCards.foodTransacs = function() {
	return Transactions.find({
		userId: Meteor.userId(),
		category: 'Food'
	}, {
		sort: {
			date: -1
		}
	}).fetch();
}

Template.expenseCards.clothesTransacs = function() {
	return Transactions.find({
		userId: Meteor.userId(),
		category: 'Clothing'
	}, {
		sort: {
			date: -1
		}
	}).fetch();
}

Template.expenseCards.enterTransacs = function() {
	return Transactions.find({
		userId: Meteor.userId(),
		category: 'Entertainment'
	}, {
		sort: {
			date: -1
		}
	}).fetch();
}

Template.expenseCards.otherTransacs = function() {
	return Transactions.find({
		userId: Meteor.userId(),
		category: 'Other'
	}, {
		sort: {
			date: -1
		}
	}).fetch();
}
