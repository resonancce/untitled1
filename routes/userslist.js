var User = require('models/user').User;
exports.get = function (req, res) {
    /*
        User.findOneAndUpdate(
            {username:"Ale"}, // критерий выборки
            { admin: {admin: false}}, // параметр обновления
            function(err, user){

                console.log(user);
            }
        );*/

    User
        .find({})
        .exec(function (err, users) {
            res.render('userslist', {
                users,

            })
        })
}

