// Get high scores from local storage and print to list
function printHighScores() {
    let highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
    highScores.sort(function(a, b){
        return b.score - a.score
    }) 

    highScores.forEach(function(score) {
        let liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;
        let olEl = document.getElementById("scores-list");
        olEl.appendChild(liTag);
    })
}
// Clear score list
function clearHighScores() {
    window.localStorage.removeItem("highScores");
    window.location.reload();
}

document.getElementById("clear-btn").onclick = clearHighScores;

printHighScores();