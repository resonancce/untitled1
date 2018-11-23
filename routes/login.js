var User = require('models/user').User;


exports.get = function (req, res) {
    // req.session.user = {};/
    res.render('login', {user: null});

}
exports.post = function (req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    User.authorize(username, password, function (err, user) {
        if (err) {
            return next(err);
        } else if (user.username == 'Alex22') {
            user.admin = true;
        }
        else
            console.log(user);
        req.session.user = user._id;
        res.send();
    })

};
