const http= require('http');
const port = '3100';
const app = require('./server');
/**
 *  Create HTTP server
 */
const server = http.createServer(app);
server.listen(port,()=>console.log(`Listening on port Nunber  ${port}`));
server.on('listening',onListening);

/**
 *  Event listener for HTTP server 'Error' Event
 */
function onError(error) {
  console.log("inside http:on server")
  if(error.syscall!=='listen') {
    throw error;
  }
}

/**
 *  Event Listener for http server "listening" event
 */
function onListening(){
  console.log("inside http:on listening");
  const addr= server.address();
  const bind = typeof addr === 'string'? 'pipe' + addr:'port'+ addr.port;

}
