Template.login.events({
    'click #google-login': function() {
        Meteor.loginWithGoogle(function (){
           Router.go("/app");    
        });
    }
});
