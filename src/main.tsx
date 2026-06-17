import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './app/providers/theme-provider';
import './styles/globals.css';

ReactDom.createRoot(
    document.getElementById('root')!
).render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);