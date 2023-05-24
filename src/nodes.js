import './nodes.css';
import { doParse } from './parser.js';
//import Node from './node.js';

let nodewidth = 100;
let nodeheight = 100;

export function Nodes() {
    return (
        <div className="graph" id="graph">




        </div>
    );
}// <svg width="500" height="500"><line x1="50" y1="50" x2="350" y2="350" stroke="black"/></svg>
let position = {
    x: 0,
    y: 0,
}
let isclicked = false;
export function mousedown(event) {
    position.x = event.clientX;
    position.y = event.clientY;
    console.log(position);
    isclicked = true;
}
export function mouseup(event) {
    isclicked = false;
}
export function mousemove(event) {
    if (isclicked) {
        var myallnodes = document.getElementById("graph").querySelectorAll(".nodes");
        for (let i = 0; i < myallnodes.length; i++) {
            let rect = myallnodes[i].getBoundingClientRect()
            myallnodes[i].style.transform = `translate(${+rect.x + (event.clientX - position.x)}px,${rect.y + event.clientY - position.y}px)`//l<emplacement du div
        };
        var myallreq = document.getElementById("graph").querySelectorAll(".svg");
        for (let i = 0; i < myallreq.length; i++) {
            let rect = myallreq[i].getBoundingClientRect()
            myallreq[i].style.transform = `translate(${+rect.x + (event.clientX - position.x)}px,${rect.y + event.clientY - position.y}px)`//l<emplacement du div
        };

        position.x = event.clientX;
        position.y = event.clientY;

    }
}

async function generateNewNode(coursetype, coursenum, name, description, number) {//mets les jeu sur l'ecran
    //nodes = document.getElementById("graph");
    let node = document.createElement('div');//le div pour le jeu

    node.style.position = "absolute"//les parametre
    node.style.transform = `translate(${(window.innerWidth*2 - nodewidth) * Math.random()}px,${(window.innerHeight*2 - nodeheight) * Math.random()}px)`//l<emplacement du div
    let text = document.createElement('p')
    node.className = "nodes";//et je met le id du div
    //node.id = courseCode;
    node.style.zIndex = "1";
    //je met tous le text
    text.textContent = coursetype + coursenum + " : " + name// + "\n" + description
    //Jeu.append(image)//et je met tous ca dans le div
    let textcontainer = document.createElement('div');
    textcontainer.append(text)
    node.append(textcontainer)


    nodes.append(node)//puis sur l'ecran
    listOfNodes.push(node)
    nodesSpeed.push({ x: 0, y: 0 })

}
function setPrereqLinePos(current, prereq, line, svg, newdiv) {
    let bigx = current.x
    let bigy = current.y
    let smallx = prereq.x
    let smally = prereq.y
    if (current.x < prereq.x) {
        bigx = prereq.x

        smallx = current.x
    }
    if (current.y < prereq.y) {
        bigy = prereq.y
        smally = current.y
    }
    let slopedfirst = 0;
    let sloppedsecond = bigy - smally
    if ((current.y - prereq.y) / (current.x - prereq.x) < 0) {
        slopedfirst = sloppedsecond;
        sloppedsecond = 0;
    }
    line.setAttribute("x1", 0)
    line.setAttribute("y1", slopedfirst)
    line.setAttribute("x2", bigx - smallx)
    line.setAttribute("y2", sloppedsecond)



    svg.setAttribute("width", bigx - smallx)
    svg.setAttribute("height", bigy - smally)
    newdiv.style.transform = `translate(${smallx + 50}px,${smally + 50}px)`//l<emplacement du div
}

