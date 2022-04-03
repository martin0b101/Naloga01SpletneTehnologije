"use strict";

let arrayOfElements = [];
let id = 1;


function deleteUser(event){


    let checkedPearson = false;
    //load local storage tabel
    const localStorageTable = JSON.parse(localStorage.getItem("contacts"));

    

    let i;
    for (i = 0; i < arrayOfElements.length; i++) {
        let checkBoxIsChecked = document.getElementById(arrayOfElements[i]);
        if (checkBoxIsChecked.checked) {

            //najdu prvega ko je check zato dam chek na true
            checkedPearson = true;
            // get element of this id and remove it from table in html
            let tr = checkBoxIsChecked.closest("tr");
            const numberOfPerson = tr.childNodes[2].innerText;
            
            for (let j = 0; j < localStorageTable.length; j++) {
                if (numberOfPerson == localStorageTable[j].phonenumber) {
                    localStorageTable.splice(j, 1);
                }
            }
            //local storage update deleted pearson
            localStorage.setItem("contacts", JSON.stringify(localStorageTable));

            tr.remove(); //remove element from html
            console.log("Before delete " + arrayOfElements);
            arrayOfElements.splice(i, 1); //remove elemt from array
            console.log("After delete " + arrayOfElements);
            i = -1;   
        }
    }
    if (!checkedPearson) {
        alert("Please select a contact you want to delete!");
    }
    if (!arrayOfElements.length) {
        id = 1;
    }
}


function domAddClient(clientObject){
    const table = document.querySelector("#contact-table");
    const tr = document.createElement("tr");
    //add dragable attribute
    tr.setAttribute("draggable", true);
    //add tr atribut id to find it
    table.appendChild(tr);
   

    for (const key in clientObject){
        const td = document.createElement("td");
        if (clientObject.fristletter == clientObject[key]) {
            
            td.className = "icon-letter";
            td.innerText = clientObject[key];
            tr.appendChild(td);
            
        }else{
            td.innerText = clientObject[key];
            tr.appendChild(td);
        }
    }
    const tdForInput = document.createElement("td");
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("value", id);
    
    checkBox.setAttribute("id", "checkbox"+id);
    // dodam elemetn v tabelo da vem katerega zbrisat
    arrayOfElements.push("checkbox"+id++);
    
    tr.appendChild(tdForInput);
    tdForInput.appendChild(checkBox);
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
        alert("Please input first name!");
    }else if (lname == ""){
        alert("Please input last name!");
    }else if (pnumber == ""){
        alert("Please input phone number!");
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


function checkIfNumberExist(phoneNumber){
    //pogledam ce local strogae prazen
    if (localStorage.getItem("contacts") == null) {
        return false;
    }
    else{
        // nalozim podatek v tabelo
        const localStorageTable = JSON.parse(localStorage.getItem("contacts"));
        for (let i = 0; i < localStorageTable.length; i++) {
            if (localStorageTable[i].phonenumber == phoneNumber) {
                return true;
            }
        }   
    }
    return false;
}


function addUser(event){
    const fname = document.querySelector("#fname").value;
    const lname = document.querySelector("#lname").value;
    const pnumber = document.querySelector("#pnumber").value;
    const email = document.querySelector("#email").value;

    //check if number exist
    if (checkIfNumberExist(pnumber)) {
        alert("Phone number already exist!");
        return;
    }
    
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
            return;
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
        
        //local storage table
        const arrayForLocalStorge = [phoneClients];

        // add participant to local storage
        if (localStorage.getItem("contacts") == null) {
            localStorage.setItem("contacts", JSON.stringify(arrayForLocalStorge));

        }else{
            const dataInLocalStorage = JSON.parse(localStorage.getItem("contacts"));
            dataInLocalStorage.push(phoneClients);
            localStorage.setItem("contacts", JSON.stringify(dataInLocalStorage));
        }

        domAddClient(phoneClients);

    }

    document.getElementById("fname").focus();
    
}

function searchOfElements(event){
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("contact-table");
    tr = table.getElementsByTagName("tr");

    // loop thorug table and hide all wrong
    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1]; //search names
        if (td) {
            txtValue = td.textContent || td.innerText;
            // ce obstaja filter v txtValue bo index vecji od -1 
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }else{
                tr[i].style.display = "none";
            }
        }
        
    }
}


function sort(event){
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.querySelector("#contact-table");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];
            // Check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
        }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    //input to add user
    document.getElementById("add-user").onclick = addUser;
    document.getElementById("delete-user").onclick = deleteUser;
    document.getElementById("search").onkeyup = searchOfElements;

    
    
    if (localStorage.getItem("contacts") != null) {
        const localStorageTable = JSON.parse(localStorage.getItem("contacts"));
        for (let i = 0; i < localStorageTable.length; i++) {
            domAddClient(localStorageTable[i]);   
        }   
    }

    //sort 
    document.getElementById("sort").addEventListener("click", sort);
    

})
