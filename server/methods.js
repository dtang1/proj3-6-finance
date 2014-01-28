Meteor.methods({
    addTransaction: function(c){
        c.user = this.userId;
        Transactions.insert(c);
    },
    clear: function(c) {
        Transactions.remove({});
    }
});
