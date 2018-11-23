var User = require('models/user').User;

module.exports = function (req, res, next) {

    req.user = res.locals.user = null;


    User.findById(req.session.user, function (err, user) {
        if (err) return next(err);
        if (!user) return res.render('login')

        req.user = res.locals.user = user.toJSON();
        next();

    });
};