import React from 'react';
import style from './setting_container.module.scss';

interface IProps {
  head: string,
  read: string,
  children: any;
}

const SettingContainer = (props: IProps) => (
  <div className={style.root}>
    <h2 className={style.head}>{props.head}</h2>
    <p>{props.read}</p>

    {props.children}
  </div>
)

export default SettingContainer;
