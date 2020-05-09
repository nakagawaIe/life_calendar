import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { ICalendar, IMenstPeriods } from '../reducer/calendar_reducer';
import { PAGE_TITLE } from '../../_common/strings';
import style from './calendar_body.module.scss';
import CalendarWeek from './calendar_week'
import CalendarCell from './calendar_cell'
import prevIcn from './icn/arrow_prev.svg'
import nextIcn from './icn/arrow_next.svg'

const CalendarBody = () => {
  const calendars = useSelector((state: { calendar: { calendars: ICalendar[] } }) => state.calendar.calendars);
  const menstPeriods = useSelector((state: { calendar: { menstPeriods: IMenstPeriods } }) => state.calendar.menstPeriods);

  const now = new Date()
  const toYear = now.getFullYear()
  const toMonth = now.getMonth()
  const today = now.getDate()
  const [dateState, setDateState] = useState(new Date(toYear, toMonth, 1));
  const year = dateState.getFullYear()
  const month = dateState.getMonth()

  const toMonthCalendars = calendars.filter(c => {
    const calendarDate = new Date(c.id);
    return calendarDate.getFullYear() === year && (calendarDate.getMonth() === month || calendarDate.getMonth() === month - 1 || calendarDate.getMonth() === month + 1);
  })

  const isMenstPeriod = (id: string) => {
    const idDate = new Date(id);
    const isPeriod = menstPeriods.find(m => {
      const start = m[0] as string;
      const startDate = new Date(start);
      const stopDate = m[1] ? new Date(m[1]) : now;
      return startDate <= idDate && idDate <= stopDate;
    });
    return isPeriod ? isPeriod.length > 0 : false;
  }

  const createCalendar = () => {
    const startDay = dateState.getDay() // 月の最初の日の曜日を取得
    const endDate = new Date(year, month + 1, 0) // 月の最後の日を取得
    const endDayCount = endDate.getDate() // 月の末日
    const lastMonthEndDate = new Date(year, month, 0) // 前月の最後の日の情報
    const lastMonthendDayCount = lastMonthEndDate.getDate() // 前月の末日

    const calendar: Array<Array<JSX.Element>> = [[], [], [], [], [], []]
    let dayCount = 1
    for (let w = 0; w < 6; w += 1) {
      for (let d = 0; d < 7; d += 1) {
        if (w === 0 && d < startDay) {
          let num = lastMonthendDayCount - startDay + d + 1
          const id = `${year}/${month}/${num}`;
          const getTodayData = toMonthCalendars.find(c => c.id === id);
          const data = getTodayData?.data;
          calendar[w].push(
            <CalendarCell
              className={style.noToMonth}
              date={num}
              dayOfWeek={d}
              menstPeriod={isMenstPeriod(id)}
              data={data}
              key={`${month}${num}`}
            />
          )
        } else if (dayCount > endDayCount) {
          let num = dayCount - endDayCount
          const id = `${year}/${month + 2}/${num}`;
          const getTodayData = toMonthCalendars.find(c => c.id === id);
          const data = getTodayData?.data;
          calendar[w].push(
            <CalendarCell
              className={style.noToMonth}
              date={num}
              dayOfWeek={d}
              menstPeriod={isMenstPeriod(id)}
              data={data}
              key={`${month}${num}`}
            />
          )
          dayCount += 1
        } else {
          const id = `${year}/${month + 1}/${dayCount}`;
          const getTodayData = toMonthCalendars.find(c => c.id === id);
          const data = getTodayData?.data;
          calendar[w].push(
            <CalendarCell
              year={year}
              month={month + 1}
              date={dayCount}
              dayOfWeek={d}
              today={month === toMonth && dayCount === today}
              menstPeriod={isMenstPeriod(id)}
              data={data}
              key={id}
            />
          )
          dayCount += 1
        }
      }
    }
    return calendar
  }

  useEffect(() => {
    document.title = `${year}/${month + 1} - ${PAGE_TITLE}`;
  });

  return (
    <div className={style.root}>
      <div className={style.head}>
        <p className={style.button} onClick={() => setDateState(new Date(year, month - 1, 1))}>
          <img src={prevIcn} alt="Prev" />
        </p>
        <h2 className={style.title}>{year}/{month + 1}</h2>
        <p className={style.button} onClick={() => setDateState(new Date(year, month + 1, 1))}>
          <img src={nextIcn} alt="Next" />
        </p>
      </div>

      <table className={style.calendar}>
        <CalendarWeek />
        <tbody>
          {
            createCalendar().map((w, i) => (
              <tr key={i}>
                {w.map(d => d)}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default CalendarBody;
