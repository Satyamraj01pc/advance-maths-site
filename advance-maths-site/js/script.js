// ========== Load Google Fonts ==========
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Fugaz+One&family=Orbitron:wght@600&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// ========== Apply Fonts ==========
fontLink.onload = () => {
  document.querySelectorAll("section h2").forEach(h2 => {
    h2.style.fontFamily = "'Fugaz One', cursive";
    h2.style.letterSpacing = "2px";
  });

  document.querySelectorAll("section li a").forEach(a => {
    a.style.fontFamily = "'Montserrat', sans-serif";
    a.style.fontWeight = "700";
  });

  const header = document.querySelector("header");
  if (header) {
    header.style.fontFamily = "'Orbitron', sans-serif";
    header.style.letterSpacing = "3px";
  }
};

// ========== Greeting Based on Time ==========
function setGreeting() {
  const greeting = document.getElementById("greeting");
  if (!greeting) return;

  const hour = new Date().getHours();
  let msg = "Welcome!";
  if (hour < 12) msg = "🌅 Good Morning, Learner!";
  else if (hour < 18) msg = "🌞 Good Afternoon, Learner!";
  else msg = "🌙 Good Evening, Learner!";

  greeting.textContent = msg;
}
setGreeting();

// ========== Fade Animation on Scroll ==========
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-visible");
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll("section").forEach(sec => observer.observe(sec));

// ========== Floating Bubbles Background ==========
function createBubble() {
  const bubble = document.createElement("span");
  bubble.classList.add("bubble");
  document.body.appendChild(bubble);

  const size = Math.random() * 40 + 10 + "px";
  bubble.style.width = size;
  bubble.style.height = size;
  bubble.style.left = Math.random() * window.innerWidth + "px";
  bubble.style.background = `hsla(${Math.random() * 360}, 70%, 70%, 0.3)`;

  setTimeout(() => bubble.remove(), 6000);
}
setInterval(createBubble, 600);

// Add bubble CSS dynamically
const bubbleStyle = document.createElement("style");
bubbleStyle.textContent = `
  .bubble {
    position: fixed;
    bottom: -50px;
    border-radius: 50%;
    animation: rise 6s linear forwards;
    z-index: 0;
  }
  @keyframes rise {
    from { transform: translateY(0) scale(1); opacity: 0.7; }
    to { transform: translateY(-110vh) scale(1.5); opacity: 0; }
  }
  .fade-in-visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
    transition: all 1s ease;
  }
`;
document.head.appendChild(bubbleStyle);

// ========== Tooltip on Chapters ==========
document.querySelectorAll("section li a").forEach(a => {
  a.setAttribute("title", "📘 Open " + a.textContent);
});

// ========== Random Highlight ==========
setInterval(() => {
  const links = document.querySelectorAll("section li a");
  if (links.length === 0) return;
  const randomLink = links[Math.floor(Math.random() * links.length)];
  randomLink.style.transition = "all 0.6s ease";
  randomLink.style.transform = "scale(1.2)";
  randomLink.style.boxShadow = "0 0 25px rgba(255,255,255,0.9)";
  setTimeout(() => {
    randomLink.style.transform = "";
    randomLink.style.boxShadow = "";
  }, 1000);
}, 4000);

// ========== Scroll To Top Button ==========
const topBtn = document.createElement("button");
topBtn.textContent = "⬆ Top";
Object.assign(topBtn.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  padding: "10px 15px",
  border: "none",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #24c6dc, #514a9d)",
  color: "#fff",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  display: "none",
  zIndex: "1000"
});
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) topBtn.style.display = "block";
  else topBtn.style.display = "none";
});
topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ========== Dark/Light Mode Toggle ==========
const toggleBtn = document.createElement("button");
toggleBtn.textContent = "🌙 Dark Mode";
Object.assign(toggleBtn.style, {
  position: "fixed",
  top: "20px",
  right: "20px",
  padding: "8px 12px",
  border: "none",
  borderRadius: "8px",
  background: "linear-gradient(135deg, #ff512f, #dd2476)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
  zIndex: "1000"
});
document.body.appendChild(toggleBtn);

let darkMode = false;
toggleBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.style.background = darkMode
    ? "linear-gradient(135deg, #141E30, #243B55)"
    : "";
  document.body.style.color = darkMode ? "#eee" : "";
  toggleBtn.textContent = darkMode ? "☀ Light Mode" : "🌙 Dark Mode";
});

// ========== Welcome Popup ==========
window.addEventListener("load", () => {
  const popup = document.createElement("div");
  popup.textContent = "🎉 Welcome to Your Learning Site 🎉";
  Object.assign(popup.style, {
    position: "fixed",
    top: "20%",
    left: "50%",
    transform: "translateX(-50%)",
    background: "linear-gradient(90deg, #24c6dc, #514a9d)",
    color: "#fff",
    padding: "20px 30px",
    borderRadius: "15px",
    fontSize: "20px",
    fontWeight: "bold",
    zIndex: "2000",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    opacity: "0",
    transition: "opacity 1s ease"
  });
  document.body.appendChild(popup);
  setTimeout(() => (popup.style.opacity = "1"), 200);
  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => popup.remove(), 1000);
  }, 4000);
});