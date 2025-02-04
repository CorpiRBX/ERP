
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "bootstrap-icons/font/bootstrap-icons.css";

const rootElement = document.getElementById('root');
const queryClient = new QueryClient();
if (!rootElement) {
  throw new Error("No se encontró el elemento root en el DOM.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
