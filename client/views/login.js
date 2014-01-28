var login = function(e) {
	if (!e) {
		Router.go('home');
	} else if (e instanceof Accounts.ConfigError) {
		alert(e);
	} else if (e instanceof Accounts.LoginCancelledError) {
		// do nothing
	} else {
		alert(e);
	}
};

Template.login.events({
	'click #google-login': function(e, tmpl) {
		Meteor.loginWithGoogle({
			requestOfflineToken: true
		}, login);
	},
	'click #fb-login': function(e, tmpl) {
		Meteor.loginWithFacebook(login);
	},
	'click #github-login': function(e, tmpl) {
		Meteor.loginWithGithub(login);
	}
});