let listOfNodes = []
let listOfSVGs = []
let nodes
export async function MakeGraph() {
    //AllNodes = doParse()
    prepareNodes()
    nodes = document.getElementById("graph");
    for (let i = 0; i < AllNodes.length; i++) {
        generateNewNode(AllNodes[i].coursetype, AllNodes[i].coursenum, AllNodes[i].name, AllNodes[i].description, i);//cree tous les jeu sur l<ecran
    }
    //var nodes = document.getElementById("graph");


    for (let i = 0; i < AllNodes.length; i++) {
        if (AllNodes[i].prerequisitesnum.length > 0) {
            let current = listOfNodes[i].getBoundingClientRect() //document.getElementById(AllNodes[i].courseCode).getBoundingClientRect()
            for (let j = 0; j < AllNodes[i].prerequisitesnum.length; j++) {
                let prereq = listOfNodes[AllNodes[i].prerequisitesnum[j]].getBoundingClientRect()//document.getElementById(AllNodes[i].prerequisites[j]).getBoundingClientRect()//VERY INEFFICIENT
                //alert("svg" + prereq.x)
                let newdiv = document.createElement("div");
                let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
                let line = document.createElementNS("http://www.w3.org/2000/svg", 'line')
                newdiv.style.position = "absolute"//les parametre

                setPrereqLinePos(current, prereq, line, svg, newdiv)

                //line.style.strokeWidth=5;
                line.style.stroke = 'rgb(0,0,0)';
                newdiv.className = "svg";

                //newdiv.id= AllNodes[i].courseCode + AllNodes[i].prerequisites[j]
                svg.appendChild(line)

                newdiv.append(svg)
                nodes.appendChild(newdiv)//puis sur l'ecran
                listOfSVGs.push(newdiv)
                AllNodes[i].svgnum.push(listOfSVGs.length - 1)
                //AllNodes[AllNodes[i].prerequisitesnum[j]].svgnum.push(listOfSVGs.length-1)

            }
        }



    }
    let centerdiv = document.createElement("div");
    centerdiv.id = "centerOfMass";
    centerdiv.style.position = "absolute"//les parametre
    nodes.appendChild(centerdiv)
    K = (50.0 / listOfNodes.length) * 50000000//scalar like big G
}
//let myallnodes = []
let M = 10//Mass
let Q = 10//Charge
let K;

let scale = 20
let R = nodewidth * scale//4 is distance wanted between nodes
let ratio = 4//how many times closer presqquisits are to eachother
export function loop() {

    //myallnodes = document.getElementById("graph").querySelectorAll(".nodes"); 
    //var myallreq = document.getElementById("graph").querySelectorAll(".svg"); //might not be needed
    centerOfMass = { x: 0, y: 0 }

    for (let i = 0; i < nodesSpeed.length; i++) {
        let rect = listOfNodes[i].getBoundingClientRect()
        listOfNodes[i].style.transform = `translate(${+rect.x + (nodesSpeed[i].x)}px,${rect.y + nodesSpeed[i].y}px)`//l<emplacement du div

        nodesSpeed[i].x =0//*= 0.999
        nodesSpeed[i].y =0//*= 0.999
        centerOfMass.x += rect.x / nodesSpeed.length;
        centerOfMass.y += rect.y / nodesSpeed.length
    }
    let centerdiv = document.getElementById("centerOfMass")
    centerdiv.style.transform = `translate(${centerOfMass.x + nodewidth / 2 - 8}px,${centerOfMass.y + nodewidth / 2 - 8}px)`//- half of em



    K*=1.001
    for (let i = 0; i < listOfNodes.length; i++) {
        for (let j = i + 1; j < listOfNodes.length; j++) {
            let recti = listOfNodes[i].getBoundingClientRect()
            let rectj = listOfNodes[j].getBoundingClientRect()
            let dx = recti.x - rectj.x
            let dy = recti.y - rectj.y
            let d = Math.sqrt(dx * dx + dy * dy)

            if (d != 0) {
                let force = (d * d * M * M / (R * R) - Q * Q) * K / (d * d * d * d * d)
                let fx = force * dx
                let fy = force * dy
                nodesSpeed[i].x -= fx
                nodesSpeed[i].y -= fy
                nodesSpeed[j].x += fx
                nodesSpeed[j].y += fy

            }

        }
 
        let C = (ratio**7-ratio**5)*K/(R**7)  //K*(16-1)/(R*R*R)//try 16 instead of 4
        if (AllNodes[i].prerequisitesnum.length > 0) {
            let current = listOfNodes[i].getBoundingClientRect()//document.getElementById(AllNodes[i].courseCode).getBoundingClientRect()
            for (let j = 0; j < AllNodes[i].prerequisitesnum.length; j++) {
                let prereq = listOfNodes[AllNodes[i].prerequisitesnum[j]].getBoundingClientRect()//document.getElementById(AllNodes[i].prerequisites[j]).getBoundingClientRect()//VERY INEFFICIENT
                let newdiv = listOfSVGs[AllNodes[i].svgnum[j]]//document.getElementById("graph").querySelector("#"+AllNodes[i].courseCode + AllNodes[i].prerequisites[j])
                if (newdiv != null) {
                    let svg = newdiv.firstChild//document.getElementById("graph").querySelector("#"+AllNodes[i].courseCode + AllNodes[i].prerequisites[j]).firstChild;                  
                    let line = svg.firstChild//document.getElementById("graph").querySelector("#"+AllNodes[i].courseCode + AllNodes[i].prerequisites[j]).firstChild.firstChild; 
                    setPrereqLinePos(current, prereq, line, svg, newdiv)


                    let recti = listOfNodes[i].getBoundingClientRect()
                    let rectj = prereq//listOfNodes[AllNodes[i].prerequisitesnum[j]].getBoundingClientRect()
                    //alert(llnodes[i].prerequisitesnum[j])
                    let dx = recti.x - rectj.x
                    let dy = recti.y - rectj.y
                    let d = Math.sqrt(dx * dx + dy * dy)
                    //let R = nodewidth*2//4 is distance wanted between nodes
                    if (d != 0) {
                        let force = M*M*C*d*d//(M * M) * C / (d * d) +0.000001
                        let fx = force * dx
                        let fy = force * dy
                        nodesSpeed[i].x -= fx
                        nodesSpeed[i].y -= fy
                        nodesSpeed[AllNodes[i].prerequisitesnum[j]].x += fx
                        nodesSpeed[AllNodes[i].prerequisitesnum[j]].y += fy

                    }


                }
            }
        }
    }




    window.requestAnimationFrame(loop);
}

