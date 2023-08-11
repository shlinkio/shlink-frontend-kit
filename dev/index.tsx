import { createRoot } from 'react-dom/client';
import { App } from './App';
import '../src/base.scss';
import 'bootstrap/scss/bootstrap.scss';
import '../src/index.scss';

createRoot(document.getElementById('root')!).render(<App />);
