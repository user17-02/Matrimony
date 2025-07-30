import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from './context/SocketContext';

const user = JSON.parse(localStorage.getItem("user"));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider userId={user?._id}>
        <App />
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
