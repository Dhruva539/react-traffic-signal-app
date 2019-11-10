const trafficRouter= require('./router/trafficRouter');
  
module.exports = {
  init : function(app) {    
    app.use('/api/traffic',trafficRouter);
  }
};