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
