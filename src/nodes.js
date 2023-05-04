import './nodes.css';
//import Node from './node.js';

let nodewidth = 100;
let nodeheight = 100;

export function Nodes(){
    return (
        <div className="graph" id="graph"> 
        
      
      

        </div>
      );
}// <svg width="500" height="500"><line x1="50" y1="50" x2="350" y2="350" stroke="black"/></svg>
let position ={
    x :0,
    y :0,
}
let isclicked = false;
export function mousedown(event){
    position.x = event.clientX;
    position.y = event.clientY;
    console.log(position);
    isclicked = true;
}
export function mouseup(event){
    isclicked = false;
}
export function mousemove(event){
    if(isclicked){
    var myallnodes = document.getElementById("graph").querySelectorAll(".nodes"); 
    for (let i = 0; i < myallnodes.length; i++) {
        let rect = myallnodes[i].getBoundingClientRect()
        myallnodes[i].style.transform = `translate(${ +rect.x + (event.clientX - position.x)}px,${rect.y + event.clientY - position.y}px)`//l<emplacement du div
      };
    var myallreq = document.getElementById("graph").querySelectorAll(".svg"); 
    for (let i = 0; i < myallreq.length; i++) {
          let rect = myallreq[i].getBoundingClientRect()
          myallreq[i].style.transform = `translate(${ +rect.x + (event.clientX - position.x)}px,${rect.y + event.clientY - position.y}px)`//l<emplacement du div
        };

      position.x = event.clientX;
      position.y = event.clientY;

    }
}

async function generateNewNode(courseCode, name, description,number) {//mets les jeu sur l'ecran

    let node = document.createElement('div');//le div pour le jeu
    //Jeu.style.width = '800px'
    //Jeu.style.height = '100px'
    node.style.position = "absolute"//les parametre
    node.style.transform = `translate(${(window.innerWidth - nodewidth)*Math.random()}px,${(window.innerHeight -nodeheight)*Math.random()}px)`//l<emplacement du div
    //Jeu.style.inset = '0'
    //let image = document.createElement('img')//l'image
    //image.src = tousLesJeu[nombre].image
    let text = document.createElement('p')
    node.className = "nodes";//et je met le id du div
    node.id = courseCode;
    node.style.zIndex="1";
    //je met tous le text
    text.textContent = courseCode + " : " + name + "\n"+ description
    //Jeu.append(image)//et je met tous ca dans le div
    node.append(text)
    var nodes = document.getElementById("graph");
  
    nodes.append(node)//puis sur l'ecran
  
  }
function setPrereqLinePos(current,prereq,line,svg,newdiv){
    let bigx =current.x
    let bigy =current.y
    let smallx =prereq.x
    let smally =prereq.y
    if(current.x < prereq.x){
        bigx =prereq.x

        smallx =current.x
    }
    if(current.y < prereq.y){
        bigy =prereq.y
        smally =current.y
    }
    let slopedfirst = 0;
    let sloppedsecond = bigy -smally
    if((current.y - prereq.y)/(current.x - prereq.x) < 0){
        slopedfirst = sloppedsecond;
        sloppedsecond =0;
    }
    line.setAttribute("x1", 0)
    line.setAttribute("y1",slopedfirst)
    line.setAttribute("x2", bigx -smallx)
    line.setAttribute("y2", sloppedsecond)

    

    svg.setAttribute("width",bigx -smallx)
    svg.setAttribute("height",bigy -smally)
    newdiv.style.transform = `translate(${smallx+50}px,${smally+50}px)`//l<emplacement du div
}

