# AI Banking POC — Frontend

> Production-style React banking app powered by a private Node.js/Express backend — demonstrating 6 AI/ML engineering patterns including GPT streaming, conversation memory, ML regression, structured JSON output, parallel completions, and response caching.

[![Live Demo](https://img.shields.io/badge/live-demo-00d4aa?style=flat-square)](https://kirti.github.io/ai-banking-poc-frontend/)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![GPT-4o-mini](https://img.shields.io/badge/GPT--4o--mini-OpenAI-412991?style=flat-square)](https://openai.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-64748b?style=flat-square)](LICENSE)

---

## Live Demo

👉 **[kirti.github.io/ai-banking-poc-frontend](https://kirti.github.io/ai-banking-poc-frontend/)**

---

## Architecture

This project uses a **public frontend + private backend** pattern — a common production setup where business logic, API keys, and ML models live in a secured backend service.

```
Browser (React)
      │
      │  REST + SSE streaming
      ▼
Private Backend (Node.js/Express)     ← deployed on Render
      │
      ├── OpenAI GPT-4o-mini API      ← spending advice, chat, product recs
      ├── SimpleLinearRegression      ← spending prediction (ml-regression)
      ├── Response cache (JSON)       ← n:5 parallel completions, cached
      └── Conversation history        ← multi-turn memory per session
```

**Why private backend?**
- API keys (OpenAI) never exposed to the browser
- ML model logic and prompt engineering kept secure
- Caching layer prevents unnecessary API costs
- Production pattern used in real fintech applications

---

## What Each Component Does

### SpendingChart — ML Regression + GPT Streaming
The backend runs `SimpleLinearRegression` on 5 months of spending history to predict next month's spend. GPT-4o-mini then generates personalised financial advice — streamed token by token via SSE so the user sees it appear live rather than waiting for a full response.

**Backend endpoints used:**
- `GET /api/spending-history` — fetches 5-month history
- `POST /api/spending-prediction` — ML prediction + cached GPT advice (`n:5`)
- `POST /api/spending-advice-stream` — fresh streaming SSE advice on demand

### ChatWidget — Conversation Memory + Streaming
Every chat message sends the full conversation history to the backend, which passes it to GPT. This means GPT remembers earlier messages — the difference between a toy chatbot and a real assistant. Responses stream live with a typing indicator.

**Backend endpoint used:**
- `POST /api/chat-stream` — streaming chat with full history context

### ProductCarousel — Structured JSON Output
The frontend fetches the user's spending profile first, then asks the backend to generate personalised product recommendations. The backend uses `response_format: json_object` to ensure GPT returns typed structured data — not freetext that needs parsing.

**Backend endpoint used:**
- `POST /api/product-recommendations` — structured JSON product cards

### Hero — Real API Data
Account balances come from the backend API, not hardcoded or randomly generated. Includes loading skeleton while fetching and graceful fallback.

**Backend endpoint used:**
- `GET /api/balances` — live account data

---

## AI/ML Techniques Demonstrated

| Technique | Component | Backend implementation |
|-----------|-----------|----------------------|
| **ML Regression** | SpendingChart | `SimpleLinearRegression` on 5-month history |
| **GPT Streaming (SSE)** | SpendingChart · ChatWidget | `openai.chat.completions.create({ stream: true })` |
| **Conversation Memory** | ChatWidget | Full message history passed on every request |
| **Structured JSON Output** | ProductCarousel | `response_format: { type: 'json_object' }` |
| **Parallel Completions** | SpendingChart | `n: 5` — 5 advice variations in one API call |
| **Response Caching** | SpendingChart | Cache to JSON file — avoids repeated API costs |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Tailwind CSS, CRACO |
| AI / LLM | GPT-4o-mini via private backend |
| ML | SimpleLinearRegression (ml-regression) |
| Streaming | Server-Sent Events (SSE) |
| Data Viz | Chart.js, React-Chartjs-2 |
| Backend | Node.js + Express (private repo, deployed on Render) |
| Deployment | GitHub Pages (this repo) |

---

## Run Locally

```bash
git clone https://github.com/kirti/ai-banking-poc-frontend
cd ai-banking-poc-frontend
npm install
npm start
# → http://localhost:3000
```

The app connects to the live backend at `https://ai-banking-poc-backend.onrender.com` by default. No local backend setup needed for development.

> **Note:** The backend is hosted on Render free tier — first request may take ~30 seconds to wake up after inactivity.

---

## Backend API Reference

The private backend exposes these endpoints (deployed at `https://ai-banking-poc-backend.onrender.com`):

| Method | Endpoint | Used by | Description |
|--------|----------|---------|-------------|
| `GET` | `/api/balances` | Hero | Account balances |
| `GET` | `/api/spending-history` | SpendingChart | 5-month history |
| `POST` | `/api/spending-prediction` | SpendingChart | ML prediction + cached GPT advice |
| `POST` | `/api/spending-advice-stream` | SpendingChart | Fresh SSE streaming advice |
| `POST` | `/api/chat-stream` | ChatWidget | Streaming chat with memory |
| `POST` | `/api/product-recommendations` | ProductCarousel | Structured JSON products |
| `GET` | `/api/health` | — | Status + model info |

---

## Related Projects

- [zero-code-apps](https://kirti.github.io/zero-code-apps) — AI app builder (Claude/GPT-4o/Gemini streaming)
- [skillforge-ai](https://www.npmjs.com/package/skillforge-ai) — npm AI skill files for any LLM
- [github-actions-node-patterns](https://kirti.github.io/github-actions-node-patterns) — 8 CI/CD workflow patterns

---

*Built by [Kirti Kaushal](https://www.linkedin.com/in/kirti3/) — Senior Full Stack Engineer + AI/ML*
*[LinkedIn](https://www.linkedin.com/in/kirti3/) · [GitHub](https://github.com/kirti) · [Medium](https://kirtikau.medium.com)*
