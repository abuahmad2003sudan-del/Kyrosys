import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './hooks/useLanguage';
import { CosmicHarmonyProvider } from './hooks/useCosmicHarmony';
import { CurrencyProvider } from './hooks/useCurrency';
import { MajesticModeProvider } from './contexts/MajesticModeContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <CosmicHarmonyProvider>
            <MajesticModeProvider>
              <App />
            </MajesticModeProvider>
          </CosmicHarmonyProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </AuthProvider>
  </StrictMode>,
);