async function prepareNodes() {
    AllNodes = doParse()
    for (let i = 0; i < AllNodes.length; i++)
        for (let p = 0; p < AllNodes[i].prerequisites.length; p++)
            for (let g = 0; g < AllNodes[i].prerequisites[p].length; g++)
                for (let j = 0; j < AllNodes.length; j++)//Much faster if binary search is used
                    if (AllNodes[i].prerequisites[p][g].coursenum == AllNodes[j].coursenum)
                    {
                        let NotalreadyE = true
                        for (let k = 0; k < AllNodes[i].prerequisitesnum.length; k++)//check if already added
                            if(AllNodes[i].prerequisitesnum[k] == j)
                                NotalreadyE = false
                        if(NotalreadyE)
                            AllNodes[i].prerequisitesnum.push(j)
                    }

//alert(AllNodes[3].prerequisitesnum)


}


let nodesSpeed = []
let centerOfMass = { x: 0, y: 0 }
let AllNodes = [
    {
        prerequisites: [],
        prerequisitesnum: [],
        coursetype: 'MAT',
        coursenum: '1400',
        name: '',
        description: 'blahbalh',
        svgnum: []
    },
    {
        prerequisites: [],
        prerequisitesnum: [],
        coursetype: 'SCI',
        coursenum: '1000',
        name: '',
        description: 'balh',
        svgnum: []
    },
    {
        prerequisites: [],
        prerequisitesnum: [],
        coursetype: 'TEC',
        coursenum: '1200',
        name: '',
        description: 'balhjkjkjhk',
        svgnum: []
    },
    {
        prerequisites: [[{ coursetype: 'MAT', coursenum: '1400', }], [{ coursetype: 'SCI', coursenum: '1000', }, { coursetype: 'TEC', coursenum: '1200', }]],
        prerequisitesnum: [],//[0,1,2],
        coursetype: 'GNG',
        coursenum: '2100',
        name: '',
        description: 'balhahhhh',
        svgnum: []
    },
    // {
    //     prerequisites: [],
    //     prerequisitesnum: [],
    //     coursetype: 'TEC',
    //     coursenum: '1200',
    //     name: '',
    //     description: 'balhjkjkjhk',
    //     svgnum: []
    // },
    // {
    //     prerequisites: [],
    //     prerequisitesnum: [],
    //     coursetype: 'ha',
    //     coursenum: '1400',
    //     name: '',
    //     description: 'balhjkjkjhk',
    //     svgnum: []
    // },
    // {
    //     prerequisites: [],
    //     prerequisitesnum: [],
    //     coursetype: 'TECg',
    //     coursenum: '1201',
    //     name: '',
    //     description: 'balhjkjkjhk',
    //     svgnum: []
    // },
    // {
    //     prerequisites: [[{ coursetype: 'TECg', coursenum: '1201', }]],
    //     prerequisitesnum: [],
    //     coursetype: 'hal',
    //     coursenum: '1405',
    //     name: '',
    //     description: 'balhjkjkjhk',
    //     svgnum: []
    // }
]

