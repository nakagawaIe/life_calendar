import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.module.scss';
import Calendar from './calendar/calendar';
import Gnav from './_common/gnav/gnav';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Calendar} />
          <Route path='/calendar' component={Calendar} />
        </Switch>

        <Gnav />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
