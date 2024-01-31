import { AppThemeProvider } from './themes/AppThemeProvider';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './features/store';
import React from 'react';
import App from './App';
import './main.css';
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <SnackbarProvider maxSnack={4}>
          <App />
        </SnackbarProvider>
      </AppThemeProvider>
    </Provider>
  </React.StrictMode>,
);
