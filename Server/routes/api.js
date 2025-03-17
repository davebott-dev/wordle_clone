const express = require('express');
const router = express.Router();
const controller =  require('../controller/apiController');

router.get('/get/result', controller.getResult);
router.post('/post/result/:result', controller.postResult);

module.exports = router;