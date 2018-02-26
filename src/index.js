import React, {Component} from "react";
import ReactDOM from 'react-dom';
import './app.css';
import { BrowserRouter } from 'react-router-dom';
import App from "./app.js";

// import {Weather} from "Weather"











ReactDOM.render(
<BrowserRouter>
    <App/>
</BrowserRouter>

,document.getElementById('root'));