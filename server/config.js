var config = Accounts.loginServiceConfiguration;

config.remove({});

config.insert({
	service: 'google',
	clientId: '749382359180-74ui89rp3lhko3qr3pgp00d7vf8dk9j0.apps.googleusercontent.com',
	secret: 'SUNW4EFXqKSYynPoO00y75jQ'
});
config.insert({
	service: 'facebook',
	appId: '701125876588992',
	secret: 'f6616315379c9151de113a61cb330215'
});
config.insert({
	service: 'github',
	clientId: '5f40590c7972a395108f',
   	secret: '936e6c8cb3590f457f4262801c428a952ad1a666'
});

Accounts.onCreateUser(function(options, user) {
	if (user.services) {
		if (options.profile) {
			user.profile = options.profile;
		}
		var service = _.keys(user.services)[0];

		var email = getEmail(user, service);
		var existingUser = Meteor.users.findOne({'username': email});

		if (!existingUser) {
			// set email as username
			user.username = email;

			// DELETE
			user.profile.budget = {
				food: 1000,
				clothing: 1000,
				entertainment: 1000,
				other: 1000
			};
			Meteor.users.insert({userID:Meteor.userId(),income:0,food:0,clothing:0,entertainment:0,other:0});
			return user;
		}

		// copy across new service info
		existingUser.services[service] = user.services[service];
		existingUser.services.resume.loginTokens = user.services.resume.loginTokens;

		// record is re-inserted
		return existingUser;
	}
});
