import React from 'react';
import style from './calendar.module.scss';
import CalendarBody from './components/calendar_body';

const Calendar = () => (
  <div className={style.root}>
    カレンダー<br />
    <CalendarBody />
  </div>
);

export default Calendar;
