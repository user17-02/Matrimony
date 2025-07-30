import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// ✅ Removed Redux imports
// import { Provider } from 'react-redux';
// import store from './redux/store';

// ✅ Still using Socket Context
import { SocketProvider } from './context/SocketContext';

const user = JSON.parse(localStorage.getItem("user"));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SocketProvider userId={user?._id}>
      <App />
    </SocketProvider>
  </React.StrictMode>
);

reportWebVitals();
