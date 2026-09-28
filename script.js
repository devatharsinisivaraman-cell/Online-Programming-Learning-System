/* ==========================================
   INTERACTIVE LESSON
========================================== */

function checkAnswer(button, correct) {
    const feedback = document.getElementById("feedback");

    if (!feedback) {
        return;
    }

    if (correct) {
        button.style.borderColor = "#22a06b";
        button.style.background = "#e8f8f0";

        feedback.innerHTML = "Correct! 10 + 20 = 30.";
        feedback.style.color = "#168653";

        localStorage.setItem("lesson1Completed", "true");

        updateProgress();
    } else {
        button.style.borderColor = "#e5484d";
        button.style.background = "#fff0f0";

        feedback.innerHTML =
            "Not quite. Try again. Remember to add both values.";

        feedback.style.color = "#d12f35";
    }
}


/* ==========================================
   PROGRESS TRACKING
========================================== */

function updateProgress() {
    const completed =
        localStorage.getItem("lesson1Completed") === "true";

    const progress = completed ? 20 : 0;

    const progressBar =
        document.getElementById("progressBar");

    const progressText =
        document.getElementById("progressText");

    const overallProgress =
        document.getElementById("overallProgress");

    const completedModules =
        document.getElementById("completedModules");

    if (progressBar) {
        progressBar.style.width = progress + "%";
    }

    if (progressText) {
        progressText.innerText = progress + "%";
    }

    if (overallProgress) {
        overallProgress.innerText = progress + "%";
    }

    if (completedModules) {
        completedModules.innerText = completed ? "1" : "0";
    }
}


/* ==========================================
   QUIZ DATA
========================================== */

const questions = [
    {
        question:
            "Which keyword is used to declare an integer variable in C?",

        answers: [
            "integer",
            "int",
            "number",
            "float"
        ],

        correct: 1
    },

    {
        question:
            "Which loop is generally used when the number of iterations is known?",

        answers: [
            "if",
            "switch",
            "for",
            "break"
        ],

        correct: 2
    },

    {
        question:
            "Which symbol is used to end a statement in C?",

        answers: [
            ".",
            ":",
            ";",
            ","
        ],

        correct: 2
    },

    {
        question:
            "Which data type is used to store a single character?",

        answers: [
            "int",
            "char",
            "float",
            "double"
        ],

        correct: 1
    },

    {
        question:
            "Which function is the starting point of a C program?",

        answers: [
            "start()",
            "begin()",
            "main()",
            "run()"
        ],

        correct: 2
    }
];


/* ==========================================
   QUIZ VARIABLES
========================================== */

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;


/* ==========================================
   LOAD QUIZ QUESTION
========================================== */

function loadQuestion() {
    const questionElement =
        document.getElementById("question");

    const answersElement =
        document.getElementById("answers");

    const questionNumber =
        document.getElementById("questionNumber");

    if (!questionElement || !answersElement) {
        return;
    }

    const questionData =
        questions[currentQuestion];

    questionElement.innerText =
        questionData.question;

    if (questionNumber) {
        questionNumber.innerText =
            currentQuestion + 1;
    }

    answersElement.innerHTML = "";

    selectedAnswer = null;

    questionData.answers.forEach(
        function (answer, index) {

            const button =
                document.createElement("button");

            button.innerText = answer;

            button.className = "answer-btn";

            button.type = "button";

            button.addEventListener(
                "click",
                function () {

                    const allButtons =
                        document.querySelectorAll(
                            ".answer-btn"
                        );

                    allButtons.forEach(
                        function (btn) {
                            btn.classList.remove(
                                "selected"
                            );
                        }
                    );

                    button.classList.add("selected");

                    selectedAnswer = index;
                }
            );

            answersElement.appendChild(button);
        }
    );
}


/* ==========================================
   QUIZ NEXT BUTTON
========================================== */

const nextButton =
    document.getElementById("nextButton");

if (nextButton) {

    nextButton.addEventListener(
        "click",
        function () {

            if (selectedAnswer === null) {
                alert("Please select an answer.");
                return;
            }

            if (
                selectedAnswer ===
                questions[currentQuestion].correct
            ) {
                score++;
            }

            currentQuestion++;

            if (currentQuestion < questions.length) {

                loadQuestion();

            } else {

                const quiz =
                    document.getElementById("quiz");

                const result =
                    document.getElementById("result");

                const scoreElement =
                    document.getElementById("score");

                if (quiz) {
                    quiz.style.display = "none";
                }

                if (result) {
                    result.style.display = "block";
                }

                const percentage =
                    Math.round(
                        (score / questions.length) * 100
                    );

                if (scoreElement) {
                    scoreElement.innerText =
                        score +
                        " / " +
                        questions.length +
                        " (" +
                        percentage +
                        "%)";
                }

                localStorage.setItem(
                    "quizScore",
                    percentage
                );
            }
        }
    );
}


/* ==========================================
   SUPPORT PAGE
========================================== */

function submitQuestion() {

    const question =
        document.getElementById("userQuestion");

    const message =
        document.getElementById("questionMessage");

    if (!question || !message) {
        return;
    }

    if (question.value.trim() === "") {

        message.innerText =
            "Please enter your question.";

        message.style.color = "#d12f35";

        return;
    }

    message.innerText =
        "Your question has been submitted successfully. Our support team will review it.";

    message.style.color = "#168653";

    question.value = "";
}


/* ==========================================
   FINAL ASSESSMENT
========================================== */

function startFinalTest() {

    const container =
        document.getElementById("finalQuestions");

    if (!container) {
        return;
    }

    container.innerHTML = `
        <div class="activity-box">

            <h2>Sample Final Assessment</h2>

            <p>
                What is the output of the following program?
            </p>

            <div class="code-box">
                <pre>
int a = 5;
int b = 10;

printf("%d", a + b);
                </pre>
            </div>

            <div class="options">

                <button
                    type="button"
                    onclick="finalAnswer(false)">
                    5
                </button>

                <button
                    type="button"
                    onclick="finalAnswer(false)">
                    10
                </button>

                <button
                    type="button"
                    onclick="finalAnswer(true)">
                    15
                </button>

                <button
                    type="button"
                    onclick="finalAnswer(false)">
                    510
                </button>

            </div>

            <p id="finalFeedback"></p>

        </div>
    `;
}


/* ==========================================
   FINAL ASSESSMENT ANSWER
========================================== */

function finalAnswer(correct) {

    const feedback =
        document.getElementById("finalFeedback");

    if (!feedback) {
        return;
    }

    if (correct) {

        feedback.innerText =
            "Correct! The output is 15.";

        feedback.style.color =
            "#168653";

    } else {

        feedback.innerText =
            "Incorrect. Please try again.";

        feedback.style.color =
            "#d12f35";
    }
}


/* ==========================================
   INITIALIZE PAGE
========================================== */

updateProgress();

loadQuestion();