const cache=require('./cache');
exports.storeDelay=(delay) =>{
  let value=cache.get('trafficDelayTime');
  console.log("Inside the storeDelay function",value,delay)
  if(value && value !==delay) {
      cache.set('trafficDelayTime',delay);
      return delay;
  }
  return null;
}