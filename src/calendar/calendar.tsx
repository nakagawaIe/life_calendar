import React from 'react';
import style from './calendar.module.scss';
import CalendarBody from './components/calendar_body';

const Calendar = () => (
  <div className={style.root}>
    <h1 className={style.title}>Calendar</h1>
    <CalendarBody />
  </div>
);

export default Calendar;
