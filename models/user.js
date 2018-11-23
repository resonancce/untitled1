
var crypto = require('crypto');
var async = require('node_modules/async');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        default: ' '
    },
    number: {
        type: String,
        default: ' '
    },
    email: {
        type: String,
        default: ' '
    },
    avatar: {
        type: String,
        default: ' '
    },
    admin: {
        type: Boolean,
        default: false
    }
});

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}

schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
     .get(function () {return this._plainPassword;});

schema.methods.checkPassword = function (password){
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function(username, password, callback){
    var User = this;
    async.waterfall([
        function (callback) {
            User.findOne({username:username}, callback);
        },
        function (user, callback) {
            if (user) {

                if (user.checkPassword(password)){
                    callback(null, user);
                }}
                else {
                    var user = new User ({username: username, password: password});

                    user.save(function (err) {

                        if (err) return next(err);
                        callback(null, user);
                    });
                }

        }

    ], callback);

}


exports.User = mongoose.model('User', schema);

