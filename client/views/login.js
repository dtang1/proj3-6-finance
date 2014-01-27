Template.login.events({
	'click #google-login': function() {
		Meteor.loginWithGoogle(function(e, r) {
			if (e)
				alert(e);
			else
				Router.go("/app");
		});
	},
	'click #fb-login': function() {
		Meteor.loginWithFacebook(function(e, r) {
			if (e)
				alert(e);
			else
				Router.go("/app");
		});
	}
});
