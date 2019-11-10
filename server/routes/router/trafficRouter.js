'use strict';
const express = require('express');
const router = express.Router();
const app= express();
const shoppingController= require('../controllers/trafficController');
shoppingController(router,app);
module.exports =router;