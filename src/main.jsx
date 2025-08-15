import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Use lazy loading for the App component
const App = lazy(() => import('./App.jsx'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={
      <div className="app-loading">
        <div className="app-loading-spinner"></div>
      </div>
    }>
      <App />
    </Suspense>
  </StrictMode>
);