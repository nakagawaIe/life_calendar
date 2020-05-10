import React from 'react';
import { PERIOD } from '../../_common/strings';
import style from './period_head.module.scss';

const PeriodHead = () => (
  <thead className={style.root}>
    <tr>
      <th>{PERIOD.NUM}</th>
      <th>{PERIOD.START}</th>
      <th>{PERIOD.STOP}</th>
      <th>{PERIOD.DIFF}</th>
    </tr>
  </thead>
);

export default PeriodHead;
