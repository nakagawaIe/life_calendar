import React from 'react';
import { useSelector } from "react-redux";
import { IMenstPeriods } from '../calendar/reducer/calendar_reducer';
import style from './period.module.scss';
import PeriodHead from './components/period_head';
import PeriodBody from './components/period_body';

const Period = () => {
  const menstPeriods = useSelector((state: { calendar: { menstPeriods: IMenstPeriods } }) => state.calendar.menstPeriods);

  return (
    <div className={style.root}>
      <table className={style.list}>
        <PeriodHead />
        <PeriodBody menstPeriods={menstPeriods} />
      </table>
    </div>
  )
};

export default Period;
