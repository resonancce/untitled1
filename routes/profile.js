var User = require('models/user').User;
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: 'public/images/',
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});
exports.multerMiddleware = multer({
    storage,
    limits: {fileSize: 1000000}
    /*fileFilter: function (req, file, cb) {
        checkFileType(file, cb);

    }*/
}).single('myImage');

exports.get = function (req, res) {
    User.findById(req.session.user, function (err, user) {
        if (err) return next(err);
        res.render('profile', {
            user
        })
    });
}


exports.put = function (req, res) {
    var number = req.body.number;
    var name = req.body.name;
    var email = req.body.email;
    if (req.file != undefined) {
        var avatar = req.file.path.split("public")[1];
    }
    User.findById(req.session.user, function (err, user) {
        if (err) return next(err);

        User.findOneAndUpdate({username: user.username},               // критерий выборки
            {$set: {number: number, name: name, email: email, avatar: avatar}},     // параметр обновления
            {returnOriginal: false},
            function () {

                console.log(req.file);
                console.log(user);
                    res.render('profile', {
                        user
                    })
            }
        );

    });
}


/*
exports.post = function (req, res) {
    User.findById(req.session.user, function (err, user) {
        var user = new User ({username: username, password: password});

        user.save(function (err) {

            if (err) return next(err);
            callback(null, user);
        });
    }
        if (err) return next(err);
        res.render('profile', {
            user: user
        })

    })
}
*/