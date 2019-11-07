var NodeCache= require('node-cache');
var eventEmitter= require('./eventEmitter')
const myCache= new NodeCache();

module.exports=myCache;