Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound'
});

Router.map(function() {
	this.route('home', {
		path: '/app',
		fastRender: true
	});
	this.route('login', {
		path: '/',
		fastRender: true
	});
});
