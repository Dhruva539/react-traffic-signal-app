'use strict';

let configEnv= process.env.npconfig ||'dev';
const config= require(`./config-${configEnv.trim()}.json`);
module.exports=config;