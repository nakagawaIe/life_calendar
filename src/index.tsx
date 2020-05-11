import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.module.scss';
import Calendar from './calendar/calendar';
import Period from './period/period';
import Other from './other/other';
import Setting from './setting/setting';
import Gnav from './_common/gnav/gnav';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/life-calendar' component={Calendar} />
          <Route path='/life-calendar/period' component={Period} />
          <Route path='/life-calendar/other' component={Other} />
          <Route path='/life-calendar/setting' component={Setting} />
        </Switch>

        <Gnav />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
