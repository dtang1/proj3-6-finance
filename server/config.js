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
			user.profile = options.profile
		}
		var service = _.keys(user.services)[0];
		var email = user.services[service].email;
		if (!email && user.emails) {
			email = user.emails.address;
		}
		if (!email) {
			email = options.email;
		}
		if (!email) {
			// if email is not set, there is no way to link it with other accounts
			return user;
		}

		// see if any existing user has this email address, otherwise create new
		var existingUser = Meteor.users.findOne({
			'emails.address': email
		});
		if (!existingUser) {
			// check for email also in other services
			var existingGitHubUser = Meteor.users.findOne({'services.github.email': email});
			var existingGoogleUser = Meteor.users.findOne({'services.google.email': email});
			var existingFacebookUser = Meteor.users.findOne({'services.facebook.email': email});
			var doesntExist = !existingGitHubUser && !existingGoogleUser && !existingFacebookUser;
			if (doesntExist) {
				// return the user as it came, because there he doesn't exist in the DB yet
				return user;
			} else {
				existingUser = existingGitHubUser || existingGoogleUser || existingFacebookUser;
				if (existingUser && user.emails) {
					existingUser.emails = user.emails;
				}
			}
		}

		// precaution, these will exist from accounts-password if used
		if (!existingUser.services) {
			existingUser.services = {resume: {loginTokens: []}};
		}

		// copy across new service info
		existingUser.services[service] = user.services[service];
		existingUser.services.resume.loginTokens.push(
			user.services.resume.loginTokens[0]
		);

		// even worse hackery
		Meteor.users.remove({
			_id: existingUser._id
		}); // remove existing record
		//hardcode this shit
		existingUser.profile.budget = {
			food: 1000,
			clothing: 1000,
			entertainment: 1000,
			other: 1000
		}
		return existingUser; // record is re-inserted
	}
});
