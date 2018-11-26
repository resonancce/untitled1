const express = require('express');
const app = express();
const config = require('config');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = require('./routes/index');
const mongoose = require('mongoose');
const log = require('libs/log')(module);
/*const multer  = require('multer')
const storage = multer.diskStorage ({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null,file.fieldname + '-' + Date.now() +
        path.extname(file.originalname));

    }});
const upload = multer({
    storage: storage
}).single('my/Image');
*/

mongoose.connect("mongodb://localhost:27017/usersdb");
app.set('port', config.get('port'));
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: "asdasd",
    key: "sid",
    cookie: {
        "path": "/",
        "httpOnly": true
    },
    proxy: true,
    resave: true,
    saveUninitialized: true

}));
app.use(router);
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});



