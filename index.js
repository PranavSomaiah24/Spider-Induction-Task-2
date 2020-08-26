let currentQuestion, noAnswered, score;
let correctSound = new Audio("Ding-sound-effect.mp3");
let question = document.getElementById("question");

function startQuiz() {
  currentQuestion = 0;
  noAnswered = 0;
  score = 0;
  questionList = JSON.parse(JSON.stringify(questions));
  console.log(questionList);
  showQuestion(questionList[currentQuestion]);
}

function clearOptions() {
  let element = document
      .getElementById("option-btns")
      .getElementsByTagName("button"),
    index;
  question.style.display = "none";
  for (index = element.length - 1; index >= 0; index--) {
    element[index].parentNode.removeChild(element[index]);
  }
}

function showQuestion(questionData) {
  quizDisplay("block", "grid");
  clearOptions();
  question.style.display = "block";
  question.innerHTML = "Q. " + questionData.question;
  let i = 1;
  questionData.options.forEach((element) => {
    let btn = document.createElement("button");
    btn.innerHTML = element.string;
    btn.classList.add("option-btn");
    btn.dataset.no = i;
    if (!questionData.isAnswered) {
      btn.addEventListener("click", checkOption);
    }
    if (questionData.options[i - 1].isSelected) {
      if (questionData.options[i - 1].correct) {
        btn.style.backgroundColor = "green";
        btn.style.color = "white";
      } else {
        btn.style.backgroundColor = "red";
        btn.style.color = "white";
      }
    }
    i++;
    document.getElementById("option-btns").appendChild(btn);
  });
}

function checkOption() {
  optionNo = this.dataset.no;

  if (!questionList[currentQuestion].isAnswered) {
    noAnswered++;
    questionList[currentQuestion].isAnswered = true;
    questionList[currentQuestion].options[optionNo - 1].isSelected = true;
    if (questionList[currentQuestion].options[optionNo - 1].correct) {
      correctSound.play();
      overlayDisplay("green", "CORRECT");
      this.style.backgroundColor = "green";
      this.style.color = "white";
      score++;
    } else {
      overlayDisplay("red", "WRONG");
      this.style.backgroundColor = "red";
      this.style.color = "white";
    }
  }
}

function scoreDisplay() {
  result = document.getElementById("scoreDisplay");
  result.innerHTML = "Your Scored " + score + " out of 5";
  result.classList.add("fadeIn");
  result.style.display = "block";
  restartBtn.style.display = "block";
}
function overlayDisplay(colour, text) {
  let overlay = document.getElementById("overlay");
  overlay.innerHTML = text;
  overlay.style.backgroundColor = colour;
  overlay.style.display = "flex";
  overlay.classList.add("fadeOut");
  setTimeout(() => {
    overlay.style.display = "none";
  }, 1000);
}

function playAudio(src) {
  new Audio(src).play();
}
function quizDisplay(str1, str2) {
  question.style.display = str1;
  document.getElementById("option-btns").style.display = str2;
  document.getElementById("control-btns").style.display = str1;
}
let questionList,
  questions = [
    {
      question: "What are the common symptoms of COVID-19?",
      isAnswered: false,
      options: [
        {
          string: "Fever",
          correct: false,
          isSelected: false,
        },
        {
          string: "Fatigue",
          correct: false,
          isSelected: false,
        },
        {
          string: "A new and continuous cough",
          correct: false,
          isSelected: false,
        },
        {
          string: "All 3 are correct",
          correct: true,
          isSelected: false,
        },
      ],
    },
    {
      question: "There are currently vaccines for the following coronaviruses:",
      isAnswered: false,
      options: [
        {
          string: "SARS",
          correct: false,
          isSelected: false,
        },
        {
          string: "MERS",
          correct: false,
          isSelected: false,
        },
        {
          string: "SARS and MERS",
          correct: false,
          isSelected: false,
        },
        {
          string: "None of the 3",
          correct: true,
          isSelected: false,
        },
      ],
    },
    {
      question: "What does COVID-19 stand for?",
      isAnswered: false,
      options: [
        {
          string:
            "It's a term for Coronavirus Disease 19, because it's the 19th strain of coronavirus discovered",
          correct: false,
        },
        {
          string:
            "It's a term that stands for Coronavirus Disease 2019, the year it was first identified.",
          correct: true,
        },
      ],
    },
    {
      question: "How long does the novel coronavirus survive outside the body?",
      isAnswered: false,
      options: [
        {
          string: "A week in the air and on surfaces",
          correct: false,
        },
        {
          string: "Two and a half weeks",
          correct: false,
        },
        {
          string: "Several hours to days",
          correct: true,
        },
        {
          string: "Cannot survive outside the body",
          correct: false,
        },
      ],
    },
    {
      question: "What’s more important for preventing infection?",
      isAnswered: false,
      options: [
        {
          string: "Frequent hand-washing",
          correct: true,
        },
        {
          string: "Wearing a face mask",
          correct: false,
        },
      ],
    },
  ];
let restartBtn = document.getElementById("restart-btn"),
  nextBtn = document.getElementById("next-btn"),
  prevBtn = document.getElementById("prev-btn"),
  strtBtn = document.getElementById("strt-btn");
nextBtn.addEventListener("click", () => {
  if (currentQuestion + 1 != questionList.length) {
    console.log(currentQuestion);
    currentQuestion++;
    showQuestion(questionList[currentQuestion]);
  }
  if (noAnswered == questionList.length) {
    clearOptions();
    scoreDisplay();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion != 0) {
    currentQuestion--;
    showQuestion(questionList[currentQuestion]);
  }
});

strtBtn.addEventListener("click", () => {
  strtBtn.style.display = "none";
  startQuiz();
});

restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  document.getElementById("scoreDisplay").style.display = "none";
  clearOptions();
  startQuiz();
});
quizDisplay("none", "none");
