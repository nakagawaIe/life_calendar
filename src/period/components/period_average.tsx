import React from 'react';
import { IMenstPeriods } from '../../calendar/reducer/calendar_reducer';
import { PERIOD } from '../../_common/strings'
import style from './period_average.module.scss';

interface IProps {
  menstPeriods: IMenstPeriods;
}

const PeriodAverage = (props: IProps) => {
  const averages = props.menstPeriods.map(p => p[2]).filter(Boolean);
  let sum = 0;
  averages.forEach(a => sum += a ?? 0);
  const average = Math.floor(sum / averages.length);

  return (
    <p className={style.root}>
      {PERIOD.TITLE}
      <span>{sum > 0 ? average : PERIOD.NONE}</span>
      日
    </p>
  )
};

export default PeriodAverage;
