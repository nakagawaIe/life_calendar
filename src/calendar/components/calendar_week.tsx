import React from 'react';
import style from './calendar_week.module.scss';

const weeks = ['日', '月', '火', '水', '木', '金', '土']

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
