import React from 'react';
import style from './calendar_body.module.scss';
import CalendarWeek from './calendar_week'
import CalendarCell from './calendar_cell'

const CalendarBody = () => {
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
          calendar[w].push(<CalendarCell className={style.noToMonth} date={num} />)
        } else if (dayCount > endDayCount) {
          let num = dayCount - endDayCount
          calendar[w].push(<CalendarCell className={style.noToMonth} date={num} />)
          dayCount += 1
        } else {
          calendar[w].push(
            <CalendarCell
              className={toMonth === month && dayCount === today ? style.today : ''}
              date={dayCount}
              tags={dayCount === 15 ? { work01: true, unti: true } : undefined}
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
  });

  return (
    <div className={style.root}>
      <div className={style.head}>
        <button className={style.button} onClick={() => setDateState(new Date(year, month - 1, 1))}>先月</button>
        <h2>{year}年{month + 1}月</h2>
        <button className={style.button} onClick={() => setDateState(new Date(year, month + 1, 1))}>次月</button>
      </div>

      <table className={style.calendar}>
        <CalendarWeek />
        <tbody>
          {
            createCalendar().map(w => (
              <tr>
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
