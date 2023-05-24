
async function writeFile(fileHandle, contents) {//ecrit dans le josn

    const writable = await fileHandle.createWritable();//attend et verify
    await writable.write(contents);
    await writable.close();
  }
async function SaveData(){
    let fileHandle2 = "";
    let theDataObject ="";
    const data = JSON.stringify(theDataObject, null, 4);
    [fileHandle2] = await window.showOpenFilePicker();//on demende pour le json, puis ecrit
    writeFile(fileHandle2, data);
  
  }
  
  
  const http = require('http');
  
  
  // URL of the webpage to scrape
 // const url = 'https://catalogue.uottawa.ca/en/courses/mat/';


 
  export function scrape(){

  // Add headers before the routes are defined
  fetch("https://crossorigin.me/https://catalogue.uottawa.ca/en/courses/mat/").then(d => d.text()).then(d => console.log(d))
  fetch_demo();
  }
    
async function fetch_demo()
{
	const resp = await fetch('https://crossorigin.me/https://catalogue.uottawa.ca/en/courses/mat/');

	console.log(await resp.json());
}




 
