const { signup, signin } = require('../Controllers/AuthControllers');
const { checkUser } = require('../Middlewares/AuthMiddleware');

const router = require('express').Router();

router.post("/", checkUser);

router.post('/signup', signup);
router.post('/signin', signin);


module.exports = router;