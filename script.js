const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

// Quiz Data Array
let quiz = []

// App State Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Display Questions (From Part 1)
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        // Fixed: Enforces a single selection instead of multi-toggling
        choiceDiv.addEventListener('click', () => {
            const allChoices = choicesBox.querySelectorAll('.choice');
            allChoices.forEach(choice => choice.classList.remove('selected'));
            choiceDiv.classList.add('selected');
        });
    }

    if (currentQuestionIndex < quiz.length) {
        startTimer();
    }
};

// Check Answers (From Part 1)
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');

    // Fixed: Safe value checking using .trim() to bypass hidden array spaces
    if (selectedChoice.textContent.trim() === quiz[currentQuestionIndex].answer.trim()) {
        displayAlert("Correct Answer!");
        score++;
    } else {
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }

    stopTimer(); // Halt active countdown before switching state
    timeLeft = 15;
    currentQuestionIndex++;

    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    } else {
        showScore();
    }
};

// Function to show score (From Part 2)
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
};

// Function to Show Alert (From Part 2)
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);
};

// Function to Start Timer (From Part 2)
const startTimer = () => {
    clearInterval(timerID); // Wipe out overlapping intervals 
    timer.textContent = timeLeft;

    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;

        if (timeLeft === 0) {
            stopTimer(); // Fixed: Must stop interval execution before showing confirm box!

            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again?");
            if (confirmUser) {
                startQuiz();
            } else {
                startBtn.style.display = "block";
                container.style.display = "none";
            }
        }
    };
    timerID = setInterval(countDown, 1000);
};

// Function to Stop Timer (From Part 2)
const stopTimer = () => {
    clearInterval(timerID);
};

// Function to shuffle question (From Part 2)
const shuffleQuestions = () => {

    remainingQuestions = [...quiz];

    for (let i = remainingQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingQuestions[i], remainingQuestions[j]] = [remainingQuestions[j], remainingQuestions[i]];
    }

    quiz = remainingQuestions.slice(0, 10);
    currentQuestionIndex = 0;
    showQuestions();
};

// Update startQuiz to fetch the JSON file dynamically
const startQuiz = async () => {
    try {
        // Fetch the data from your local file
        const response = await fetch('quiz.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Save the parsed data to your quiz variable
        quiz = await response.json();
        remainingQuestions = [];

        // Now that data is safely loaded, start the game
        timeLeft = 15;
        score = 0;
        quizOver = false;
        scoreCard.textContent = "";
        timer.style.display = "flex";
        shuffleQuestions();

    } catch (error) {
        console.error("Could not fetch quiz data:", error);
        displayAlert("Failed to load quiz questions!");
    }
};


// Adding Event Listener to Start Button (From Part 2)
startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

// Next Button Controller (From Part 2)
nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');

    if (!selectedChoice && !quizOver) {
        displayAlert("Select your answer");
        return;
    }

    if (quizOver) {
        nextBtn.textContent = "Next";
        startQuiz();
    } else {
        checkAnswer();
    }
});
