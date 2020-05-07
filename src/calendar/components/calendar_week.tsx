import React from 'react';
import style from './calendar_week.module.scss';

const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const CalendarWeek = () => {
  return (
    <thead className={style.root}>
      <tr>
        {weeks.map(w => <th key={w}>{w}</th>)}
      </tr>
    </thead>
  )
}

export default CalendarWeek;
