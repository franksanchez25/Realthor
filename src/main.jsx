import React from 'react'
import ReactDOM from 'react-dom/client'
import { persistor, store } from "../src/redux/store.js";
import './index.css'
import { App } from './App'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
 
   <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>,
)
