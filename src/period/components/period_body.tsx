import React from 'react';
import { IMenstPeriods } from '../../calendar/reducer/calendar_reducer';
import { PERIOD } from '../../_common/strings'
import style from './period_body.module.scss';

interface IProps {
  menstPeriods: IMenstPeriods;
}

const PeriodBody = (props: IProps) => {
  const { menstPeriods } = props;

  return (
    <tbody className={style.root}>
      {menstPeriods.map((m, i) => {
        return (
          <tr key={i}>
            <td>{i}</td>
            <td>{m[0]}</td>
            <td>{m[1] ?? PERIOD.NONE}</td>
            <td>{m[2] ?? PERIOD.NONE}</td>
          </tr>
        )
      })}
    </tbody>
  )
};

export default PeriodBody;
