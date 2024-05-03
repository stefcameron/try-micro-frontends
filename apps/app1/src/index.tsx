import { createRoot } from 'react-dom/client';
import { setBaseUrl } from '@try-micro-frontends/api';
import { App } from './components/App/App';
import './styles.css';

setBaseUrl(`http://localhost:${WP_PORT || ''}`);

const reactRoot = createRoot(document.getElementById('root')!);
reactRoot.render(<App />);
