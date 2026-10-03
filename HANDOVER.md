# 📋 Project Status & Handover Context

## 1. Общ преглед на проекта
* **Проект:** Spring AI Showcase (Full-stack AI приложение)
* **Backend:** Spring Boot 4.0.4, Java 21, Spring AI (`2.0.0-M3`), Maven (`spring-ai/`)
* **Frontend:** React 18, Vite, CSS3 (`SpringAI-frontend/`)
* **AI Provider:** Together AI (OpenAI API Compatible: `gpt-oss-120b`, `Qwen/Qwen3.5-9B`, `Stable Diffusion XL`, `Whisper Large v3`)
* **GitHub Repository:** `https://github.com/roskonenov/SpringAIProject` (клон `main`)

---

## 2. Актуално състояние на инфраструктурата (GCP)
* **GCP Project ID:** `spring-ai-service-183314`
* **GCP Region:** `europe-west3` (Франкфурт)
* **Google Artifact Registry:** `spring-ai-repo` (настроена е автоматична политика за почистване – пази се само 1 най-нов образ)
* **Google Cloud Run услуга:** `spring-ai-backend`
* **Публичен HTTPS адрес на бекенда на живо:**
  🔗 **`https://spring-ai-backend-1066477018842.europe-west3.run.app`**
* **CI/CD:** `.github/workflows/deploy-backend.yml` (тригва се при push в `main` при промени в `spring-ai/**`)

---

## 3. Какво е направено до момента
1. **Бекендът е модифициран за облака:**
   * Добавен динамичен порт: `server.port=${PORT:8080}`
   * Разширен CORS в `WebConfig.java`: поддържа запетая за множество origins и отстранява trailing slashes.
   * Създаден multi-stage `Dockerfile` (Eclipse Temurin 21 Alpine JRE, non-root user `spring`).
2. **Бекендът е компилиран и деплойнат успешно в Cloud Run:**
   * Услугата работи и връща стандартен Spring Boot JSON отговор.
3. **GitHub репозиторито е обновено:**
   * Създаден подробен `README.md` за рекрутъри.
   * Конфигуриран GitHub Actions workflow с нативна Base64 автентикация.

---

## 4. Какво остава да се направи (Следващи стъпки във VS Code)

### Задача 1: Задаване на реален `TOGETHER_AI_API_KEY` в Cloud Run
```powershell
gcloud run services update spring-ai-backend --region=europe-west3 --update-env-vars="TOGETHER_AI_API_KEY=YOUR_ACTUAL_TOGETHER_AI_KEY"
```

### Задача 2: Активиране на GitHub Actions тайните
В GitHub Secrets (`https://github.com/roskonenov/SpringAIProject/settings/secrets/actions`):
* `GCP_SA_KEY` -> Base64 низ на сервизния ключ.
* `TOGETHER_AI_API_KEY` -> Реалният API ключ.

### Задача 3: Подготовка и деплой на React фронтенда (`SpringAI-frontend/`) във Firebase Hosting
1. В компонентите на фронтенда (`AskAi.jsx`, `CreateRecipe.jsx`, `ImageGenerator.jsx`, `AudioTranscriber.jsx`) да се замени твърдо кодираният `http://localhost:8080` с променлива на средата `import.meta.env.VITE_API_URL` (сочеща към `https://spring-ai-backend-1066477018842.europe-west3.run.app`).
2. Инициализиране на Firebase Hosting в `SpringAI-frontend/`:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   ```
3. Билд и деплой:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```
4. Добавяне на генерирания Firebase Hosting домейн в `FRONTEND_URL` променливата на бекенда в Cloud Run за пълна CORS съвместимост.
