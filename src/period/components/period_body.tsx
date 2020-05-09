import React from 'react';
import { IMenstPeriods } from '../../calendar/reducer/calendar_reducer';
import style from './period_body.module.scss';

interface IProps {
  menstPeriods: IMenstPeriods;
}

const PeriodBody = (props: IProps) => {
  const { menstPeriods } = props;

  return (
    <tbody className={style.root}>
      {menstPeriods.map(m => {
        const start = m[0] as string;
        const stop = m[1];
        const diffTime = stop ? new Date(stop).getTime() - new Date(start).getTime() : null;
        const diff = diffTime ? Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1 : '-';
        return (
          <tr key={start}>
            <td>{start}</td>
            <td>{stop ?? '-'}</td>
            <td>{diff}</td>
          </tr>
        )
      })}
    </tbody>
  )
};

export default PeriodBody;
