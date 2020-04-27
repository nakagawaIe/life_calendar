import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.module.scss';
import Calendar from './calendar/calendar';
import Gnav from './_common/gnav/gnav';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Calendar} />
        <Route path='/calendar' component={Calendar} />
      </Switch>

      <Gnav />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
