import React, { useState } from 'react';
import style from './contact.module.scss';
import { CONTACT } from '../../_common/strings';
import closeIcn from '../../calendar/components/icn/close.svg'

const Contact = () => {
  const [showState, setShowState] = useState(false);

  const toggleForm = () => {
    setShowState(!showState);
  }

  return (
    <div className={style.root}>
      <p className={style.read}>{CONTACT.READ}</p>
      <h2 className={style.title} onClick={toggleForm}>
        <img src={closeIcn} alt="close" className={`${style.icn} ${showState ? style.active : ''}`} />
        {showState ? CONTACT.TITLE_CLOSE : CONTACT.TITLE_OPEN}
      </h2>
      {showState && <iframe src="https://tacs-port.tech/contact/" title={CONTACT.TITLE_OPEN} className={style.iframe} />}
    </div>
  )
}

export default Contact;
