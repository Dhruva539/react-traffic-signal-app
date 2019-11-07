const express= require('express');
var cors= require('cors');
const path=require('path');
const bodyParser= require('body-parser');
const routes=require('./routes');
const config= require('../config/config');
const app= express();
const runType= config.outputfolder;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'../'+runType),{index:'index.html'}));

/**
 *  Shopping Routes Mapping
 */

routes.init(app);
app.use('*',(req,res)=>{
  console.log("inside the * router");
  console.log(req.url);
res.sendFile(path.join(__dirname,'../' + runType + '/index.html'));
})

module.exports=app;