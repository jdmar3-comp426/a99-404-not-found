document.getElementById("Wins").addEventListener("click", displayWins());
document.getElementById("Losses").addEventListener("click", displayLosses());
document.getElementById("Time Spent").addEventListener("click", displayTime());

function displayWins() {
    var winTab = document.createElement("p");
    winTab.className = "tabcontent";
    //winTab.innerHTML = get from database
    const winData = document.getElementById("windata");
    winData.appendChild(winTab);
}

function displayLosses() {
    var lossTab = document.createElement("p");
    lossTab.className = "tabcontent";
    //lossTab.innerHTML = get from database
    const lossData = document.getElementById("lossdata");
    lossData.appendChild(lossTab);
}

function displayTime() {
    var timeTab = document.createElement("p");
    timeTab.className = "tabcontent";
    //timeTab.innerHTML = get from database
    const timeData = document.getElementById("timedata");
    timeData.appendChild(timeTab);
}