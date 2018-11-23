var User = require('models/user').User;
const sort_by = require('../middleware/sort');
exports.get = function (req, res) {
    var perPage = 5;
    var page = req.query.page || 1;
    if (req.user.username == 'Alex22') {
        req.user.admin = true;
    }

        User
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function (err, users) {
                User.count().exec(function (err, count) {
                    if (err) return next(err);
                    res.render('userslist', {
                        users,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        perPage
                    })
                })
            })
}
exports.post = function (req, res) {
    var perPage = 5;
    var page = req.query.page || 1;
    if (req.user.username == 'Alex22') {
        req.user.admin = true;
    }

    User
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, users) {
            User.count().exec(function (err, count) {
                if (err) return next(err);
                users.sort(sort_by('username', false, function(a){return a.toUpperCase()}));
                console.log(users);
                res.render('userslist', {
                    users,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    perPage
                })
            })
        })
}