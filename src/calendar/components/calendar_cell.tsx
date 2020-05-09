import React, { useState } from 'react';
import { ICalendarData, EVENT } from '../reducer/calendar_reducer';
import { CALENDAR } from '../../_common/strings';
import style from './calendar_cell.module.scss';
import CalendarDetail from './calendar_detail'
import WorkTag from './work_tag'
import toiletIcn from './icn/toilet.svg'
import fruitIcn from './icn/fruit.svg'
import heartIcn from './icn/heart.svg'
import thundarIcn from './icn/thundar.svg'
import bloodIcn from './icn/blood.svg'
import noteIcn from './icn/technology.svg'

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
  const [showState, setShowState] = useState(false);

  const toggleDetail = () => {
    showState ? setShowState(false) : setShowState(true)
  }

  const { className, year, month, date, dayOfWeek, today, menstPeriod, data } = props;
  return (
    <td className={className}>
      <div className={`${style.inner} ${today ? style.today : ''}`} onClick={toggleDetail}>
        <p
          className={`${style.date} ${dayOfWeek === 0 ? style.sunday : '' || dayOfWeek === 6 ? style.saturday : ''}`}
        >
          {date}
        </p>
        {data?.work !== undefined && <WorkTag index={data?.work} />}
        {data?.plan && <p className={style.plan}>{data?.plan}</p>}
        <ul className={style.dots}>
          {data?.unti && <li><img src={toiletIcn} alt={CALENDAR.UNTI} /></li>}
          {(data?.menst || menstPeriod) && <li><img src={fruitIcn} alt={CALENDAR.MENST} /></li>}
          {data?.event && data.event.find(e => e === EVENT.SEX) && <li><img src={heartIcn} alt={EVENT.SEX} /></li>}
          {data?.event && data.event.find(e => e === EVENT.BAD) && <li><img src={thundarIcn} alt={EVENT.BAD} /></li>}
          {data?.event && data.event.find(e => e === EVENT.BLOOD) && <li><img src={bloodIcn} alt={EVENT.BLOOD} /></li>}
          {data?.memo && <li><img src={noteIcn} alt="メモ" /></li>}
        </ul>
      </div>

      {showState &&
        <CalendarDetail
          year={year ?? 0}
          month={month ?? 0}
          date={date}
          closeHandler={toggleDetail}
          data={data ?? {}}
          menstPeriod={menstPeriod ?? false}
        />}
    </td>
  )
}

export default CalendarCell;
