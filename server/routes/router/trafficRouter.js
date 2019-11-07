'use strict';
const express = require('express');
const router = express.Router();
const shoppingController= require('../controllers/trafficController');
shoppingController(router);
module.exports =router;