import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login';
import { store } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

import {
    persistStore
} from 'redux-persist'
import Lead from "./pages/Lead";
import Overview from "./pages/Overview";


const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store)
root.render(
  <React.StrictMode>
      <Router>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <Routes>
                  <Route path='/' element={<Login/>} exact />
                  <Route path='/leads' element={<Lead />} exact />
                  <Route path='/overview' element={ <Overview/>} exact />
              </Routes>
          </PersistGate>
      </Provider>
      </Router>
  </React.StrictMode>
);


