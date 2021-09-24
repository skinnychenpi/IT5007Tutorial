document.addEventListener("DOMContentLoaded", dataPrepare());

function dataPrepare(){
    console.log("APP launching...");

    const waitingListName = [];
    const waitingListPhNum = [];
    const waitingListTime = [];

    var size = 0;
    const limit = 25;
    const style = "display: none";

    const guestNameToAdd = document.querySelector(".guestNameToAdd");
    const submitAdd = document.querySelector(".submitAdd");
    const submitRemove = document.querySelector(".submitRemove");
    const backToHomepage = document.querySelector(".BackToHomepage");
    const displayTable = document.querySelector(".DisplayTable");
    const WLTable = document.querySelector(".WLtable");
    const seatsAvaliable = document.querySelector(".waitingListLoad");

    // Hide Back to homepage button and the WL table.
    backToHomepage.style.display = "none";
    WLTable.style.display = "none";

    // Show available seats in WL.
    seatsAvaliable.innerHTML = limit - size;

    function isNumber(value) {
         var patrn = /^[0-9]*$/;
         if (patrn.exec(value) == null || value == "") {
             return false;
        } else {
             return true;
        }
    }

    submitAdd.addEventListener('click', function (){
        if (size == limit) {
            alert("The waiting list is full!");
            return;
        }
        
        let guestName = String(guestNameToAdd.value);
        if (guestName == "") {
            alert("The user name can't be empty!");
            return;
        }

        let guestPhNum = guestPhNumToAdd.value;
        if (!isNumber(guestPhNum)) {
            alert("Please enter valid phone number!");
            return;
        }
        
        size++;
        waitingListName.push(guestName);
        waitingListPhNum.push(guestPhNum);
        waitingListTime.push(new Date().toLocaleTimeString());

        guestNameToAdd.value = "";
        guestPhNumToAdd.value = "";

        seatsAvaliable.innerHTML = limit - size;
    });
    
    submitRemove.addEventListener('click', function(){
        if (size == 0) {
            alert("The waiting list is empty!");
            return;
        }
        size--;
        waitingListName.shift();
        waitingListPhNum.shift();
        waitingListTime.shift();
        seatsAvaliable.innerHTML = limit - size;
    });
    
    displayTable.addEventListener('click', function(){
        loadTableContent(limit, waitingListName, waitingListPhNum, waitingListTime);
    })
    
    console.log("Launching complete...");
}

  
function loadTableContent(limit, waitingListName, waitingListPhNum, waitingListTime){
    const style = "display: none";

    const AddToWL = document.querySelector(".AddToWL");
    const InfoHub = document.querySelector(".InfoHub");
    const RemoveFromWL = document.querySelector(".RemoveFromWL");
    const BackToHomepage = document.querySelector(".BackToHomepage");
    const DisplayTable = document.querySelector('.DisplayTable');
    const tbody = document.querySelector("tbody");
    const WLTable = document.querySelector(".WLtable");

    // Hide the corressponding div content in HTML.
    AddToWL.style.display = "none";
    InfoHub.style.display = "none";
    RemoveFromWL.style.display = "none";
    DisplayTable.style.display = "none";

    // Show back to home page button and the WL table.
    BackToHomepage.style.display = "";
    WLTable.style.display = "";

    BackToHomepage.addEventListener('click', function(){
        loadHomePage(limit, waitingListName.length);
    })

    // Fill up the table
    // Step one: prepare data
    var tableData = [];
    for (var i = 0; i < waitingListName.length; i++) {
        var name = waitingListName[i];
        var number = waitingListPhNum[i];
        var time = waitingListTime[i];
        var singleData = {index: i, candidate: name, phone: number, stamp: time};
        tableData.push(singleData);
    }
    // Step two: fill in the table
    for(var i = 0; i < tableData.length; i++) {
        var tr = document.createElement("tr");
        tbody.appendChild(tr);

        var index = "" + (tableData[i]["index"] + 1);
        var name = tableData[i]["candidate"];
        var number = tableData[i]["phone"];
        var time = tableData[i]["stamp"];
        
        var indexBlock=document.createElement("td");
        tr.appendChild(indexBlock);
        indexBlock.innerHTML= index;

        var nameBlock = document.createElement("td");
        tr.appendChild(nameBlock);
        nameBlock.innerHTML = name;

        var phoneBlock = document.createElement("td");
        tr.appendChild(phoneBlock);
        phoneBlock.innerHTML = number;

        var timeBlock = document.createElement("td");
        tr.appendChild(timeBlock);
        timeBlock.innerHTML = time;
    }

};

function loadHomePage(limit, size){
    const style = "display: none";

    
    const backToHomepage = document.querySelector(".BackToHomepage");
    const AddToWL = document.querySelector(".AddToWL");
    const InfoHub = document.querySelector(".InfoHub");
    const RemoveFromWL = document.querySelector(".RemoveFromWL");
    const DisplayTable = document.querySelector('.DisplayTable');
    const WLTable = document.querySelector(".WLtable");
    const tbody = document.getElementById("myTbody");
    const seatsAvaliable = document.querySelector(".waitingListLoad");

    // Hide Back to homepage button and the table.
    backToHomepage.style.display = "none";
    WLTable.style.display = "none";


    AddToWL.style.display = "";
    InfoHub.style.display = "";
    RemoveFromWL.style.display = "";
    DisplayTable.style.display = "";

    // clear the content of the table.
    tbody.innerHTML = "";

    seatsAvaliable.innerHTML = limit - size;
}
