import { useAuthStore } from "@component/stores/auth";
import axios from "axios";

const AxiosLogout = axios.create({
  baseURL: process.env.URL_BACKEND,
});

const AxiosLogged = axios.create({
  baseURL: process.env.URL_BACKEND,
});

const AxiosLoggedAutentica = axios.create({
  baseURL: "https://api.autentica.bahia.gob.ar/",
});

const authStore = useAuthStore; // Obtén la función de estado fuera del interceptor

AxiosLogged.interceptors.request.use(
  function (config) {
    const { tokens } = useAuthStore.getState();
    if (tokens) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

AxiosLoggedAutentica.interceptors.request.use(
  function (config) {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Agrega un interceptor de respuesta para manejar la renovación del token
AxiosLoggedAutentica.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      // El token ha expirado, intenta renovarlo
      const { refresh } = authStore.getState();
      if (refresh) {
        try {
          const response = await AxiosLoggedAutentica.post("refreshtoken", {
            refresh: refresh,
          });
          const newAccessToken = response.data.access;

          // Actualiza el token de acceso en el estado de AuthStore
          authStore.setState((state) => ({
            ...state,
            tokens: {
              ...state,
              access: newAccessToken,
            },
          }));

          // Actualiza el token de acceso en la configuración de Axios
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;

          // Reintenta la solicitud original
          return AxiosLoggedAutentica(error.config);
        } catch (refreshError) {
          // Si falla el refresco, redirige al usuario al inicio de sesión
          //@ts-ignore

          useAuthStore.getState().logout();
          // Puedes redirigir al usuario a la página de inicio de sesión aquí
        }
      } else {
        // Si no hay un token de refresco disponible, redirige al usuario al inicio de sesión
        //@ts-ignore
        useAuthStore.getState().logout();
        // Puedes redirigir al usuario a la página de inicio de sesión aquí
      }
    }
    return Promise.reject(error);
  }
);

export { AxiosLogout, AxiosLogged, AxiosLoggedAutentica };
