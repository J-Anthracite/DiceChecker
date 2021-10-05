var DieSize = 6;
var Rolls = new Map([[1, 100]]);
var TotalRolls = 0;

function Initiate(){
    DieSize = document.getElementById('DieSize').value;
    TotalRolls = 0;
    Rolls.clear;
    
    //Initiate Die Map
    for (let i = 1; i <= DieSize; i++) {
        Rolls[i] = 0;
    }

    //Create Display Segments
    CreateSegments();
    CreateBars();

    //Temporarly Stick Random Values
    // for (let index = 1; index <= DieSize; index++) {
    //     let Val = Math.floor(Math.random() * 10 + 1);
    //     TotalRolls += Val;
    //     Rolls[index] = Val;
    // }
    
}

function UpdateDisplays(){
    console.clear();
    console.log("Total Rolls: " + TotalRolls);
    
    UpdateSegments();
    UpdateBars();
}

function CreateSegments(){
    var SegmentDisplay = document.getElementById("SegmentDisplay");
    SegmentDisplay.innerHTML = "";

    for (let i = 1; i <= DieSize; i++) {
        let Segment = document.createElement('span');
        Segment.id = "S" + i;
        Segment.className = "Segment";
        //Segment.style.backgroundColor = "hsl(" + Math.floor(Math.random() * 360) + ", 100%, 75%)";
        Segment.style.backgroundColor = "hsl(" + (360 / DieSize * i - 1) + ", 100%, 75%)";

        SegmentDisplay.appendChild(Segment);
    }
}

function CreateBars(){
    var BarDisplay = document.getElementById("BarDisplay");
    BarDisplay.innerHTML = "";

    for (let i = 1; i <= DieSize; i++){
        let Bar = document.createElement('div');
        Bar.className = "Bar";

        let BarFill = document.createElement('div');
        BarFill.className = "BarFill";
        BarFill.id = "B" + i;
        BarFill.style.backgroundColor = "hsl(" + (360 / DieSize * i - 1) + ", 100%, 75%)";

        let DisplayWidth = document.getElementById("BarDisplay").offsetWidth;
        Bar.style.width = DisplayWidth / (DieSize * 2) + "px";
        BarFill.style.width = DisplayWidth / (DieSize * 2) + "px";

        BarFill.innerHTML = i;
        Bar.appendChild(BarFill);
        BarDisplay.appendChild(Bar);
    }
}

function UpdateSegments(){
    var Segments = document.getElementsByClassName("Segment").length;

    for (let i = 1; i <= DieSize; i++) {
        let Percent = (Rolls[i] / TotalRolls);
        //console.log(i + " Has " + Rolls[i] + " Making " + Math.round(Percent * 1000) / 100 + "%");
        let DisplayWidth = document.getElementById("SegmentDisplay").offsetWidth;
        document.getElementById("S" + i).style.width = Percent * DisplayWidth + "px";
    }
}

function UpdateBars(){
    var Largest = 0;
    var Smallest = Rolls[1];

    for (let i = 1; i <= DieSize; i++){
        let Num = Rolls[i];

        if(Num > Largest){
            Largest = Num;
        }
        else if (Num < Smallest) {
            Smallest = Num;
        }
    }

    var Distance = Largest - Smallest;
    console.log(Distance);

    for (let i = 1; i <= DieSize; i++){
        let Percent = (Rolls[i] / TotalRolls);
        let DisplayHeight = document.getElementById("BarDisplay").offsetHeight;
        //document.getElementById("B" + i).style.height = (Percent + 0.5) * DisplayHeight + "px";
        let Height = (Math.round((Percent * 100) - (100 / DieSize) / 100) / 100);
        //console.log((Rolls[i] / Distance * 100) - 50 + "%");
        console.log(Math.abs(((Rolls[i] / Distance) * 100) - 50) * (DisplayHeight / 2));
        document.getElementById("B" + i).style.height = Math.abs((((Rolls[i] / Distance) * 100) - 50) / 100) * (DisplayHeight / 2) + "px";
        document.getElementById("B" + i).innerHTML = (Math.round(Percent * 1000) / 10) + "%";
        if(((Rolls[i] / Distance * 100) - 50) < 0){
            document.getElementById("B" + i).parentNode.style.height = 202 + (202 / Math.abs((Rolls[i] / Distance * 100) - 50));
        }
    }

}

document.addEventListener('keydown', (event) => {
    var Num = parseInt(event.key);

    if(Num == NaN){
        return;
    }

    if(Rolls[Num] != null){
        Rolls[Num]++;
        TotalRolls++;
        UpdateDisplays();
    }
});