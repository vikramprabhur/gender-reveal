document.getElementById("revealBtn").addEventListener("click", startCountdown);
document.getElementById("replayBtn").addEventListener("click", resetApp);

function startCountdown() {
  const button = document.getElementById("revealBtn");
  const countdown = document.getElementById("countdown");
  const result = document.getElementById("result");

  button.style.display = "none";
  result.textContent = "";
  countdown.textContent = "3";

  let timeLeft = 3;

  const timer = setInterval(() => {
    timeLeft--;
    if (timeLeft > 0) {
      countdown.style.animation = "none";
      countdown.offsetHeight;
      countdown.style.animation = "";
      countdown.textContent = timeLeft;
    } else {
      clearInterval(timer);
      countdown.textContent = "";
      document.getElementById("title").style.display = "none";
      setTimeout(() => {
        document.getElementById("replayBtn").style.display = "inline-block";
      }, 3000); // show after 3 seconds

      revealGender();
    }
  }, 1000);
}

function revealGender() {
  document.getElementById("title").style.display = "none";

  const result = document.getElementById("result");
  result.textContent = "It's a Girl! 🎀";
  result.style.color = "#ffc0cb"; // pink
  document.body.style.backgroundColor = "#ffc0cb";
  document.querySelector(".container").classList.add("reveal-border");
  launchConfetti("#ffc0cb");
}

function launchConfetti(color) {
  const container = document.querySelector(".container");

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti-piece");
    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-20px";
    confetti.style.animationDuration = Math.random() * 2 + 1 + "s";
    confetti.style.opacity = Math.random();

    container.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

function resetApp() {
  document.getElementById("revealBtn").style.display = "inline-block";
  document.getElementById("replayBtn").style.display = "none";
  document.getElementById("result").textContent = "";
  document.getElementById("countdown").textContent = "";
  document.getElementById("title").style.display = "block";
  document.body.style.backgroundColor = "#f0f0f0";
  document.querySelector(".container").classList.remove("reveal-border");
}
