//* React
import React from 'react';
import ReactDOM from 'react-dom/client';

//* Components
import { App } from './App.jsx';

//* Style
import 'modern-normalize/modern-normalize.css';
import './index.css';

//* Redux
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

//* Persistor
import { PersistGate } from 'redux-persist/integration/react';
import { persistedStore } from './redux/store.js';

//* Router
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
