Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound'
});

Router.map(function() {
	this.route('home', {
		path: '/app',
		before: function() {
			if (!Meteor.user()) {
				this.redirect('login');
				this.stop();
			}
		}
	});
	this.route('login', {
		path: '/',
		before: function() {
			if (Meteor.loggingIn() || Meteor.user()) {
				this.redirect('home');
				this.stop();
			}
		},
		after: function() {
			$("html").css('height', '100%');
		}
	});
});
