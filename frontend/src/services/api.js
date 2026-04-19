import axios from 'axios';

// Instância base parametrizada para apontar sempre pro nosso servidor Express Node.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Middleware Outbound de Autorização do Front-End (Injeção de JWT)
api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('@KaizenToken') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Adota o formato estipulado no authMiddleware do Back
    }
    return config;
});

// Tratamento GLOBAL Centralizado de Erros (Evitando Try/Catch enormes nas páginas)
api.interceptors.response.use(
  (response) => {
    // Nós encapsulamos a promise para já retornar apenas os dados finais sem axios envelopes (response.data)
    return response.data;
  },
  (error) => {
    let customError = 'Ocorreu um erro inesperado ao conectar com o servidor.';
    
    if (error.response) {
      // Quando a API do NodeJS Express responder com StatusCode 400 ou 500 (Nossos catch global do backend)
      // Capturamos a mensagem human-readable exata que nosso Controller e Validations montaram!
      const backendErrorMsg = error.response.data?.error || error.response.data?.errors?.join(', ');
      customError = backendErrorMsg || `Erro mapeado na rede HTTP: ${error.response.status}`;
      
    } else if (error.request) {
      // Falha de Internet, backend desligado, Node crashed etc.
      customError = 'O servidor demorou a responder ou aparenta estar offline.';
    }
    
    // Aqui um Toaster global (Toastify, Sonner) caberia perfeitamente para feedback UI em jogos
    console.error('[Frontend API Tracer]', customError);
    
    // Propagamos uma Excessão JavaScript Limpa e traduzida para os componentes
    return Promise.reject(new Error(customError));
  }
);

export default api;
