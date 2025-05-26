
const questions = [
  {
    q: "¿Qué es la netiqueta?",
    a: ["Un software para redes sociales", "Un tipo de contraseña", "Un conjunto de normas de comportamiento en línea", "Un filtro de seguridad"],
    correct: 2
  },
  {
    q: "¿Cuál es una norma básica de netiqueta en redes sociales?",
    a: ["Compartir información privada de otros", "Usar lenguaje ofensivo", "Respetar las opiniones ajenas", "Etiquetar a todos tus contactos"],
    correct: 2
  },
  {
    q: "¿Qué se debe evitar según las normas de netiqueta?",
    a: ["Contenido educativo", "Faltas de ortografía", "Hacer spam", "Dar créditos al autor"],
    correct: 2
  },
  {
    q: "¿Por qué es importante usar un lenguaje adecuado en redes sociales?",
    a: ["Para impresionar", "Para evitar bloqueos", "Para comunicarse respetuosamente", "Para tener más seguidores"],
    correct: 2
  },
  {
    q: "¿Qué deberías hacer antes de compartir una noticia?",
    a: ["Muchos likes", "Leer solo el título", "Verificar la fuente", "Compartir rápido"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let username = "";

function startGame() {
  username = document.getElementById("username").value;
  if (!username.trim()) return alert("Ingresa tu nombre");
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  if (currentQuestion >= questions.length) return endGame();
  document.getElementById("question-counter").textContent = `Pregunta ${currentQuestion + 1}/${questions.length}`;
  document.getElementById("timer").textContent = "20";
  document.getElementById("question").textContent = questions[currentQuestion].q;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  questions[currentQuestion].a.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = () => checkAnswer(index);
    answersDiv.appendChild(btn);
  });
  startTimer();
}

function startTimer() {
  let time = 20;
  timer = setInterval(() => {
    time--;
    document.getElementById("timer").textContent = time;
    if (time === 0) {
      clearInterval(timer);
      showFeedback(false);
    }
  }, 1000);
}

function checkAnswer(index) {
  clearInterval(timer);
  const isCorrect = index === questions[currentQuestion].correct;
  if (isCorrect) score += 5;
  showFeedback(isCorrect);
}

function showFeedback(correct) {
  const feedback = document.getElementById("feedback");
  feedback.textContent = correct ? "✔" : "✖";
  feedback.className = correct ? "correct" : "incorrect";
  feedback.classList.remove("hidden");
  const sound = document.getElementById(correct ? "correct-sound" : "wrong-sound");
  sound.play();
  setTimeout(() => {
    feedback.classList.add("hidden");
    currentQuestion++;
    loadQuestion();
  }, 1500);
}

function endGame() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
  document.getElementById("final-score").textContent = `${username}, tu puntaje fue ${score}`;
}
