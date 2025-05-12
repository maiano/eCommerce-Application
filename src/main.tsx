import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '@/shared/lib/commercetools';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root not found');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
