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
      delay:3000
    }
    this.eventSource=new EventSource("http://localhost:3100/api/traffic/events");
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
  }

componentDidMount() {
  this.eventSource.onmessage= e => {
    console.log(e);
    this.updateSignalDelay(JSON.parse(e.data));
  }
  setInterval( () => {
    this.handleSignalChange();
  },this.state.delay);
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
