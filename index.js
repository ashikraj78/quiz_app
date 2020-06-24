
var GLOBAL_TIMER;

const questions = [
    {
        title: "Who designed the city of Chandigarh?",
        options: ["Philip Johnson", "Louis I.Khan", "Sir Edwin Lutyens", "Le Corbusier"],
        answerIndex: 3
    },
    {
        title: "The concept of Dry Garden is associated with",
        options: ["Japanese Garden", "Chinese Garden", "Mughal Garden", "Egyptian Garden"],
        answerIndex: 0
    },
    {
        title: "Sodhan House, Ahmedabad was designed by ",
        options: ["Anant Raje", "Le Corbusier", "Louis I.Khan", "B.V. Doshi"],
        answerIndex: 1
    },
    {
        title: "Name the architect who criticised ornament in useful object in his essay Ornament and Cry",
        options: ["John Ruskin", "H P Berlage", "Adolf Loos", "Walter Gropius"],
        answerIndex: 2
    },
    {
        title: "The term ‘Necropolis’ refers to",
        options: ["Organically growing settlement", "Origin of a settlement", "A dead settlement", "Merging of two settlements"],
        answerIndex: 1
    },
    {
        title: "Which of the following commands in AUTOCAD is used to create 3D solid between various cross sections?",
        options: ["LOFT", "MESH", "XEDGES", "PFACE"],
        answerIndex: 2
    },
    {
        title: "In the falling water, what is the function of the overhanging slab?",
        options: ["Bedroom", "Open dining area", "Living", "Terrace"],
        answerIndex: 3
    },
    {
        title: "One of Frank Lloyd Wright's organic architecture?",
        options: ["Dulles airport", "Falling water", "Robbie house", "Petronas tower"],
        answerIndex: 1
    },
    {
        title: "The father of Prestress Concrete?",
        options: ["Eugene Freyssinet", "Jorn Utzon", "Santiaga Calatrava", "Tadao Ando"],
        answerIndex: 0
    },
    {
        title: " The first garden city designed by Raymund Unwin and Barry Parker:",
        options: ["Welwyn", "Hampstead", "Letcheworth", " Windsor"],
        answerIndex: 2
    },

]
var answers = [];

var quesElement = document.querySelector('.questionbody')
var ansElement = document.querySelector('.options')
let main = document.querySelector(".main")
let startButton = document.querySelector(".start")
let result = document.querySelector(".result")





class Question {
    constructor(title, options, correctAnswerIndex, questionIndex) {
        this.title = title;
        this.options = options;
        this.correctAnswerIndex = correctAnswerIndex;
        this.questionIndex = questionIndex
    }
    
    createUI() {
        quesElement.innerHTML = this.title;
        ansElement.innerHTML = this.options.map((option, index)=>{
            return (
                `<button data-index="${index}" class="option">
                    ${option}
                </button>`
            )
        }).join('')
        
        let scoreDisplay = document.querySelector(".scorecard");
        let nextQuestion = document.querySelector(".nextquestion");
        
        const currentScoreTick = document.getElementById(`score-tick-${this.questionIndex}`);
        const optionButtonElements = document.querySelectorAll('.option');
        
        optionButtonElements.forEach((buttonElement) => {
            buttonElement.addEventListener('click', (event) => {
               if(event.target.dataset.index == this.correctAnswerIndex){
                    scoreDisplay.innerText = +scoreDisplay.innerText +1;
                    buttonElement.style.background= "green";
                    currentScoreTick.style.background= "green";
                    setTimeout(function(){nextQuestion.style.display = "flex";}, 500);
                    
               } else {
                    buttonElement.style.background= "red";
                    currentScoreTick.style.background= "red";
                    const selectedRightButtonElm = [...optionButtonElements].find((btnElem) => {
                        return +btnElem.dataset.index === this.correctAnswerIndex
                    })
                    selectedRightButtonElm.style.background = 'green';
                    setTimeout(function(){nextQuestion.style.display = "flex";}, 1000);
               }
            })
        })
       
    }
    
}

const processedQuestions = questions.map((question, index) => {
    return new Question(question.title, question.options, question.answerIndex, index)
})

// clock  timer

function clock(cb){
    if(GLOBAL_TIMER) {
        clearInterval(GLOBAL_TIMER)
    }
    var timeCounter = 30;
    GLOBAL_TIMER = setInterval(getClock, 1000);

    function getClock (){
       timeCounter = --timeCounter;
       if(timeCounter == 0) {
           cb();
           clearInterval(GLOBAL_TIMER);
           let nextQuestion = document.querySelector(".nextquestion");
           nextQuestion.style.display = "flex";
       }
       return  document.getElementById("clock").textContent = timeCounter;
    }
    function stopClock(){
       return  clearInterval(GLOBAL_TIMER);
    }
}

// quiz

class Quiz {
    constructor(questions, activeQuestion = 0){
        this.questions = questions;
        this.activeQuestionIndex = activeQuestion || 0;
    }

    rootUI(){
        let questionNumber = document.querySelector(".timerhead");
        let nextQuestion = document.querySelector(".nextquestion")
        let nextQuestionButtonElm = nextQuestion.querySelector("button");
        // clear timer
        const showAnswerOnExpiry = () => {
            const optionButtonElements = document.querySelectorAll('.option');

            const question = questions[this.activeQuestionIndex];
            
            const selectedRightButtonElm = [...optionButtonElements].find((btnElem) => {
                return +btnElem.dataset.index === question.answerIndex
            })
            selectedRightButtonElm.style.background = 'green';
        }

        // start button 
        startButton.addEventListener('click',()=>{
            startButton.style.display="none";
            clock(showAnswerOnExpiry);
        });

        // next Question Button
        
        nextQuestion.addEventListener('click', () => {
            
            if(this.activeQuestionIndex >= 8){
                nextQuestionButtonElm.innerText = "Finished";
            }

            if(this.activeQuestionIndex >= 9){
                main.classList.add("xyz")
                let scoreDisplay = document.querySelector(".scorecard");
                result.innerHTML= `<h2>You score is ${scoreDisplay.innerText}</h2><button class="playagain" id="playagain">Play Again</button>`;

                var playAgainBtn = (document.getElementById('playagain'));
                console.log(playAgainBtn);
                playAgainBtn.addEventListener('click', () => {
                    main.classList.remove('xyz');
                    this.activeQuestionIndex = 0;
                    nextQuestionButtonElm.innerText = 'Next Question';
                    nextQuestion.style.display = 'none';
                    questionNumber.innerText=`QUESTION ${this.activeQuestionIndex + 1} of 10`;
                    this.questions[this.activeQuestionIndex].createUI();
                    clock();
                    scoreDisplay.innerText = 0;
                    let circle = document.querySelectorAll(".circle");
                    circle.forEach(x=> x.style.background="white");
                    clock(showAnswerOnExpiry);
                    result.innerHTML="";
                })
                return ;
            }

            this.activeQuestionIndex = this.activeQuestionIndex + 1;
            nextQuestion.style.display = 'none';
            questionNumber.innerText=`QUESTION ${this.activeQuestionIndex + 1} of 10`
            this.questions[this.activeQuestionIndex].createUI();



            

            clock(showAnswerOnExpiry); 


                 
        })

        this.questions[this.activeQuestionIndex].createUI();
    }
}

let quiz = new Quiz(processedQuestions);
// console.log()
quiz.rootUI();


function restartGame() {
    // var mainCdocument.getElementsByClassName('main');
    // main.classList.remove('xyz');
    let quiz = new Quiz(processedQuestions);
    // console.log()
    quiz.rootUI(questions, 0);

}