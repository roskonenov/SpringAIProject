export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? 'https://spring-ai-backend-1066477018842.europe-west3.run.app'
    : 'http://localhost:8080');
