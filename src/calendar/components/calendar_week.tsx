import React from 'react';

const CalendarWeek = () => {
  const weeks = ['日', '月', '火', '水', '木', '金', '土']
  return (
    <thead>
      <tr>
        {weeks.map(w => <th key={w}>{w}</th>)}
      </tr>
    </thead>
  )
}

export default CalendarWeek;
