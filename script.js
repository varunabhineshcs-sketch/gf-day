/* ============================================
   Girlfriend's Day – Premium Interactive Script
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- AOS Init ----------
  AOS.init({
    duration: 900,
    once: true,
    offset: 80,
  });

  // ---------- Typing Animation ----------
  new Typed("#typed-title", {
    strings: [
      "Happy Girlfriend's Day ❤️",
      "You mean the world to me🌎👸",
      "Forever & Always 💕🔒",
    ],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 2200,
    startDelay: 400,
    loop: true,
    showCursor: true,
    cursorChar: "|",
  });

  // ---------- Confetti on Load ----------
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.6 },
    colors: ["#ff6b9d", "#c44dff", "#ff8fab", "#ffffff", "#ff4d6d"],
  });

  // Second burst for extra magic
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 70,
      origin: { x: 0 },
      colors: ["#ff6b9d", "#c44dff", "#ffffff"],
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 70,
      origin: { x: 1 },
      colors: ["#ff6b9d", "#c44dff", "#ffffff"],
    });
  }, 400);

  // ---------- Floating Hearts ----------
  const heartsContainer = document.getElementById("hearts-container");
  const heartSymbols = ["❤️", "💕", "💗", "💖", "💘"];

  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 0.8 + Math.random() * 1.4 + "rem";
    heart.style.animationDuration = 8 + Math.random() * 10 + "s";
    heart.style.animationDelay = Math.random() * 2 + "s";
    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 18000);
  }

  setInterval(createHeart, 600);

  // ---------- Falling Rose Petals ----------
  const petalsContainer = document.getElementById("petals-container");

  function createPetal() {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 7 + Math.random() * 8 + "s";
    petal.style.animationDelay = Math.random() * 3 + "s";
    petal.style.width = 8 + Math.random() * 10 + "px";
    petal.style.height = petal.style.width;
    petalsContainer.appendChild(petal);

    setTimeout(() => petal.remove(), 16000);
  }

  setInterval(createPetal, 350);

  // ---------- Mouse Sparkle Effect ----------
  const canvas = document.getElementById("sparkle-canvas");
  const ctx = canvas.getContext("2d");
  let sparks = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Spark {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 3;
      this.speedY = (Math.random() - 0.5) * 3;
      this.life = 1;
      this.decay = 0.02 + Math.random() * 0.03;
      this.color = `hsl(${320 + Math.random() * 40}, 90%, 70%)`;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= this.decay;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  window.addEventListener("mousemove", (e) => {
    for (let i = 0; i < 3; i++) {
      sparks.push(new Spark(e.clientX, e.clientY));
    }
  });

  function animateSparks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparks = sparks.filter((s) => s.life > 0);
    sparks.forEach((s) => {
      s.update();
      s.draw();
    });
    requestAnimationFrame(animateSparks);
  }
  animateSparks();

  // ---------- Days Together Counter ----------
  // REPLACE this date with the day you started dating (YYYY-MM-DD)
  const startDate = new Date("2023-02-28");
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const counterEl = document.getElementById("days-counter");
  let current = 0;
  const duration = 1800;
  const stepTime = Math.max(Math.floor(duration / diffDays), 10);

  const timer = setInterval(() => {
    current += Math.ceil(diffDays / (duration / stepTime));
    if (current >= diffDays) {
      current = diffDays;
      clearInterval(timer);
    }
    counterEl.textContent = current.toString().padStart(3, "0");
  }, stepTime);

  // ---------- Love Letter Modal ----------
  const openBtn = document.getElementById("open-letter-btn");
  const closeBtn = document.getElementById("close-letter");
  const modal = document.getElementById("letter-modal");

  openBtn.addEventListener("click", () => {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  // ---------- Background Music ----------
  const musicBtn = document.getElementById("music-btn");
  const music = document.getElementById("bg-music");
  let isPlaying = false;

  musicBtn.addEventListener("click", () => {
    if (isPlaying) {
      music.pause();
      musicBtn.classList.remove("playing");
      musicBtn.innerHTML = '<i class="fas fa-music"></i>';
    } else {
      music.play().catch(() => {});
      musicBtn.classList.add("playing");
      musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
  });
});