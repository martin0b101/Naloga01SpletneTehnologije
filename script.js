"use strict";




function domAddClient(clientObject){
    const table = document.querySelector("#contact-table");
    const tr = document.createElement("tr");
    // add tr to table
    table.appendChild(tr);
   
    //add icon
    /*const svgns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgns, "svg");
    const circle = document.createElementNS(svgns, "circle");
    const text = document.createElement("p");
    svg.style.height = '100';
    svg.style.width = '100';
    circle.setAttributeNS(null, 'cx', 50);
    circle.setAttributeNS(null, "cy", 50);
    circle.setAttributeNS(null, "r", 20);
    circle.setAttributeNS(null, "style", 'fill:black');
    text.className = "heavy";
    

    <svg height="100" width="100">
    <circle cx="50" cy="50" r="30" fill="blue"/>
    <text x="40" y="60" fill="white" class="heavy">J</text>
    </svg>
    */


    for (const key in clientObject){
        const td = document.createElement("td");
        if (clientObject.fristletter == clientObject[key]) {
            
            td.className = "icon-letter";
            td.innerText = clientObject[key];
            tr.appendChild(td);
            /*
            td.appendChild(svg);
            svg.appendChild(circle);
            text.innerText = clientObject[key];
            svg.appendChild(text);*/
        }else{
            td.innerText = clientObject[key];
            tr.appendChild(td);
        }
    }
}
function checkValidEmail(email){
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (regex.test(email)) {
        return true;
    }
    else{
        alert("Invalid email address! Please type valid email address");
    }
}

function checkIfEmpty(fname, lname, pnumber){
    if (fname == "") {
        alert("Please input first name");
    }else if (lname == ""){
        alert("Please input last name");
    }else if (pnumber == ""){
        alert("Please input phone number");
    }else{
        return true;
    }

}

function checkNumberIsValid(pnumber){
    if (Number.isInteger(parseInt(pnumber))) {
        return true;
    }else{
        alert("Phone number is not number!");
    }
}


function addUser(event){
    const fname = document.querySelector("#fname").value;
    const lname = document.querySelector("#lname").value;
    const pnumber = document.querySelector("#pnumber").value;
    const email = document.querySelector("#email").value;
    
    //remove input
    document.querySelector("#fname").value = "";
    document.querySelector("#lname").value = "";
    document.querySelector("#pnumber").value = "";
    document.querySelector("#email").value = "";

    let firstLetter;
    try {
        firstLetter = fname[0].toUpperCase();
    } catch (error) {
        if (fname == "") {
            alert(error+" Please input first name!");
        }
    }
    
    // object 
    const phoneClients = {
        fristletter: firstLetter,
        firstname: fname +" "+ lname,
        phonenumber: pnumber,
        email: email
    };


    // add user to html
    if (checkValidEmail(email) && checkIfEmpty(fname, lname, pnumber) && checkNumberIsValid(pnumber)) {
        domAddClient(phoneClients);
    }

    document.getElementById("fname").focus();
}


document.addEventListener("DOMContentLoaded", () => {
    //input to add user
    document.getElementById("add-user").onclick = addUser;
})
