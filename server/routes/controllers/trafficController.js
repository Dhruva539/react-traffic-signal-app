const eventEmitter= require('../../eventEmitter');
const cache= require('../../cache')
const {storeDelay}= require('../../common');

module.exports = function trafficController(router,app) {

  router.get('/events',(req,res) => {
    console.log("Inside the items route");
    
    function delayHandler(data) {
      let delayTime=storeDelay(data);
      console.log("Inside the updated Delay",delayTime);
      const obj ={
        delay:delayTime
      }
      if(delayTime) {
        res.write('\n');
        res.write('id: 1\n');
        res.write(`data:${JSON.stringify(obj)}`)   
        res.write("\n\n");
    }
  }
    res.writeHead(200,{
      "Connection":"Keep-alive",
      "Content-type":"text/event-stream",
      "Cache-control":"no-cache",
      "Access-Control-Allow-Origin":"*"
    });
  
    cache.set('trafficDelayTime',4000);

    setTimeout(()=>{
          res.write('\n');
        res.write('id: 1 \n');
        res.write(`data: ${JSON.stringify({delay:4000})}`)
        res.write("\n\n");
    },3000);
          
      eventEmitter.on('message',delayHandler,false);
      req.on('close',() =>{
        //  clearInterval(interval);
    // /    eventEmitter.removeListener(delayHandler);
      })
  })

  router.post('/updateDelay',(req,res) =>{
        console.log("Inside the updateDelay method")
        let data= req.body;
        if(!isNaN(data.delay)) {
          console.log("listner count",eventEmitter.listenerCount());
          eventEmitter.emit('message',data.delay);
        res.status(200).send("updated successfully");
        } else {
          res.status(400).send("Invalid Data");
        }
  })
}