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

Template.cardExpenses.events({
    'click .income': function() {
	$('#modal-container').css('display','block');
    },
    'click .expense': function() {
	$('#modal-container').css('display','block');
    }
});

Template.modalOverlay.events({
    'click': function() {
        $('#modal-container').css('display','none');
    }
});
