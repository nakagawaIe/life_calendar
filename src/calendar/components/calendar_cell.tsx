import React from 'react';
import { ICalendarData } from '../reducer/calendar_reducer';
import style from './calendar_cell.module.scss';
import CalendarDetail from './calendar_detail'
import WorkTag from './work_tag'

interface IProps {
  className?: string;
  year?: number;
  month?: number;
  date: number;
  dayOfWeek: number;
  today?: boolean;
  menstPeriod?: boolean;
  data?: Partial<ICalendarData>;
}

const CalendarCell = (props: IProps) => {
  const [showState, setShowState] = React.useState(false);

  const toggleDetail = () => {
    showState ? setShowState(false) : setShowState(true)
  }

  const { className, year, month, date, dayOfWeek, today, menstPeriod, data } = props;
  return (
    <td className={className}>
      <div className={`${style.inner} ${today ? style.today : ''}`} onClick={toggleDetail}>
        <span
          className={`${style.date} ${dayOfWeek === 0 ? style.sunday : '' || dayOfWeek === 6 ? style.saturday : ''}`}
        >
          {date}
        </span>
        {data?.work && <WorkTag index={data?.work} />}
        {data?.plan && <p className={style.plan}>{data?.plan}</p>}
        <ul className={style.dots}>
          {data?.unti && <li className={style.unti} />}
          {(data?.menst || menstPeriod) && <li className={style.menst} />}
          {data?.event && data.event.length > 0 && <li className={style.event} />}
          {data?.memo && <li className={style.memo} />}
        </ul>
      </div>

      {showState &&
        <CalendarDetail
          year={year ?? 0}
          month={month ?? 0}
          date={date}
          closeHandler={toggleDetail}
          data={data ?? {}}
        />}
    </td>
  )
}

export default CalendarCell;
