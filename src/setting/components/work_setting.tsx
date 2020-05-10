import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { SETTING_ACTION_TYPE, ISettingsWork } from '../reducer/setting_reducer';
import style from './work_setting.module.scss';
import WorkTag from '../../calendar/components/work_tag'

const WorkSetting = () => {
  const work = useSelector((state: { setting: { work: ISettingsWork } }) => state.setting.work);
  const [workState, setWorkState] = useState(work);

  const dispatch = useDispatch();
  const updateSetting = useCallback(() => {
    dispatch({
      type: SETTING_ACTION_TYPE.SETTING_UPDATE,
      work: workState,
    })
  }, [dispatch, workState]);

  const updateWork = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newWorkState = workState.slice();
    newWorkState[index] = e.target.value;
    setWorkState(newWorkState);
  }

  const createInputElm = () => {
    const elm = [];
    for (let i = 0; i < workState.length; i += 1) {
      elm.push(
        <li key={i}>
          <div className={style.tag}><WorkTag index={i} /></div>
          <input className={style.input} value={workState[i]} onChange={(e) => updateWork(i, e)} />
        </li>
      )
    }
    return elm;
  }

  useEffect(() => {
    updateSetting();
  }, [workState, updateSetting]);

  return (
    <ul className={style.root}>
      {createInputElm().map(e => e)}
    </ul>
  )
}

export default WorkSetting;
