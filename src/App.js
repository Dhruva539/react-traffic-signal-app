import React, { Component } from 'react';
import Signal from './Signal';

class App extends Component {

  constructor(props) {
    super(props)
    this.colors = {
      red: {
        backgroundColor: 'red'
      },
      yellow: {
        backgroundColor: 'yellow'
      },
      green: {
        backgroundColor: 'green'
      },
      grey: {
        backgroundColor: 'lightGrey'
      }
    }
    this.state = {
      red:this.colors.red,
      yellow:this.colors.grey,
      green:this.colors.grey,
      nextSignal: 'yellow',
      delay:3000,
      intervalId:null
    }
    this.eventSource=new EventSource("http://localhost:3100/api/traffic/events");
    this.eventSource.onopen = e => {
      console.log(e);
    }
    
    this.eventSource.addEventListener('ping',e =>{
      console.log(e);
    })
  }


  handleSignalChange = () => {
     switch(this.state.nextSignal) {
       case "red":
         
         this.setState({
           red:this.colors.red,
           yellow:this.colors.grey,
           green:this.colors.grey,
           nextSignal:'yellow'    
         })
         break;
       case "yellow":
         
          this.setState({
            red:this.colors.grey,
            yellow:this.colors.yellow,
            green:this.colors.grey,
            nextSignal:'green'     
          })
          break;
       case "green":  
 
       this.setState({
        red:this.colors.grey,
        yellow:this.colors.grey,
        green:this.colors.green,
        nextSignal:'red'    
      })
      break;
      
      default:
        console.log("Inside the default")
     }

  }

  updateSignalDelay =(inputData) => {
    console.log(inputData);
       this.setState({
         delay:inputData.delay
       })
   clearInterval(this.state.intervalId);                
  
}
   
handleSignalInterval=(delay) =>{
  this.signalInterval= setInterval( () => {
    this.handleSignalChange();
  },delay);
}
componentDidMount() {
  this.eventSource.onmessage = e => {
      console.log(e.data);
      let delay= JSON.parse(e.data).delay;
      clearInterval(this.state.intervalId);
      const signalIntervalId= setInterval( () => {
        this.handleSignalChange();
      },delay);
      this.setState({intervalId:signalIntervalId});
 
  }
  const signalIntervalId= setInterval( () => {
    this.handleSignalChange();
  },this.state.delay);
  this.setState({intervalId:signalIntervalId});
}

componentWillUnmount() {
  clearInterval(this.state.intervalId);
  
}
render(){
  return (
    <div className="traffic-div">
      <Signal color={this.state.red} />
      <Signal color={this.state.yellow} />
      <Signal color={this.state.green} />
    </div>
  );
}
}
export default App;
