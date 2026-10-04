# 🤖 Spring AI Playground

Welcome to **Spring AI Playground**! 👋  
This is a fun, full-stack application built to explore the power of **Spring AI** by connecting a modern Java backend to generative AI models, paired with an interactive React frontend.

🌐 **Live Demo:** [https://spring-ai-service-183314.web.app/](https://spring-ai-service-183314.web.app/)

---

## ✨ Features (What can you do here?)

Here are the main features you can play with:

* 💬 **Chat with AI (`/ask-ai`):** Ask questions, chat, and get real-time responses from open-source language models.
* 🎨 **Image Generator (`/generate-image`):** Type in any descriptive idea and let Stable Diffusion generate illustrations for you.
* 🍳 **Recipe Maker (`/create-recipe`):** Type in ingredients you have in your fridge, pick a cuisine style (Italian, Asian, Mexican, etc.), mention any dietary limits (vegetarian, gluten-free), and the AI will cook up a custom step-by-step recipe.
* 🎙️ **Audio Transcriber (`/ai-transcribe-audio`):** Upload an audio file (`.wav`, `.mp3`) and convert speech to text with OpenAI Whisper.

---

> [!TIP]
> ### 💡 A Quick Note on the AI Models
> To keep this project completely free to run and experiment with, it uses **budget-friendly, lightweight open-source models** (via Together AI) rather than expensive commercial models.
> 
> Because of this, you might occasionally see quirky phrasing, creative leaps, or unexpected outputs. Think of it as part of the charm! 😊 The entire backend is designed so that swapping to any top-tier model (like GPT-4o, Claude, or Gemini) takes just one environment variable change.

---

## 🧠 What I Learned & Built with Spring AI

Building this project was a hands-on way to explore how modern generative AI integrates into the Java / Spring ecosystem:

* **Universal AI Integration:** Using `spring-ai-starter-model-openai` to talk to OpenAI-compatible endpoints (Together AI), without being locked into a single provider.
* **On-the-fly Tuning:** Dynamically configuring chat options (like model choice `Qwen/Qwen3.5-9B` and `temperature`) directly inside services.
* **Prompt Engineering with Templates:** Using `PromptTemplate` to pass variables (ingredients, dietary restrictions) and guide the AI into returning structured, clean recipes.
* **Multimodal Capabilities:** Handling text, image generation (Stable Diffusion XL), and multipart audio file uploads (Whisper Large) in one unified backend.
* **Cloud & DevOps:** Packaging the Java 21 app in a lightweight Docker container, hosting it serverless on **Google Cloud Run**, and deploying the frontend on **Firebase Hosting**.

---

## 🔌 API Endpoints

If you prefer testing the backend directly via browser or tools like Postman / curl, here are the available endpoints:

| Endpoint | Method | Parameters | Description |
| :--- | :--- | :--- | :--- |
| `/ask-ai` | `GET` | `?prompt=Hello` | Standard chat completion |
| `/ask-ai-options` | `GET` | `?prompt=Explain+gravity` | Chat using tuned creativity settings |
| `/create-recipe` | `GET` | `?ingredients=chicken,rice&cuisine=Asian&dietaryRestrictions=none` | Custom recipe generator |
| `/generate-image` | `GET` | `?prompt=A+cute+robot+gardener&height=512&width=512` | Returns image URLs |
| `/ai-transcribe-audio` | `POST` | `file` (multipart form-data) | Transcribes speech from uploaded audio |

---

## 🚀 How to Run Locally

If you'd like to run this on your own machine:

### 1. Prerequisites
* **Java 21** & **Maven** (or use the included `./mvnw`)
* **Node.js** (v18+) & **npm**
* A free **Together AI API key** (from [together.ai](https://www.together.ai/))

### 2. Backend Setup
```bash
cd spring-ai
# Set your API key
export TOGETHER_AI_API_KEY="your_api_key_here"  # On Windows PowerShell: $env:TOGETHER_AI_API_KEY="your_key"

# Run the Spring Boot app (starts on port 8080)
./mvnw spring-boot:run
```

### 3. Frontend Setup
```bash
cd ../SpringAI-frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser and enjoy! 🎉