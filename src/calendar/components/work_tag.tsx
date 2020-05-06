import React from 'react';
import style from './work_tag.module.scss';

interface IProps {
  index: number;
  free?: string;
}

const workStrings = ['日勤', '休み', '有休', '研修']

const WorkTag = (props: IProps) => {
  const { index, free } = props;
  return (
    <p className={`${style.root} ${free ? style.free : style[`color_${index}`]}`}>{free ?? workStrings[index - 1]}</p>
  )
}

export default WorkTag;
