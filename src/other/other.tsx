import React, { useEffect } from 'react';
import style from './other.module.scss';
import { PAGE_TITLE } from '../_common/strings';
import Contact from './components/contact'

const Other = () => {
  useEffect(() => {
    document.title = `その他 - ${PAGE_TITLE}`;
  });

  return (
    <div className={style.root}>
      <Contact />
    </div>
  )
};

export default Other;
