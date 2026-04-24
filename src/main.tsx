import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import './styles/site.css';

const root = document.getElementById('root');
if (!root) throw new Error('#root element not found');

// `import.meta.env.BASE_URL` mirrors the Vite `base` config, which for
// GitHub Pages deployments is `/pocket-guides/`. react-router needs this
// without the trailing slash.
const baseName = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter basename={baseName}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
