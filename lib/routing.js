Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound'
});

Router.map(function() {
	this.route('home', {
		path: '/app',
		before: function() {
                    /*
			if (!Meteor.user() && !Meteor.loggingIn()) {
				this.redirect('login');
			}
                        */
		}
	});
	this.route('login', {
		path: '/',
		before: function() {
			if (Meteor.loggingIn() || Meteor.user()) {
				this.redirect('home');
			}
		},
		after: function() {
			$("html").css('height', '100%');
		}
	});
        this.route('expenses', {
            path: '/expense'
        });
});
