var login = function(e) {
	if (e) alert(e);
	else Router.go('/app');
};

Template.login.events({
	'click #google-login': function(e, tmpl) {
		Meteor.loginWithGoogle(login);
	},
	'click #fb-login': function(e, tmpl) {
		Meteor.loginWithFacebook(login);
	},
	'click #github-login': function(e, tmpl) {
		Meteor.loginWithGithub(login);
	}
});

/*
Template.home.events({
	'click #logout': function(e, tmpl) {
		Meteor.logout(function(e) {
			if (e) alert(e);
			else Router.go('/');
		})
	}
});
*/
