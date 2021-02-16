import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./components/root-app/App";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Security } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';

import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.css";

import { LicenseManager } from "@ag-grid-enterprise/core";
LicenseManager.setLicenseKey("Insight_Enterprises_Inc_on_behalf_of_Nike_Inc_DSM_Multiple_Applications_10_Devs__1_February_2021_[v2]_MTYxMjEzNzYwMDAwMA==9ed853045a9d2aaa33e5dbee232e31b3");

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const oktaAuth = new OktaAuth({
  issuer: 'https://nike-qa.oktapreview.com/oauth2/ausa0mcornpZLi0C40h7/',
  clientId: 'nike.nikedigital.slim-apla-app',
  redirectUri: 'http://localhost:3000/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: false
});

//https://nike.okta.com/oauth2/aus27z7p76as9Dz0H1t7/

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Security oktaAuth={oktaAuth}>
        <App />
      </Security>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
