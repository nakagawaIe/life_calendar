import React from 'react';
import { IMenstPeriods } from '../../calendar/reducer/calendar_reducer';
import { PERIOD } from '../../_common/strings'
import style from './period_average.module.scss';

interface IProps {
  menstPeriods: IMenstPeriods;
}

const PeriodAverage = (props: IProps) => {
  const averages = props.menstPeriods.map(p => p[2]);
  const average = Math.floor((averages.reduce((prev, current) => (prev ?? 0) + (current ?? 0)) ?? 0) / averages.length);

  return (
    <p className={style.root}>
      {PERIOD.TITLE}
      <span>{average}</span>
      日
    </p>
  )
};

export default PeriodAverage;
