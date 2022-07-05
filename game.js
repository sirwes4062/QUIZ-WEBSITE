 const question = document.getElementById('question');

//the array.from converts the html lsit to an array
//array should be in an uppercase ie Array
 const choices = Array.from(document.getElementsByClassName('choice-text'));
 const loader = document.getElementById("loader");
 const game = document.getElementById("game");
 const progressText = document.getElementById('progressText');
 const scoretext = document.getElementById('score');
 const progressBarFull = document.getElementById('progressBarFull');
 const next = document.getElementById("next");
 const previous = document.getElementById("previous");





let currentQuestion = {};
let acceptingAnswers = false;
let score= 0;
let questionCounter = 0;
let availiableQuestions = {};
let questions =[];


fetch(
       "questions.json"
         )
//  fetch(
//     " https://opentdb.com/api.php?amount=3&category=19&difficulty=easy&type=multiple"
//      )
.then (res=>{
    return res.json();
})
     .then(loadedQuestions => {
    //  console.log(loadedQuestions.results);
     questions = loadedQuestions;
     startGame();
     
     })
    .catch(err => {
    console.error(err)
    });




       //constants
       //constant for bonus for getting the answer correctly and maximum questions
        const CORRECT_BONUS = 10;
        const MAX_QUESTIONS = 5;

        //the startGame function for when the game starts
        startGame =() =>{
        
        questionCounter = 0;
        score = 0;


        //the spread operator (...) is used to assign the array in the questions array
        //to the avaliable question
        //therefore the total questions in the qusetion array is equal to the availiable questions 
        availiableQuestions = [...questions];    

        getNewQuestion();
        // getOldQuestion();
       

         //the loader and to start the game
         game.classList.remove("hidden");
         loader.classList.add("hidden");

        };






        
        // the getNewQuestion function to give a new question
        getNewQuestion = () => {
        if(availiableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
         
         

        //LOCAL STORAGE??
        //using the local storage to set the score(setItem) in the local storage
        localStorage.setItem('mostRecentScore',score);

        //go to the end of the page ie end.html
        return window.location.assign('/end.html');
            }


        questionCounter++; 
        //the innerHtml syntax changes the text
        //the ${} is an es6 literals that gets rid of the quotes
        progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;



        // UPDATE THE PROGRESS BAR
        progressBarFull.style.width= `${(questionCounter/MAX_QUESTIONS) * 100}%`;
      


        const questionIndex = 0;
        
        
        
      // const questionIndex =Math.floor( Math.random() * availiableQuestions.length)
         console.log(questionIndex);
    //    questionIndex =0;
    //    questionIndex++;
         currentQuestion = availiableQuestions[questionIndex]
         

         console.log(currentQuestion);

         //console.log the question out of the question in the current question and answer

         question.innerText= currentQuestion.question;


        //  if(questionCounter==5){
        //      window.location.assign('/end.html');
        //  };
      
         //codes for changing the options
          choices.forEach(choice =>{
          const number= choice.dataset["number"];
        
         choice.innerText = currentQuestion['choice' + number];
        })
        // //the splice function removes a question that as already been attempted
        availiableQuestions.splice(questionIndex,1);
       
        acceptingAnswers =true;
        };
 



        choices.forEach(choice =>{
        choice.addEventListener("click", e=>{
           if(!acceptingAnswers) return;

           acceptingAnswers = false;
           const selectedChoice = e.target;
           const selectedAnswer = selectedChoice.dataset['number'];



        //  the tenary operator '==' to check for the correct and wrong answer
             const classToApply  =  selectedAnswer==currentQuestion.answer ? "correct" : "incorrect";
             if(classToApply==='correct'){
                 incrementScore(CORRECT_BONUS);
             }
           
            selectedChoice.parentElement.classList.add(classToApply);


           // the setTimeout function is used to add a delay before the next function is performed
            setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
           getNewQuestion();
            }, 2000); 
        });
    });

    //an incrementScore function that takes a number parameter
    incrementScore =num =>{
        score+=num;
       scoretext.innerText = score;
    }






































   //function for previous button
       getOldQuestion = () =>{
        questionCounter = 5;
        // if(availiableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
         
         

        // //LOCAL STORAGE??
        // //using the local storage to set the score(setItem) in the local storage
        // localStorage.setItem('mostRecentScore',score);

        // //go to the end of the page ie end.html
        // return window.location.assign('/end.html');
        //     }
        
       
        questionCounter--; 
        //the innertext syntax changes the text
        //the ${} is an es6 literals that gets rid of the quotes
        progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;



        // UPDATE THE PROGRESS BAR
        progressBarFull.style.width= `${(questionCounter/MAX_QUESTIONS) * 100}%`;

        
       
      
          questionIndexForPrevious = 0;
          //const questionIndex =Math.floor( Math.random() * availiableQuestions.length);
        
        
   
         currentQuestion = availiableQuestions[questionIndex]
         
         question.innerText= currentQuestion.question;
      
         //codes for changing the options
          choices.forEach(choice =>{
          const number= choice.dataset["number"];
        
         choice.innerText = currentQuestion['choice' + number];
      })
        //the splice function removes a question that as already been attempted
         console.log( availiableQuestions.splice(questionIndex,1))
         acceptingAnswers =true;
        };
  
















































































    //event listener on the next button
     next.addEventListener('click', ()=>{
        getNewQuestion();
    });


    //event listener for a previous button
       previous.addEventListener('click', ()=>{
            //    getOldQuestion();
            });       