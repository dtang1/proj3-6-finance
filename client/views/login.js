var login = function(e) {
	if (!e) {
		Router.go('home');
	} else if (e instanceof Accounts.ConfigError) {
		console.log(e);
	} else if (e instanceof Accounts.LoginCancelledError) {
		console.log(e);
	} else {
		console.log(e);
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
		Meteor.loginWithGithub({
			requestPermissions: ['user']
		}, login);
	}
});
