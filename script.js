const options = document.querySelector('.options').children;
const answerTrackerContainer = document.querySelector('.answers-tracker');
const questionNumberSpan = document.querySelector('.question-num-value');
const totalQuestionSpan = document.querySelector('.total-question');
const correctAnswerSpan = document.querySelector('.correct-answers');  
const totalQuestionSpan2 = document.querySelector('.total-question2');
const percentage = document.querySelector('.percentage');
const question = document.querySelector('.question');
const opt1 = document.querySelector('.option1');
const opt2 = document.querySelector('.option2');
const opt3 = document.querySelector('.option3');
const opt4 = document.querySelector('.option4');
let questionIndex;
let index = 0;
let myArray = [];
let myArr = [];
let score = 0;


// Question Options and answers
const questions= [
    {
        q: "In Computer Programming a loop is described as what ?",
        options: ['A sequence of instruction that is repeated until a certain condition is reached',
        'It does not run', 'A loop is static in our program', 
        'all of the above'],
        answer: 0,
    },
    {
        q: 'How do you Initiatilise a For Loop statement ?',
        options: ['for(i = 0; 0 < 10; i++)', 'for(var i = 0; 0 < 10; i++ )',
        '(i = 0; 0 < 10, i++)', 'for(var 0 < 10; 0++)'],
        answer: 1,
    }, 
    {
        q: 'How do you declare a function expression ?',
        options: ['function(person){}', 'function=(){}', 
        'var myCompany= function(){}', 'none of the above'],
        answer: 2,
    },

    {
        q:'What is the best way that best describes how to write an If statement',
        options: ['if i === 10 then', 'if i = 10', 'if (i == 5)', 
        'if == 4 and '],
        answer: 2,
    },
    {
      q: 'How do you declare a JavaScript variable ?',
      options: ['variable myCompany', 'var myCompany', 'v myCompany',
       'none of these'],
       answer: 1,  
    },
    {
        q: 'What method is used to add to the end of an array ?',
        options: ['push', 'shift', 'pop', 'all of the above'],
        answer: 0,
    },

    {
        q: 'What is the full meaning of the DOM ?',
        options: ['Document Object Model', 'Dom Object Model', 
        'Document Object Manipulation', 'Document Object Modal'],
        answer: 0,

    },

    {
        q: 'A variable that is declared outside a function scope is regarded as ?',
        options: ['Local scope', 'Global scope', 
        'Function scope', 'none of the above'],
        answer: 1,
    },
    {
        q: 'What operator is used to declare a variable?',
        options: ['*', '+', '=', '=+'],
        answer: 2,
    },
    {
        q: 'What does the classList stand for?',
        options: ['returns the class names of an element', 
        'Useful for adding and removing element ', 'It can be modified', 
        'All of the above'],
        answer: 3, 
    },

];

// Set Questions and options as well question number
totalQuestionSpan.innerHTML = questions.length;
function load(){
    questionNumberSpan.innerHTML = index+1;
     question.innerHTML = questions[questionIndex].q;
     opt1.innerHTML = questions[questionIndex].options[0];
     opt2.innerHTML = questions[questionIndex].options[1];
     opt3.innerHTML = questions[questionIndex].options[2];
     opt4.innerHTML = questions[questionIndex].options[3];
     index++;
}

// We have to confirm if answer is correct or not 
function check(element){
    if(element.id ==questions[questionIndex].answer){
        element.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
        console.log("score:" + score);
    }
    else{
        element.classList.add('wrong');
        updateAnswerTracker('wrong');
        // If user selects one wrong disable the rest

    }
    disabledOptions();

}

function disabledOptions(){
    for(let i = 0; i < options.length; i++){
        options[i].classList.add('disabled');
        // If ansswers wrong but we want to show the correct answer
        // However, we disabled our options now we want to enable for the next

        if(options[i].id == questions[questionIndex].answer){
            options[i].classList.add('correct');

        }

    }
    
}

// call enableFunction
function enableOptions(){
    // However, we disabled our options now we want to enable for the next
    for(let i = 0; i < options.length; i++){
        options[i].classList.remove('disabled', 'correct', 'wrong');
    }
            
}

function validate(){
    if(!options[0].classList.contains('disabled')){
        alert('please select one option');
    }
    else{
        enableOptions();
        randomQuestion();
        
    }
}

// Next Button
function next(){
    // However, before moving unto the next question lets confirm if
    // user selected an option, if user did not then alert select any option
    // then alert(please select one)
    validate();

}

// We need to be able to select radom questions
function randomQuestion(){
    let randomNumber = Math.floor(Math.random()*questions.length);
    let hitDuplicate = 0;
    if(index == questions.length){
        quizOver();
    }
       // We have to ensure we reomve duplicates in other to avoid certain 
       // Questions from repeating severally
    else{
      if(myArray.length >0){
          for(let i = 0; i <myArray.length; i++){
              if(myArray[i]==randomNumber){
                  hitDuplicate = 1;
                  break;
                }
            }
            if(hitDuplicate ==1){
              randomQuestion();
           }
           else{
            questionIndex = randomNumber;
            load(); 
            myArr.push(questionIndex);
          }
        }
        if(myArray.length==0){
        questionIndex=randomNumber;
        load();
        myArr.push(questionIndex);
      }
       
     // check duplicate of questions
       myArray.push(randomNumber);

    }
}

// 4,2,3,8,6,0,9,7,5,1 All questions are complete now no duplicate.

// Aswer tracker
function answerTracker(){
    for(let i = 0; i<questions.length; i++){
        const div = document.createElement('div');
        answerTrackerContainer.appendChild(div);

    }

}

function updateAnswerTracker(classNam){
    answerTrackerContainer.children[index-1].classList.add(classNam);

}

function quizOver(){
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswerSpan.innerHTML =score;
    totalQuestionSpan2.innerHTML =questions.length;
    percentage.innerHTML =(score/questions.length)*100 + "%";

}
function tryAgain(){
    window.location.reload();

}
window.onload = function(){
    randomQuestion();
    answerTracker();
}

