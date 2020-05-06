import React from 'react';
import { Link } from 'react-router-dom';
import style from './gnav.module.scss'
import calendarIcn from './icn/calendar.svg'
import settingIcn from './icn/setting.svg'

const Gnav = () => {
  return (
    <ul className={style.gnav}>
      <li><Link to='/'><img src={calendarIcn} alt="カレンダー" className={style.icn} /></Link></li>
      <li><Link to='/setting'><img src={settingIcn} alt="設定" className={style.icn} /></Link></li>
    </ul>
  )
}

export default Gnav;
