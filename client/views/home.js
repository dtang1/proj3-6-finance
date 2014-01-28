var getCategories = function() {
	return Meteor.user() ? Meteor.user().categories : [];
};

var updateUser = function(data) {
	Meteor.users.update({_id: Meteor.userId()}, data);
};

var addCategory = function(cat) {
	var category = {name: cat};
	updateUser({$addToSet: {categories: category}});
};

// LOGOUT
Template.home.events({
	"click #logout": function(e, tmpl) {
		Meteor.logout(function(err) {
			if (err) {
				console.log(err);
			} else {
				Router.go('login');
			}
		});
	}
});

//***** TRANSACTIONS ******
Template.modalTransactions.helpers({
	type: function() {
		if (Session.get('transaction')) {
			return Session.get('transaction');
		}
	}
});

Template.modalOverlay.events({
	'click': function() {
		$('.modal-wrapper').css('display', 'none');
	}
});

Template.cardTransactions.helpers({
	'transactions': function() {
		return Meteor.user() ? Meteor.user().transactions : [];
	}
});

Template.cardTransactions.events({
	'click .income': function() {
		console.log("income");
		//Session.set('transaction', 'income');
		$('#modal-transactions').css('display', '');
	},
	'click .expense': function() {
		console.log("expenses");
		//Session.set('transaction', 'expense');
		$('#modal-transactions').css('display', '');
	}
});

Template.modalTransactions.events({
	'click .button': function() {
		var $modal = $('#modal-transactions');

		var date = new Date($modal.find('input[name=yy]').val(), $modal.find('input[name=mm]').val(), $modal.find('input[name=dd]').val())
			,desc = $modal.find('#desc').val()
			,amount = $modal.find('#value').val();
		if (Session.get('transaction') == 'expense') {
			amount = -amount;
		}
		var cat = $modal.find('#category').val();
		addCategory(name);

		var transaction = {
			desc: desc,
			amount: amount,
			category: cat,
			date: date
		};
		updateUser({$push: {transactions: transaction}});
		$('.modal-wrapper').css('display', 'none');
	}
});

//****** BUDGET ******
Template.cardBudget.helpers({
	budgets: function() {
		return Meteor.user() ? Meteor.user().budgets : [];
	}
});

Template.cardBudget.events({
	'click #addBudget': function() {
		$('#modal-budgets').css('display', '');
	}
});

Template.modalBudgets.helpers({
	categories: getCategories
});

Template.modalBudgets.events({
	'click .button': function() {
		var $modal = $('#modal-budgets');
		var name = $modal.find('#category').val();
		addCategory(name);
		var limit = $modal.find('#limit').val();
		var transactions = Meteor.user().transactions;
		var spent = 0;
		for (var transaction in transactions) {
			if (transaction.category === name) {
				spent += (-transaction.amount);
			}
		}
		var percent = Math.round((spent / limit) * 1000) / 10;
		var budget = {
			'name': name,
			'spent': spent,
			'limit': limit,
			'percent': percent
		};
		updateUser({$push: {budgets: budget}});
		$('.modal-wrapper').css('display', 'none');
	}
});
