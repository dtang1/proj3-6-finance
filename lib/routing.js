Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound'
});

Router.map(function() {
	this.route('home', {
		path: '/app'
	});
	this.route('login', {
		path: '/',
		before: function() {
			if (Meteor.loggingIn() || Meteor.user()) {
				console.log("redirect");
				this.redirect('home');
				this.stop();
			}
		},
		action: function() {
			if (!Meteor.user()) {
				this.render();
			}
		},
		after: function() {
			$("html").css('height', '100%');
		}
	});
});
