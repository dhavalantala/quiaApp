# 🎯 Quiz Challenge App

A dynamic, browser-based quiz application built with vanilla HTML, CSS, and JavaScript. Questions are randomly selected from a pool of 1000 so every game feels fresh.

🔗 **Live Demo:** [https://dhavalantala.github.io/quiaApp/](https://dhavalantala.github.io/quiaApp/)

---

## 📸 Preview

| Start Screen | Quiz in Progress | Score Screen |
|---|---|---|
| Start button centered on a deep-space gradient | Question + 10 (You can change) animated choices + pulsing timer | Final score with Play Again option |

---

## 📁 Project Structure

```
quizApp/
├── index.html       # App markup & layout
├── style.css        # Deep-space theme with animations
├── script.js        # Game logic, timer, shuffle, fetch
└── quiz.json        # Question bank (1000 questions)
```

---

## ✨ Features

- **1000-question bank** — loaded dynamically from `quiz.json` via `fetch()`
- **No repeated questions** — Fisher-Yates shuffle picks 10 unique questions every session
- **15-second countdown timer** — pulsing red circle; auto-restarts or exits on timeout
- **Animated choices** — each option fades in with a staggered slide-up animation
- **Single-selection enforcement** — only one answer can be selected at a time
- **Instant feedback alerts** — green for correct, dismisses after 2 seconds
- **Score card** — displays final result and lets the player restart
- **Fully responsive** — adapts to mobile screens under 600px

---

## 🚀 Getting Started

### Run Locally

No build tools or dependencies required — just a browser and a local server.

```bash
# Clone the repository
git clone https://github.com/dhavalantala/quiaApp.git
cd quiaApp

# Option 1 — VS Code Live Server extension (recommended)
# Right-click index.html → Open with Live Server

# Option 2 — Python
python -m http.server 8000
# Then visit http://localhost:8000

# Option 3 — Node.js
npx serve .
```

> ⚠️ Opening `index.html` directly via `file://` will fail because `fetch()` is blocked by CORS in that context. Always use a local server.

---

## 🗂️ quiz.json Format

Each question in the array follows this structure:

```json
[
  {
    "question": "Which planet has the most known moons?",
    "choices": ["Jupiter", "Saturn", "Uranus", "Neptune"],
    "answer": "Saturn"
  }
]
```

| Field | Type | Description |
|---|---|---|
| `question` | `string` | The question text displayed to the player |
| `choices` | `string[]` | Array of exactly 4 answer options |
| `answer` | `string` | Must match one of the choices exactly (case-sensitive) |

---

## ⚙️ How It Works

### Question Shuffle (No Repetition)

On every new game, `startQuiz()` fetches all 1000 questions, then `shuffleQuestions()` applies a Fisher-Yates shuffle and slices the first 10:

```js
// Shuffle full pool, then take first 10
remainingQuestions = [...quiz];
for (let i = remainingQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remainingQuestions[i], remainingQuestions[j]] = [remainingQuestions[j], remainingQuestions[i]];
}
quiz = remainingQuestions.slice(0, 10);
```

To change questions per session, edit the `slice(0, 10)` value in `script.js`.

### Timer Logic

- Starts at 15 seconds for each question
- `setInterval` runs every 1000ms and decrements `timeLeft`
- Previous interval is always cleared with `clearInterval` before starting a new one to prevent overlapping countdowns
- On timeout, a confirm dialog offers to restart or exit

### Answer Checking

Answers are compared with `.trim()` to safely handle any accidental whitespace in the JSON:

```js
if (selectedChoice.textContent.trim() === quiz[currentQuestionIndex].answer.trim())
```

---

## 🎨 Styling Highlights

| Element | Style |
|---|---|
| Background | 3-stop diagonal gradient (`#0f0c29 → #302b63 → #24243e`) |
| Container | Glassmorphism — `rgba` background + `backdrop-filter: blur` |
| Choices | Hover glow + purple gradient on selection |
| Timer | Pulsing red circle with `box-shadow` glow |
| Alert | Fixed top banner, green for correct / red for wrong |
| Animations | `fade-in` with staggered `animation-delay` per choice |

---

## 🛠️ Customisation

| What to change | Where |
|---|---|
| Questions per game | `script.js` → `slice(0, 10)` |
| Time per question | `script.js` → `timeLeft = 15` |
| Quiz title | `index.html` → `<h1>` text |
| Colour theme | `style.css` → gradient and `--accent` values |
| Question bank | `quiz.json` → add/edit objects in the array |

---

## 🌐 Deployment

The app is deployed via **GitHub Pages**.

To deploy your own fork:

1. Push your code to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Your app will be live at `https://<username>.github.io/<repo-name>/`

---

## 🧰 Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure and semantic markup |
| CSS3 | Animations, glassmorphism, responsive layout |
| Vanilla JavaScript (ES6+) | Game logic, async fetch, DOM manipulation |
| JSON | Question data storage |
| GitHub Pages | Static site hosting |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
