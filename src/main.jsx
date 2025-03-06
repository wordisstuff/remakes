import App from './components/App/App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import { persistor, store } from './redux/store.js';
import './i18n/config.js';
import 'modern-normalize';
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <BrowserRouter>
                    <HelmetProvider>
                        <App />
                    </HelmetProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </StrictMode>,
);
