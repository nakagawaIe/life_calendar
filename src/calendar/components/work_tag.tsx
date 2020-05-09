import React from 'react';
import { useSelector } from "react-redux";
import { IAction } from '../../setting/reducer/setting_reducer';
import style from './work_tag.module.scss';

interface IProps {
  index: number;
  free?: string;
}

const WorkTag = (props: IProps) => {
  const work = useSelector((state: { setting: { work: IAction['work'] } }) => state.setting.work);
  const { index, free } = props;
  return <p className={`${style.root} ${free ? style.free : style[`color_${index}`]}`}>{free ?? work[index]}</p>
}

export default WorkTag;
