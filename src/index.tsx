import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>{document.title}</div>
      <Switch>
        <Route exact path='/'><App /></Route>
        <Route path='/about'><App /></Route>
        <Route path='/dashboard'><App /></Route>
      </Switch>
      <Link to='/'>Back To Home</Link>
      <Link to='/about'>about</Link>
      <Link to='/dashboard'>dashboard</Link>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
