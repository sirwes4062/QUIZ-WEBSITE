const username = document.getElementById('username');
const saveScoreBtn =document.getElementById('saveScoreBtn'); 
//local storage
const mostRecentScore= localStorage.getItem('mostRecentScore');
const finalscore = document.getElementById('finalscore');


const MAX_HIGH_SCORE = 5;

   const highScores = JSON.parse(localStorage.getItem("highScores")) || []; 

   
    finalscore.innerText = mostRecentScore;
    

    //the keyup functions allow the username value of the input to be saved 
    username.addEventListener('keyup', () =>{
    // console.log(username.value);
    //the saveScorebtn disabled if there is no username input
    saveScoreBtn.disabled = !username.value;
})

    saveHighScore = e =>{
    console.log("clicked the save button");
    //the e.preventDefault prevents the form 
    //from following its default action y going to a different page
    e.preventDefault();


    const score = {
        score: mostRecentScore,
        name: username.value
        };
        //it adds the inputed username and the gotten school into the highScores array
        //using highScores.push
        highScores.push(score)

        highScores.sort((a,b)=> b.score - a.score)
        highScores.splice(5);
        console.log(highScores);

         localStorage.setItem("highScores",JSON.stringify(highScores));

      //once the preceeding action has been carried out,it goes back to the home page using /
      window.location.assign("/");       

};
