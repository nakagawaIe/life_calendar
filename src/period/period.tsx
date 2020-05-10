import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { IMenstPeriods } from '../calendar/reducer/calendar_reducer';
import { PAGE_TITLE } from '../_common/strings';
import style from './period.module.scss';
import PeriodAverage from './components/period_average';
import PeriodHead from './components/period_head';
import PeriodBody from './components/period_body';

const Period = () => {
  const menstPeriods = useSelector((state: { calendar: { menstPeriods: IMenstPeriods } }) => state.calendar.menstPeriods);

  useEffect(() => {
    document.title = `周期 - ${PAGE_TITLE}`;
  });

  return (
    <div className={style.root}>
      <PeriodAverage menstPeriods={menstPeriods} />
      <table className={style.list}>
        <PeriodHead />
        <PeriodBody menstPeriods={menstPeriods} />
      </table>
    </div>
  )
};

export default Period;
