var mongoose = require('mongoose');

var User = require('models/user').User;
var async = require('async');

mongoose.connect("mongodb://localhost:27017/usersdb");
console.log('here1');
async.series([
    open,
    dropDatabase,
    createUsers

], function (err, results) {
    console.log('err', err);
    mongoose.disconnect();
    /*console.log('results', results);*/
});

function open(callback) {

    return mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {

    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function createUsers(callback) {

    async.parallel([
        function (callback) {
            var ivan = new User({username: 'Iva1', password: 's2udo'});
            ivan.save(function (err) {
                callback(err, ivan);
            });
        },
        function (callback) {
            var Nik = new User({username: 'Ni1', password: 'ns2udo'});
            Nik.save(function (err) {
                callback(err, Nik);
            });
        }
    ], callback);
}
