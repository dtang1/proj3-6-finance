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

//****** LOGOUT ******
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
Session.setDefault('transaction', 'Income');

Template.cardTransactions.helpers({
	'transactions': function() {
		if (Meteor.user()) {
			var transactions = Meteor.user().transactions;
			transactions = _.map(transactions, function(transaction) {
				transaction.date = moment(transaction.date).format('MMM D, YYYY');
				return transaction;
			});
			return transactions;
		}
		return [];
	}
});

Template.modalTransactions.helpers({
	type: function() {
		return Session.get('transaction');
	}
});

Template.modalOverlay.events({
	'click': function() {
		$('.modal-wrapper').css('display', 'none').removeClass('income expense');
	}
});

Template.cardTransactions.events({
	'click .income': function() {
		Session.set('transaction', 'Income');
		$('#modal-transactions').addClass('income').css('display', '');
	},
	'click .expense': function() {
		Session.set('transaction', 'Expense');
		$('#modal-transactions').addClass('expense').css('display', '');
	}
});

Template.modalTransactions.events({
	'click .button': function() {
		var $modal = $('#modal-transactions');

		var desc = $modal.find('#desc').val()
			,amount = $modal.find('#value').val()
			,cat = $modal.find('#category').val()
			,date = new Date($modal.find('input[name=yy]').val(), $modal.find('input[name=mm]').val(), $modal.find('input[name=dd]').val())
			,isExpense = Session.equals('transaction', 'Expense');
		addCategory(name);

		var transaction = {
			desc: desc,
			amount: amount,
			category: cat,
			date: date,
			isExpense: isExpense
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

Template.home.rendered = function() {
};
Template.modalTransactions.rendered = function() {
	$('#modal-transactions').find('.datepicker').pickadate({
		format: 'mmmm d, yyyy'
	});
};

Template.modalBudgets.rendered = function() {
	$('#modal-budgets').find('.datepicker').pickadate({
		format: 'mmmm d, yyyy'
	});
};
