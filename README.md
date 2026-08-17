# 🤖 AI Chatbot

A full-stack AI chatbot built with **React, Tailwind CSS, Node.js, Express.js, LangChain, and Tavily**.

This chatbot can understand user queries, work with the application's context, provide the current date, search the web for up-to-date information, and interact with Todo application data.

---

## ✨ Features

* 🤖 AI-powered conversational chatbot
* 🧠 Built with **LangChain**
* 🌐 Web search using **Tavily**
* 📰 Fetches up-to-date information from the internet
* 📅 Can provide the current date
* 📝 Understands and works with **Todo App context**
* 🔎 Can search the web when additional information is required
* 💬 Conversational interaction through a REST API
* ⚡ React-based frontend
* 🎨 Tailwind CSS UI
* 🚀 Node.js + Express.js backend
* 🔌 REST API architecture

---

## 🏗️ Tech Stack

### Frontend

* React
* Tailwind CSS
* JavaScript

### Backend

* Node.js
* Express.js
* JavaScript / TypeScript
* LangChain

### AI & Tools

* LangChain
* Tavily Web Search
* LLM API

---

## 🧠 How It Works

The chatbot receives a user's message from the React frontend and sends it to the backend.

```text
User
 │
 ▼
React Chat UI
 │
 │ POST /api/chat
 ▼
Express.js Server
 │
 ▼
LangChain Agent
 │
 ├── Current Date
 │
 ├── Todo App Context
 │
 └── Tavily Web Search
        │
        ▼
     Internet
 │
 ▼
AI Response
 │
 ▼
React Chat UI
```

The LangChain agent decides what information or tool it needs to answer the user's question.

For example:

### Current date

```text
User: What is today's date?

AI: Today's date is August 17, 2026.
```

### Web search

```text
User: What are the latest React features?

AI
 → Uses Tavily
 → Searches the web
 → Collects relevant information
 → Generates the answer
```

### Todo context

```text
User: What are my pending todos?

AI
 → Uses Todo application context
 → Understands the user's todo data
 → Generates a relevant response
```

---

## 📂 Project Structure

A possible project structure:

```text
ai-chatbot/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── tools/
│   │   ├── agents/
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

---

## 🔌 API

### Chat

Send a message to the AI chatbot.

**Endpoint**

```http
POST /api/chat
```

### Request

```json
{
  "message": "What is today's date?"
}
```

### Response

```json
{
  "message": "Today's date is August 17, 2026."
}
```

---

## 🔍 Tavily Web Search

The chatbot uses **Tavily** as a web-search tool.

When the AI needs information that may have changed recently, it can use Tavily to search the internet.

Example:

```text
User:
Who is the current president of Bangladesh?

        ↓

LangChain Agent

        ↓

Tavily Search

        ↓

Web Results

        ↓

LLM

        ↓

Final Answer
```

This allows the chatbot to answer questions that require fresh web information instead of relying only on the model's built-in knowledge.

---

## 📝 Todo Context

The chatbot is also connected to the Todo application's context.

This allows the AI to understand information related to the user's Todo application and respond accordingly.

For example:

```text
User:
How many pending tasks do I have?

AI:
You currently have 5 pending tasks.
```

The Todo context can be extended to support operations such as:

* Reading todos
* Finding pending todos
* Finding completed todos
* Searching todos
* Creating todos
* Updating todos
* Deleting todos
* Filtering todos by priority/status

---

## 🧰 AI Tools

The LangChain agent can use different tools depending on the user's request.

```text
                    ┌─────────────────┐
                    │   User Message  │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ LangChain Agent │
                    └────────┬────────┘
                             │
             ┌───────────────┼───────────────┐
             │               │               │
             ▼               ▼               ▼
       Current Date     Todo Context    Tavily Search
             │               │               │
             └───────────────┼───────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   AI Response   │
                    └─────────────────┘
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the backend/server directory.

```env
PORT=3000

LLM_API_KEY=your_llm_api_key

TAVILY_API_KEY=your_tavily_api_key
```

> Never commit your `.env` file to GitHub.

Add this to `.gitignore`:

```gitignore
.env
node_modules/
dist/
```

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd ai-chatbot
```

### 2. Install backend dependencies

```bash
cd server
pnpm install
```

### 3. Configure environment variables

Create:

```text
server/.env
```

and add your API keys.

### 4. Start the backend

```bash
pnpm dev
```

The API will run on:

```text
http://localhost:3000
```

---

## 💻 Frontend Setup

Open another terminal:

```bash
cd client
pnpm install
```

Start the React development server:

```bash
pnpm dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 📡 API Request Example

Using JavaScript:

```javascript
const response = await fetch("http://localhost:3000/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: "Search the latest information about React",
  }),
});

const data = await response.json();

console.log(data);
```

---

## 🔐 Security

API keys should always be stored on the backend.

```text
❌ React
   ↓
   TAVILY_API_KEY

✅ React
   ↓
   Express API
   ↓
   Tavily
```

Never expose your LLM or Tavily API keys through frontend environment variables.

---

## 🔮 Future Improvements

Some possible improvements for the project:

* [ ] Persistent chat history
* [ ] User-specific conversations
* [ ] Streaming AI responses
* [ ] Redis-based temporary chat memory
* [ ] Automatic chat expiration
* [ ] Long-term memory
* [ ] Authentication and authorization
* [ ] More Todo tools
* [ ] File/document search
* [ ] Vector database integration
* [ ] RAG-based knowledge retrieval
* [ ] Conversation summaries
* [ ] Rate limiting
* [ ] Better error handling
* [ ] Production deployment
* [ ] AI tool-call visualization

---

## 🎯 Goal

The goal of this project is to build a practical AI assistant that can combine:

```text
LLM
 +
LangChain
 +
Web Search
 +
Application Context
 +
Todo Data
 +
REST API
```

into a single conversational interface.

The chatbot is designed not only to generate text, but also to **use tools and application context to perform useful tasks**.

---

## 📄 License

This project is for learning and development purposes.
