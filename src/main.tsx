import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'reactflow/dist/style.css'
import 'react-circular-progressbar/dist/styles.css'

createRoot(document.getElementById("root")!).render(<App />);
