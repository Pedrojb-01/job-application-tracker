const express = require('express');
const router = express.Router();
const { create } = require('../controllers/applicationController');

router.post('/', create);

module.exports = router;