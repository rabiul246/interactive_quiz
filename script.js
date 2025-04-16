  const questions = [
    {
      question: "What is DOM?",
      answers: [
        "Document Object Management",
        "Data Object Model",
        "Document Object Model",
        "Desktop Oriented Module"
      ],
      correct: 2
    },
    {
      question: "Which language runs in a web browser?",
      answers: ["Java", "C", "Python", "JavaScript"],
      correct: 3
    },
    {
      question: "What does CSS stand for?",
      answers: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
      correct: 1
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const questionEl = document.getElementById('question');
  const answersEl = document.getElementById('answers');
  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');
  const resultEl = document.getElementById('result');
  const restartBtn = document.getElementById('restart-btn');

  function loadQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    answersEl.innerHTML = '';
    nextBtn.classList.add('hidden');
    submitBtn.classList.add('hidden');

    q.answers.forEach((answer, index) => {
      const btn = document.createElement('button');
      btn.textContent = answer;
      btn.className = "w-full text-left px-4 py-2 border rounded hover:bg-blue-100";
      btn.addEventListener('click', () => selectAnswer(index, btn));
      answersEl.appendChild(btn);
    });
  }

  function selectAnswer(index, selectedBtn) {
    const correctIndex = questions[currentQuestion].correct;
    if (index === correctIndex) {
      score++;
    }

    // Blue highlight
    Array.from(answersEl.children).forEach(btn => {
      btn.classList.remove('bg-blue-500', 'text-white', 'opacity-50');
      btn.disabled = true;
    });
    selectedBtn.classList.add('bg-blue-500', 'text-white');

    if (currentQuestion < questions.length - 1) {
      nextBtn.classList.remove('hidden');
    } else {
      submitBtn.classList.remove('hidden');
    }
  }

  nextBtn.addEventListener('click', () => {
    currentQuestion++;
    loadQuestion();
  });

  submitBtn.addEventListener('click', () => {
    questionEl.style.display = 'none';
    answersEl.style.display = 'none';
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'none';
    resultEl.textContent = `Your score is ${score} out of ${questions.length}`;
    restartBtn.classList.remove('hidden');
  });

  restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    resultEl.textContent = '';
    questionEl.style.display = 'block';
    answersEl.style.display = 'block';
    restartBtn.classList.add('hidden');
    loadQuestion();
  });

  // Initialize
  loadQuestion();