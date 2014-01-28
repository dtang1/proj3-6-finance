Template.home.helpers({
	transactions: function() {
		return Transactions.find();
	}
});

Template.home.events({
    
    "click #logout": function(e,tmpl){
        Meteor.logout(function(err){
            if(err){
                //show error message
            }
            else{
                //show logged out
            }
        });
        
    }
});

Template.cardExpenses.rendered = function() {
    $('.button').click(function() {
	$('#modal-container').css('display','block');
        Session.set('transaction',$(this).attr('class').split(/\s+/)[2]);
    });
}

Template.cardExpenses.transacs = function() {
    return Transactions.find({userId: Meteor.userId()},{sort: {date: -1}}).fetch();
}

Template.transRow.date = function() {
    return this.date.getMonth()+1 + "/" + this.date.getDate() + "/" + (this.date.getYear()+1900)
}

Template.transRow.expenseBool = function() {
    return this.type == 'expense';
}


Template.modalOverlay.events({
    'click': function() {
        $('#modal-container').css('display','none');
        Session.set('transaction',null);
    }
});

Template.modalTransac.type = function() {
    if(Session.get('transaction'))
        return Session.get('transaction');
}

Template.modalTransac.expenseBool = function() {
    if(Session.get('transaction'))
        return Session.get('transaction') == 'expense';
}


Template.modalTransac.events({
    'click .button': function() {
	var date = new Date($('input[name=yy]').val(),$('input[name=mm]').val() - 1,$('input[name=dd]').val());
        var desc = $('#description').val();
        var val = $('#value').val();
        var cat = $('#category').val();
        var type = 'income';
        if(Session.get('transaction') == 'expense') {
            val = val * -1;
            type = 'expense';
        }
        Meteor.call('addTransaction', {
            date: date,
            description: desc,
            value: val,
            type: type,
            category: cat,
        }, function(e,r) {
            if(e)
                alert(e);
            else
                console.log('woohooo');
        }); 
        $('.modal-expense').children().val('');
        $('#modal-container').css('display','none');
    }
});


