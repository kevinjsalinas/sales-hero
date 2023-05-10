import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'mdbreact/dist/css/mdb.css';
import './index.css';
import App from './components/App';
import { BrowserRouter} from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';

import { UserProvider } from './context/user';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

