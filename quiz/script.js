document.addEventListener("DOMContentLoaded", function () {
  console.log("hii");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUser = null;
  let currentQuestionIndex = 0;
  let quizAnswers = [];
  console.log(quizAnswers, "This");

  const questions = [
    {
      category: "Science",
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: 2,
    },
    {
      category: "History",
      question: "Who was the first President of the United States?",
      options: [
        "Abraham Lincoln",
        "George Washington",
        "Thomas Jefferson",
        "John Adams",
      ],
      answer: 1,
    },
    {
      category: "History",
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: 1,
    },
    {
      category: "History",
      question: "What is the largest planet in our solar system?",
      options: ["Mars", "Saturn", "Jupiter", "Neptune"],
      answer: 2,
    },
    {
      category: "History",
      question: "Which country won the FIFA World Cup in 2018?",
      options: ["Brazil", "Germany", "France", "Argentina"],
      answer: 2,
    },
    {
      category: "History",
      question: "What is the tallest mountain in the world?",
      options: ["Mount Everest", "K2", "Kangchenjunga", "Makalu"],
      answer: 0,
    },
    {
      category: "History",
      question: "Which is the largest ocean on Earth?",
      options: [
        "Pacific Ocean",
        "Indian Ocean",
        "Atlantic Ocean",
        "Arctic Ocean",
      ],
      answer: 0,
    },
    {
      category: "History",
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Cu", "Fe"],
      answer: 0,
    },
    {
      category: "History",
      question: "Who painted the Mona Lisa?",
      options: [
        "Pablo Picasso",
        "Vincent van Gogh",
        "Leonardo da Vinci",
        "Michelangelo",
      ],
      answer: 2,
    },
    {
      category: "History",
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Mercury", "Uranus"],
      answer: 0,
    },
    {
      category: "History",
      question: "What is the largest species of shark?",
      options: [
        "Great White Shark",
        "Whale Shark",
        "Tiger Shark",
        "Hammerhead Shark",
      ],
      answer: 1,
    },
    {
      category: "History",
      question: "Which animal is known as the King of the Jungle?",
      options: ["Lion", "Tiger", "Elephant", "Giraffe"],
      answer: 0,
    },
  ];

  function showTab(tab) {
    document.getElementById("login-form").style.display =
      tab === "login" ? "block" : "none";
    document.getElementById("register-form").style.display =
      tab === "register" ? "block" : "none";
    tab === "login"
      ? document.getElementById(`${tab}-tab`).classList.add("active")
      : document.getElementById(`${tab}-tab`).classList.add("active");
    tab === "login"
      ? document.getElementById(`register-tab`).classList.remove("active")
      : document.getElementById(`login-tab`).classList.remove("active");
  }

  function register() {
    const username = document.getElementById("reg-username").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const phone = document.getElementById("reg-phone").value;

    // agar same user duabara aaye
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      alert("User already present with this email!");
      return;
    }

    users.push({ username, email, password, phone, scores: [] });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
  }

  function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    currentUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (currentUser) {
      document.getElementById("auth-section").classList.add("hidden");
      document.getElementById("home-section").classList.remove("hidden");
      document.getElementById("user-name").textContent = currentUser.username;
      document.getElementById("user-email").textContent = currentUser.email;
      document.getElementById("user-phone").textContent = currentUser.phone;
    } else {
      alert("Login failed!");
    }
  }

  let timer;
  let timeRemaining = 30;

  function startQuiz() {
    currentQuestionIndex = 0;
    quizAnswers = [];
    timeRemaining = 30;
    document.getElementById("home-section").classList.add("hidden");
    document.getElementById("quiz-section").classList.remove("hidden");
    startTimer();
    showQuestion();
  }

  function startTimer() {
    timer = setInterval(() => {
      timeRemaining--;
      document.getElementById("timer").textContent = `Time Left: ${formatTime(
        timeRemaining
      )}`;

      if (timeRemaining <= 0) {
        clearInterval(timer);
        // alert("Time's up! Submitting the quiz automatically.");
        submitQuiz();
      }
    }, 1000);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function submitQuiz() {
    console.log(quizAnswers, "This");
    clearInterval(timer);
    let correct = 0;
    questions.forEach((q, index) => {
      if (quizAnswers[index] === q.answer) {
        correct++;
      }
    });
    console.log(quizAnswers, "This");
    console.log(correct);
    const score = (correct / questions.length) * 100;
    currentUser.scores.push(score);
    localStorage.setItem("users", JSON.stringify(users));
    showResult(score, correct, questions.length - correct);

    setTimeout(() => {
      document.getElementById("quiz-section").classList.add("hidden");
      document.getElementById("home-section").classList.remove("hidden");
    }, 3000);
  }

  // function startQuiz() {
  //   currentQuestionIndex = 0;
  //   quizAnswers = [];
  //   document.getElementById("home-section").classList.add("hidden");
  //   document.getElementById("quiz-section").classList.remove("hidden");
  //   showQuestion();
  // }

  function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question-category").textContent =
      question.category;
    document.getElementById("question-text").textContent = question.question;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    question.options.forEach((option, index) => {
      const div = document.createElement("div");
      div.textContent = option;
      div.classList.add("option");
      div.onclick = () => selectAnswer(index, div);
      if (quizAnswers[currentQuestionIndex] === index) {
        div.classList.add("selected");
      }
      optionsDiv.appendChild(div);
      console.log(quizAnswers, "This");
    });
  }

  function selectAnswer(index, div) {
    quizAnswers[currentQuestionIndex] = index;
    document
      .querySelectorAll(".option")
      .forEach((option) => option.classList.remove("selected"));
    div.classList.add("selected");
  }

  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
    }
  }

  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion();
    }
  }

  // function submitQuiz() {
  //   let correct = 0;
  //   questions.forEach((q, index) => {
  //     if (quizAnswers[index] === q.answer) {
  //       correct++;
  //     }
  //   });

  //   const score = (correct / questions.length) * 100;
  //   currentUser.scores.push(score);
  //   localStorage.setItem("users", JSON.stringify(users));
  //   showResult(score, correct, questions.length - correct);

  //   // Redirect to the homepage after showing the result
  //   setTimeout(() => {
  //     document.getElementById("quiz-section").classList.add("hidden");
  //     document.getElementById("home-section").classList.remove("hidden");
  //   }, 3000);
  // }

  function showResult(score, correct, wrong) {
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `<p>Score: ${score.toFixed(2)}%</p>
        <p>Correct Answers: ${correct}</p>
        <p>Wrong Answers: ${wrong}</p>`;
    document.getElementById("modal").classList.remove("hidden");
  }

  function showSummary() {
    if (!currentUser.scores.length) {
      alert("Please play the quiz first.");
      return;
    }
    const highest = Math.max(...currentUser.scores);
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `<p>Highest Score: ${highest}%</p>
        <p>Attempts: ${currentUser.scores.length}</p>`;
    document.getElementById("modal").classList.remove("hidden");
  }

  function showAllSummary() {
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML =
      `<table border="1">
      <thead>
        <tr>
          <th>User</th>
          <th>Scores</th>
        </tr>
     </thead>
    <tbody>` +
      users
        .map(
          (user) =>
            `<tr onclick="showUserDetails('${user.email}')"><td>${
              user.username
            }</td>
          <<td>${
            Array.isArray(user.scores) ? user.scores.join(", ") : "No attempts"
          }</td></tr>`
        )
        .join("") +
      `</tbody></table>`;
    document.getElementById("modal").classList.remove("hidden");
  }

  function showUserDetails(email) {
    const user = users.find((u) => u.email === email);
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `<p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <p>Phone: ${user.phone}</p>
        <p>Scores: ${user.scores.join(", ") || "No attempts"}</p>`;
  }

  function closeModal() {
    document.getElementById("modal").classList.add("hidden");
  }

  showTab("login");
});
