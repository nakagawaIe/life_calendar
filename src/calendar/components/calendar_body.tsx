import React from 'react';
import { useSelector } from "react-redux";
import { ICalendar } from '../reducer/calendar_reducer';
import style from './calendar_body.module.scss';
import CalendarWeek from './calendar_week'
import CalendarCell from './calendar_cell'
import prevIcn from './icn/arrow_prev.svg'
import nextIcn from './icn/arrow_next.svg'

const CalendarBody = () => {
  const calendars = useSelector((state: { calendar: { calendars: ICalendar[] | undefined } }) => state.calendar.calendars);

  const now = new Date()
  const toYear = now.getFullYear()
  const toMonth = now.getMonth()
  const today = now.getDate()
  const [dateState, setDateState] = React.useState(new Date(toYear, toMonth, 1));
  const year = dateState.getFullYear()
  const month = dateState.getMonth()

  const createCalendar = () => {
    const startDay = dateState.getDay() // 月の最初の日の曜日を取得
    const endDate = new Date(year, month, 0) // 月の最後の日を取得
    const endDayCount = endDate.getDate() // 月の末日
    const lastMonthEndDate = new Date(year, month - 1, 0) // 前月の最後の日の情報
    const lastMonthendDayCount = lastMonthEndDate.getDate() // 前月の末日

    const calendar: Array<Array<JSX.Element>> = [[], [], [], [], [], []]
    let dayCount = 1
    for (let w = 0; w < 6; w += 1) {
      for (let d = 0; d < 7; d += 1) {
        if (w === 0 && d < startDay) {
          let num = lastMonthendDayCount - startDay + d + 1
          calendar[w].push(
            <CalendarCell
              className={style.noToMonth}
              date={num}
              dayOfWeek={d}
              key={`${month}${num}`}
            />
          )
        } else if (dayCount > endDayCount) {
          let num = dayCount - endDayCount
          calendar[w].push(
            <CalendarCell
              className={style.noToMonth}
              date={num}
              dayOfWeek={d}
              key={`${month}${num}`}
            />
          )
          dayCount += 1
        } else {
          const id = Number(`${year}${month + 1}${dayCount}`);
          const getTodayData = calendars && calendars.find(c => c.id === id);
          const data = getTodayData?.data;
          calendar[w].push(
            <CalendarCell
              year={year}
              month={month + 1}
              date={dayCount}
              dayOfWeek={d}
              today={month === toMonth && dayCount === today}
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

  React.useEffect(() => {
    document.title = `Calendar - ${year}/${month + 1}`;
    console.log(calendars)
  });

  return (
    <div className={style.root}>
      <div className={style.head}>
        <p className={style.button} onClick={() => setDateState(new Date(year, month - 1, 1))}>
          <img src={prevIcn} alt="Prev" />
        </p>
        <h2>{year}/{month + 1}</h2>
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
