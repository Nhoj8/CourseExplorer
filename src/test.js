//import {connect} from './dataBase.js' ;
import {MakeGraph, loop} from './nodes.js';
let showButton =true;
export function MyButton() {


    return (
      <button id="button" onClick={() => {  
        //alert('clicked');
        MakeGraph();
        let thebutton = document.getElementById("button")
        thebutton.style.visibility= "hidden";
        window.requestAnimationFrame(loop);
      }}> Start
    
        
      </button>
    );
  }
  

