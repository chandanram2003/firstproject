import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


createRoot(document.getElementById('root')!).render(
   <BrowserRouter>
    <App />
  </BrowserRouter>
)
