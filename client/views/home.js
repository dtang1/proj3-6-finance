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

Template.cardExpenses.rendered = function() {
	$('.button').click(function() {
		$('#modal-container').css('display', 'block');
		Session.set('transaction', $(this).attr('class').split(/\s+/)[2]);
	});
}

Template.cardExpenses.transacs = function() {
	return Transactions.find({
		userId: Meteor.userId()
	}, {
		sort: {
			date: -1
		}
	}).fetch();
}

Template.cardBudget.foodBudg = function() {
	//return Meteor.user.profile.budget.food;
	return "10000";
}
Template.cardBudget.clothesBudg = function() {
	//return Meteor.user.profile.budget.clothing;
	return "10000";
}
Template.cardBudget.enterBudg = function() {
	//return Meteor.user.profile.budget.entertainment;
	return "10000";
}
Template.cardBudget.otherBudg = function() {
	//return Meteor.user.profile.budget.other;
	return "10000";
}
Template.cardBudget.foodSpent = function() {
	var k = Transactions.find({
		userId: Meteor.userId,
		category: 'Food'
	}).fetch();
	var sum = 0;
	for (x in k)
		if (k[x])
			sum += k[x].value;
	return sum;
}
Template.cardBudget.clothesSpent = function() {
	var k = Transactions.find({
		userId: Meteor.userId,
		category: 'Clothing'
	}).fetch();
	var sum = 0;
	for (x in k)
		if (k[x])
			sum += k[x].value;
	return sum;
}
Template.cardBudget.enterSpent = function() {
	var k = Transactions.find({
		userId: Meteor.userId,
		category: 'Entertainment'
	}).fetch();
	var sum = 0;
	for (x in k)
		if (k[x])
			sum += k[x].value;
	return sum;
}
Template.cardBudget.otherSpent = function() {
	var k = Transactions.find({
		userId: Meteor.userId,
		category: 'Other'
	}).fetch();
	var sum = 0;
	for (x in k)
		if (k[x])
			sum += k[x].value;
	return sum;
}

Template.cardBudget.foodPerc = function() {
	return Template.cardBudget.foodSpent / Template.cardBudget.foodBudg * 100;
}
Template.cardBudget.clothesPerc = function() {
	return Template.cardBudget.clothesSpent / Template.cardBudget.clothesBudg * 100;
}
Template.cardBudget.enterPerc = function() {
	return Template.cardBudget.enterSpent / Template.cardBudget.enterBudg * 100;
}
Template.cardBudget.otherPerc = function() {
	return Template.cardBudget.otherSpent / Template.cardBudget.enterBudg * 100;
}

Template.transRow.date = function() {
	return this.date.getMonth() + 1 + "/" + this.date.getDate() + "/" + (this.date.getYear() + 1900)
}

Template.transRow.expenseBool = function() {
	return this.type == 'expense';
}


Template.modalOverlay.events({
	'click': function() {
		$('#modal-container').css('display', 'none');
		Session.set('transaction', null);
	}
});

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
		}, function(e, r) {
			if (e)
				alert(e);
			else
				console.log('woohooo');
		});
		$('.modal-expense').children().val('');
		$('#modal-container').css('display', 'none');
	}
});
