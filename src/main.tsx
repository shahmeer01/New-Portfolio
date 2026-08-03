import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import BackgroundNetwork from './components/BackgroundNetwork.tsx';
import RobotAssistant from './components/RobotAssistant.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RobotAssistant />
    <BackgroundNetwork />
    <App />
  </StrictMode>,
);
