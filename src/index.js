import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { ApiProvider } from './contexts/LogoContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <ApiProvider>
        <AuthProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </AuthProvider>
    </ApiProvider>
);