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

var getEmail = function(user, service) {
	if (service == 'github') {
		var accessToken = user.services.github.accessToken;
		return HTTP.get("https://api.github.com/user/emails", {
			headers: {"User-Agent": userAgent},
			params: {access_token: accessToken}
		}).data[0];
	}
	return user.services[service].email;
};

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

			// add empty lists
			var models = ["budgets", "transactions", "categories"];
			for (var model in models) {
				if (!user[model]) {
					user[model] = [];
				}
			}
			return user;
		}

		// copy across new service info
		existingUser.services[service] = user.services[service];
		existingUser.services.resume.loginTokens = user.services.resume.loginTokens;

		Meteor.users.remove({_id: existingUser._id});
		// record is re-inserted
		return existingUser;
	}
});