export async function MakeGraph(){
    for (let i = 0; i < AllNodes.length; i++) {
        generateNewNode(AllNodes[i].courseCode,AllNodes[i].name,AllNodes[i].description,i);//cree tous les jeu sur l<ecran
      }
    var nodes = document.getElementById("graph");
  
      
    for (let i = 0; i < AllNodes.length; i++) {
        if (AllNodes[i].prerequisits.length > 0)
        {
            let current = document.getElementById(AllNodes[i].courseCode).getBoundingClientRect()
            for(let j = 0; j < AllNodes[i].prerequisits.length; j++){
                let prereq = document.getElementById(AllNodes[i].prerequisits[j]).getBoundingClientRect()//VERY INEFFICIENT
                //alert("svg" + prereq.x)
                let newdiv = document.createElement("div");
                let svg =document.createElementNS("http://www.w3.org/2000/svg",'svg');
                let line = document.createElementNS("http://www.w3.org/2000/svg",'line')
                newdiv.style.position = "absolute"//les parametre

                setPrereqLinePos(current,prereq,line,svg,newdiv)

                //line.style.strokeWidth=5;
                line.style.stroke='rgb(0,0,0)';
                newdiv.className="svg";
                
                newdiv.id= AllNodes[i].courseCode + AllNodes[i].prerequisits[j]
                svg.appendChild(line)
   
                newdiv.append(svg)
                nodes.appendChild(newdiv)//puis sur l'ecran
                
            }
        }
     
        
        
    }
    let centerdiv = document.createElement("div");
    centerdiv.id="centerOfMass";
    centerdiv.style.position = "absolute"//les parametre
    nodes.appendChild(centerdiv)
}
let nodesSpeed = [{x:0,y:0},{x:0,y:0},{x:0,y:0}]
let centerOfMass = {x:0,y:0}
export function loop() {
    var myallnodes = document.getElementById("graph").querySelectorAll(".nodes"); 
    //var myallreq = document.getElementById("graph").querySelectorAll(".svg"); //might not be needed
    centerOfMass = {x:0,y:0}

    for (let i = 0; i< nodesSpeed.length; i++){
        let rect = myallnodes[i].getBoundingClientRect()
        myallnodes[i].style.transform = `translate(${ +rect.x + (nodesSpeed[i].x)}px,${rect.y + nodesSpeed[i].y}px)`//l<emplacement du div

        nodesSpeed[i].x *= 0.999
        nodesSpeed[i].y *= 0.999
        centerOfMass.x += rect.x/nodesSpeed.length
        centerOfMass.y += rect.y/nodesSpeed.length
    }
    let centerdiv = document.getElementById("centerOfMass")
    centerdiv.style.transform = `translate(${ centerOfMass.x +nodewidth/2 - 8}px,${centerOfMass.y+nodewidth/2-8}px)`//- half of em
    
    
    let M = 10//Mass
    let Q = 10//Charge
    let K = (50.0/myallnodes.length)*10000//scalar like big G

    for (let i = 0; i< myallnodes.length; i++){
        for (let j = i+1; j< myallnodes.length; j++){
            let recti = myallnodes[i].getBoundingClientRect()
            let rectj = myallnodes[j].getBoundingClientRect()
            let dx = recti.x - rectj.x
            let dy = recti.y - rectj.y
            let d = Math.sqrt(dx*dx+dy*dy)
            let R = nodewidth*4//4 is distance wanted between nodes
            if (d != 0){
                let force = (d*d*M*M/(R*R)-Q*Q)*K/(d*d*d*d*d)
                let fx = force*dx
                let fy = force*dy
                nodesSpeed[i].x -= fx
                nodesSpeed[i].y -= fy
                nodesSpeed[j].x += fx
                nodesSpeed[j].y += fy

            }
            
        }
            if (AllNodes[i].prerequisits.length > 0){
                let current = document.getElementById(AllNodes[i].courseCode).getBoundingClientRect()
                for(let j = 0; j < AllNodes[i].prerequisits.length; j++){
                    let prereq = document.getElementById(AllNodes[i].prerequisits[j]).getBoundingClientRect()//VERY INEFFICIENT
                    let newdiv = document.getElementById("graph").querySelector("#"+AllNodes[i].courseCode + AllNodes[i].prerequisits[j])
                 if(newdiv != null){
                    let svg = document.getElementById("graph").querySelector("#"+AllNodes[i].courseCode + AllNodes[i].prerequisits[j]).firstChild;                  
                    let line = document.getElementById("graph").querySelector("#"+AllNodes[i].courseCode + AllNodes[i].prerequisits[j]).firstChild.firstChild; 
                    setPrereqLinePos(current,prereq,line,svg,newdiv)


                    let recti = myallnodes[i].getBoundingClientRect()
                    let rectj = myallnodes[AllNodes[i].prerequisitsnum[j]].getBoundingClientRect()
                    //alert(llnodes[i].prerequisitsnum[j])
                    let dx = recti.x - rectj.x
                    let dy = recti.y - rectj.y
                    let d = Math.sqrt(dx*dx+dy*dy)
                    //let R = nodewidth*2//4 is distance wanted between nodes
                    if (d != 0){
                        let force = (M*M)*0.05/(d*d)
                        let fx = force*dx
                        let fy = force*dy
                        nodesSpeed[i].x -= fx
                        nodesSpeed[i].y -= fy
                        nodesSpeed[AllNodes[i].prerequisitsnum[j]].x += fx
                        nodesSpeed[AllNodes[i].prerequisitsnum[j]].y += fy
        
                    }


                 }
                }
            }
    }

    


    window.requestAnimationFrame(loop);
}



let AllNodes = [
    {
        prerequisits: [],
        prerequisitsnum: [],
        courseCode: 'math',
        name: '',
        description: 'blahbalh'
    },
    {
        prerequisits: [],
        prerequisitsnum: [],
        courseCode: 'science',
        name: '',
        description: 'balh'
    },
    {
        prerequisits: ["math","science"],
        prerequisitsnum: [0,1],
        courseCode: 'bigmath',
        name: '',
        description: 'balhahhhh'
    }]

