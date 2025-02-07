import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/index.umd.js';

const CLIENT_ID = '362557444672-c4gvrjvfce15fu5dv7uc2cb8k9e31nfs.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <App />
        </GoogleOAuthProvider>
    </React.StrictMode>,
);
