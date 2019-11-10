### This project is created using create-react-app structure##############
About this project :-
---------------------

TRaffic signal System: red,yellow,green lights will be toggled based on time interval in app.js. If we want to change time imterval of signal system , please use below POST request to upate the time interval
POST:http://<Host-name>:3100/api/traffic/updateDelay
Body: {
	"delay":15000   // Mention time delay
   }
 
 if the post request is success, newly update timeInterval sent to client through eventStream connection beteen client and server using HTTP protocol.
 
 Event Stream Connection URL: http://<host-name>:3100/api/traffic/events

Command to run project :- 

npm run dev ( For development Environments)
