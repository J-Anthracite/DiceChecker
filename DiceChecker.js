var Rolls = new Map([[1, 100]])

function InitiateDieMap(Size){
    Rolls.clear;
    for (let i = 1; i <= Size; i++) {
        Rolls.set(i, 0);
    }
}

function test(){
    window.alert("Test!")
}