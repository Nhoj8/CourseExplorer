import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { MyButton} from './test.js' ;
import { Nodes} from './nodes.js' ;
import {mousedown, mousemove,mouseup} from './nodes.js';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
            message: "Mouse Event"
        }
  }
 
  handleEvent = (event) => {
   if (event.type === "mousedown") {
          mousedown(event);
      } else if(event.type === "mouseup") {
          mouseup(event);
      }else {
        mousemove(event);
      }
  }
 
  render() {
    return  (
    <div className="App">
      <header className="App-header" onMouseDown={ this.handleEvent } onMouseMove={ this.handleEvent } onMouseUp={ this.handleEvent }>
        
        <script src="dataBase.js" type="text/javascript" />

        <MyButton />
        <Nodes/>

      </header>
    </div>
  );
}
}

export default App;
//npm start