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
      }, 10000);

      revealGender();
    }
  }, 1000);
}

async function revealGender() {
  document.getElementById("title").style.display = "none";
  const bgMusic = document.getElementById("bgMusic");

try {
  // Ensure music starts only on interaction
  bgMusic.volume = 1;
  await bgMusic.play();

  // Fade out and stop after 15s
  setTimeout(() => {
    const fadeInterval = setInterval(() => {
      if (bgMusic.volume > 0.05) {
        bgMusic.volume -= 0.05;
      } else {
        bgMusic.volume = 0;
        bgMusic.pause();
        bgMusic.currentTime = 0;
        clearInterval(fadeInterval);
      }
    }, 200); 
  }, 12000); 
} catch (err) {
  console.warn("Audio playback failed or was blocked by browser:", err);
}

  const result = document.getElementById("result");
  result.textContent = "It's a Girl! 🎀";
  result.style.color = "#ffc0cb"; // pink
  result.style.animation = "none";
  result.offsetHeight;
  result.style.animation = "pulseText 0.6s ease-in-out 2";
  document.body.style.backgroundColor = "#ffc0cb";
  document.querySelector(".container").classList.add("reveal-border");
  launchBalloons();
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
    }, 10000);
  }
}

function launchBalloons() {
  const container = document.querySelector(".container");
  const colors = [
    "#ffc0cb",
    "#ffb6c1",
    "#f08080",
    "#e75480",
    "#ff69b4",
    "#db3e4d",
    "#ff6f61",
    "#ff4d6d",
    "#fcd253",
    "#f9c80e",
  ];

  for (let i = 0; i < 14; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    // Color
    const color = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.backgroundColor = color;

    // Size
    const size = Math.floor(Math.random() * 20) + 35;
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size * 1.5}px`;

    // Position
    balloon.style.left = Math.random() * 90 + "%";

    // Float + sway timings
    const floatTime = (Math.random() * 3 + 5).toFixed(2) + "s"; 
    balloon.style.setProperty("--float-time", floatTime);

    const swayLeft = `${Math.floor(Math.random() * -20) - 10}px`;
    const swayRight = `${Math.floor(Math.random() * 20) + 10}px`;
    balloon.style.setProperty("--sway-left", swayLeft);
    balloon.style.setProperty("--sway-right", swayRight);

    container.appendChild(balloon);

    // Remove after animation
    setTimeout(() => {
      balloon.remove();
    }, parseFloat(floatTime) * 1000 + 1000);
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
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.pause();
  bgMusic.currentTime = 0;
  bgMusic.volume = 1;
}
