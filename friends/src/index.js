// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();


import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './component/Home'

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import FriendsList from './component/FriendsList';
import Friend from './component/Friend'

import ReactDOM from 'react-dom'

import App from '../src/App';
import axios from 'axios';




ReactDOM.render(
    <Router>
      <AppwithRouter />
    </Router>,
    rootElement
  );

// const rootElement = document.getElementById("root");
// ReactDOM.render(
//   <Router>
//     <App />
//   </Router>,
//   rootElement
// );




