const eventEmitter= require('../../eventEmitter');
const cache= require('../../cache')
const {storeDelay}= require('../../common');
module.exports = function trafficController(router) {

  router.get('/events',(req,res) => {
    console.log("Inside the items route");
    res.writeHead(200,{
      Connection:"Keep-alive",
      "Content-type":"text/event-stream",
      "Cache-control":"no-cache",
      "Access-Control-Allow-Origin":"*"
    });
    
    // set default delay
      cache.set('trafficDelayTime',3000);
      res.write('{"delay":"3000"}')
      eventEmitter.on('updatedelay',(data) => {
      
          console.log("inside the set timeout",data)
          console.log("listner is called");
          let delayTime=storeDelay(data);
          if(delayTime) {
          setTimeout( () => {
            res.write(`{"delay":${delayTime}}`)
            res.write("\n\n");
          }
        ,3000)
          }
        })
  })

  router.post('/updateDelay',(req,res) =>{
        console.log("Inside the updateDelay method")
        let data= req.body;
        if(!isNaN(data.delay)) {
          console.log("listner count",eventEmitter.listenerCount());
          eventEmitter.emit('updatedelay',data.delay);
        res.status(200).send("updated successfully");
        } else {
          res.status(400).send("Invalid Data");
        }
  })
}