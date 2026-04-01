// src/services/apiClient.ts
import axios, { type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/authStore";

export const apiClient = axios.create({
  // Utilizamos tu variable de entorno, con un fallback a localhost por si acaso en desarrollo
  baseURL: import.meta.env.PUBLIC_API_URL || "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de Peticiones (Request)
// Antes de que la petición salga hacia el backend, inyectamos el JWT
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Verificamos que estamos ejecutando esto en el navegador (cliente)
    if (typeof window !== "undefined") {
      // Obtenemos el token directamente desde nuestro store global de Zustand
      const token = useAuthStore.getState().token;

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor de Respuestas (Response)
// Comprueba si el backend rechaza la petición por problemas de autenticación
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si el error es 401 (No Autorizado), el token ha caducado o es inválido
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        console.warn("Sesión expirada o no autorizada. Redirigiendo al login.");

        // Limpiamos la sesión en Zustand (esto borra también el localStorage)
        useAuthStore.getState().logout();

        // Expulsamos al usuario de vuelta a la página de inicio de sesión
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);
