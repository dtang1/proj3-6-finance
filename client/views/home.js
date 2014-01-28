Template.home.helpers({
	transactions: function() {
		return Transactions.find();
	}
});

Template.home.events({
	"click #logout": function(e, tmpl) {
		Meteor.logout(function(err) {
			Meteor.logout(function(e) {
				if (e) alert(e);
				else Router.go('login');
			});
		});
	}
});
/*
Template.cardExpenses.rendered = function() {
	$('.button').click(function() {
		$('#modal-container').css('display', 'block');
		Session.set('transaction', $(this).attr('class').split(/\s+/)[2]);
	});
}*/
/*
Template.cardExpenses.transacs = function() {
	return Transactions.find({
		userId: Meteor.userId()
	}, {
		sort: {
			date: -1
		}
	}).fetch();
};*/

var getCategories = function() {
	return Meteor.user() ? Meteor.user().categories : [];
};

var addCategory = function(cat) {
	var category = {
		name: cat
	};
	Meteor.users.update({
		_id: Meteor.userId()
	}, {
		$addToSet: {categories: category}
	});
};

//***** TRANSACTIONS ******
Template.modalTransactions.helpers({
	type: function() {
		if (Session.get('transaction'))
			return Session.get('transaction');
	}
});

Template.modalOverlay.events({
	'click': function() {
		$('.modal-wrapper').css('display', 'none');
	}
});

Template.cardTransactions.helpers({
	'trans': function() {
		return Meteor.user() ? Meteor.user().transactions : [];
	}
});

// OTOD
Template.cardTransactions.events({
	'click .income': function() {
		Session.set('transaction', 'income');
		$('#modal-transactions').css('display', '');
	},
	'click .expense': function() {
		Session.set('transaction', 'expense');
		$('#modal-transactions').css('display', '');
	}
});

// TODO
Template.modalTransactions.events({
	'click .button': function() {
		var $modal = $('#modal-transactions');

		var date = new Date($modal.find('input[name=yy]').val(), $modal.find('input[name=mm]').val(), $modal.find('input[name=dd]').val());
		var desc = $modal.find('#desc').val();
		var val = $modal.find('#value').val();
		if (Session.get('transaction') == 'expense') {
			val = -val;
		}
		var cat = $modal.find('#category').val();
		addCategory(name);

		var transaction = {
			desc: desc,
			amount: val,
			category: cat,
			date: date
		};
		Meteor.users.update({
			_id: Meteor.userId()
		}, {
			$push: {transactions: transaction}
		});
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
		var percent = Math.round((spent/limit) * 1000) / 10;
		var budget = {
			'name': name,
			'spent': spent,
			'limit': limit,
			'percent': percent
		};
		Meteor.users.update({
			_id: Meteor.userId()
		}, {
			$push: {budgets: budget}
		});
		$('.modal-wrapper').css('display', 'none');
	}
});

/*
Template.transRow.date = function() {
	return this.date.getMonth() + 1 + "/" + this.date.getDate() + "/" + (this.date.getYear() + 1900)
}

Template.transRow.expenseBool = function() {
	return this.type == 'expense';
}


Template.modalTransac.type = function() {
	if (Session.get('transaction'))
		return Session.get('transaction');
}

Template.modalTransac.expenseBool = function() {
	if (Session.get('transaction'))
		return Session.get('transaction') == 'expense';
}

Template.modalTransac.events({
	'click .button': function() {
		var date = new Date($('input[name=yy]').val(), $('input[name=mm]').val() - 1, $('input[name=dd]').val());
		var desc = $('#description').val();
		var val = $('#value').val();
		var cat = $('#category').val();
		var type = 'income';
		if (Session.get('transaction') == 'expense') {
			val = val * -1;
			type = 'expense';
		}
		Meteor.call('addTransaction', {
			date: date,
			description: desc,
			value: val,
			type: type,
			category: cat,
			userID: Meteor.userID(),
		}, function(e, r) {
			if (e)
				alert(e);
			else
				console.log('woohooo');
		});
		$('.modal-expense').children().val('');
		$('.modal-wrapper').css('display', 'none');
	}
});*/
