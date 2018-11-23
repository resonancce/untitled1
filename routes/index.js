const router = require('express').Router();
const profileCtrl = require('./profile');
const loadUser = require('../middleware/loadUser')

/* GET home page. */


router.get('/', loadUser, require('./mainpage').get);
router.get('/login', require('./login').get);
router.post('/login', require('./login').post);
router.get('/logout', require('./logout').get);
router.get('/userslist/', loadUser, require('./userslist').get);
router.get('/profile', loadUser, require('./profile').get);
router.put('/profile', loadUser, profileCtrl.multerMiddleware ,profileCtrl.put);
router.post('/userslist/', loadUser, require('./userslist').post);
module.exports = router;


