const highScores = JSON.parse(localStorage.getItem("highScores")) || []; 
const highScoreList= document.getElementById("highScoreList");



 highScoreList.innerHTML =

 highScores.map(score =>{
  return (`<li class="high-score">${score.name} - ${score.score}<li>`); })
  .join("");
