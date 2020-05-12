import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './gnav.module.scss'
import calendarIcn from './icn/calendar.svg'
import medicIcn from './icn/medic.svg'
import otherIcn from './icn/other.svg'
import settingIcn from './icn/setting.svg'

const Gnav = () => {
  return (
    <ul className={style.gnav}>
      <li>
        <NavLink to='/' activeClassName={style.active} exact>
          <img src={calendarIcn} alt="カレンダー" className={style.icn} />
        </NavLink>
      </li>
      <li>
        <NavLink to='/period' activeClassName={style.active} exact>
          <img src={medicIcn} alt="周期" className={style.icn} />
        </NavLink>
      </li>
      <li>
        <NavLink to='/setting' activeClassName={style.active} exact>
          <img src={settingIcn} alt="設定" className={style.icn} />
        </NavLink>
      </li>
      <li>
        <NavLink to='/other' activeClassName={style.active} exact>
          <img src={otherIcn} alt="その他" className={style.icn} />
        </NavLink>
      </li>
    </ul>
  )
}

export default Gnav;
