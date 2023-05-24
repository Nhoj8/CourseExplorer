//import {connect} from './dataBase.js' ;
import {MakeGraph, loop} from './nodes.js';
//import {scrape} from './Scraper.js';
import {doParse} from './parser.js';
let showButton =true;
export function MyButton() {


    return (
      <button id="button" onClick={() => {  
        //alert('clicked');
        MakeGraph();
        let thebutton = document.getElementById("button")
        thebutton.style.visibility= "hidden";
        window.requestAnimationFrame(loop);
        doParse();
        //scrape();
      }}> Start
    
        
      </button>
    );
  }
  

