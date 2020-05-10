import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CALENDAR } from '../../_common/strings';
import { CALENDAR_ACTION_TYPE, ICalendarData, MENST, EVENT, IMenstPeriods } from '../reducer/calendar_reducer';
import { ISettingsWork } from '../../setting/reducer/setting_reducer';
import style from './calendar_detail.module.scss';
import closeIcn from './icn/close.svg'
import tieIcn from './icn/tie.svg'
import editIcn from './icn/feather.svg'
import toiletIcn from './icn/toilet.svg'
import fruitIcn from './icn/fruit.svg'
import eventIcn from './icn/event.svg'
import heartIcn from './icn/heart.svg'
import thundarIcn from './icn/thundar.svg'
import bloodIcn from './icn/blood.svg'
import noteIcn from './icn/technology.svg'
import WorkTag from './work_tag'

interface IProps {
  year: number;
  month: number;
  date: number;
  closeHandler: Function;
  data: Partial<ICalendarData>;
  menstPeriod: boolean;
}

const CalendarDetail = (props: IProps) => {
  const { year, month, date, data, menstPeriod } = props;
  const { work, plan, unti, menst, event, memo } = data;
  const [workState, setWorkState] = useState(work);
  const [planState, setPlanState] = useState(plan);
  const [untiState, setUntiState] = useState(unti);
  const [menstState, setMenstState] = useState(menst);
  const [eventState, setEventState] = useState(event);
  const [memoState, setMemoState] = useState(memo);
  const workTags = useSelector((state: { setting: { work: ISettingsWork } }) => state.setting.work);

  const dispatch = useDispatch();
  const id = `${year}/${month}/${date}`;
  const updateCalendar = useCallback(() => {
    dispatch({
      type: CALENDAR_ACTION_TYPE.CALENDAR_UPDATE,
      id,
      data: {
        work: workState,
        plan: planState,
        unti: untiState,
        menst: menstState,
        event: eventState,
        memo: memoState,
      }
    })
  }, [dispatch, id, workState, planState, untiState, menstState, eventState, memoState])

  const closeDetail = () => {
    return props.closeHandler();
  }

  const menstPeriods = useSelector((state: { calendar: { menstPeriods: IMenstPeriods } }) => state.calendar.menstPeriods);
  const isMesntStart = () => {
    const period = menstPeriods.length === 0 ? false : menstPeriods.find(m => m[1] === undefined);
    const future = new Date() < new Date(id);
    return period || future;
  }

  const updateWork = (index: ICalendarData['work']) => {
    setWorkState(index === workState ? undefined : index);
  }
  const updateUnti = (index: ICalendarData['unti']) => {
    setUntiState(index === untiState ? undefined : index);
  }
  const updateMenst = (str: MENST) => {
    setMenstState(str === menstState ? undefined : str);
  }
  const updateEvent = (event: EVENT) => {
    const set = new Set(eventState);
    if (set.has(event)) set.delete(event)
    else set.add(event)
    const events = Array.from(set)
    setEventState(events);
  }
  const changePlan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlanState(e.target.value);
  }
  const changeMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemoState(e.target.value);
  }

  const createWorkElm = () => {
    const elm = [];
    for (let i = 0; i < workTags.length; i += 1) {
      elm.push(
        <li className={work === i ? style.active : ''} onClick={() => updateWork(i)} key={i}>
          <WorkTag index={i} />
        </li>
      )
    }
    return elm;
  }

  useEffect(() => {
    updateCalendar();
  }, [workState, planState, untiState, menstState, eventState, memoState, updateCalendar]);

  return (
    <div className={style.root}>
      <div className={style.head}>
        <h2 className={style.date}>{id}</h2>
        <button className={style.close} onClick={closeDetail}>
          <img src={closeIcn} alt="close" />
        </button>
      </div>

      <div className={style.inputWrap}>
        <div className={style.box}>
          <h3 className={style.title}><img src={tieIcn} alt={CALENDAR.WORK} /></h3>
          <div className={style.right}>
            <ul className={style.work}>
              {createWorkElm().map(e => e)}
              {/* <li className={work === workTags.length + 1 ? style.active : ''} onClick={() => updateWork(workTags.length + 1)}>
                <input type="text" className={style.free} placeholder={CALENDAR.FREE} />
              </li> */}
            </ul>
          </div>
        </div>
        <div className={style.box}>
          <h3 className={style.title}><img src={editIcn} alt={CALENDAR.PLAN} /></h3>
          <div className={style.right}>
            <input type="text" className={style.free} value={planState ?? ''} onChange={changePlan} placeholder={CALENDAR.PLAN} />
          </div>
        </div>
        <div className={style.box}>
          <h3 className={style.title}><img src={toiletIcn} alt={CALENDAR.UNTI} /></h3>
          <div className={style.right}>
            <ul className={style.work}>
              <li className={unti === 1 ? style.active : ''} onClick={() => updateUnti(1)}><WorkTag index={0} free="1回" /></li>
              <li className={unti === 2 ? style.active : ''} onClick={() => updateUnti(2)}><WorkTag index={0} free="2回" /></li>
              <li className={unti === 3 ? style.active : ''} onClick={() => updateUnti(3)}><WorkTag index={0} free="3回" /></li>
            </ul>
          </div>
        </div>
        <div className={style.box}>
          <h3 className={style.title}><img src={fruitIcn} alt={CALENDAR.MENST} /></h3>
          <div className={style.right}>
            <ul className={style.menstBtn}>
              <li className={menst === MENST.START ? style.active : '' || isMesntStart() ? style.disable : ''} onClick={() => updateMenst(MENST.START)}>START</li>
              <li className={menst === MENST.STOP ? style.active : '' || !menstPeriod ? style.disable : ''} onClick={() => updateMenst(MENST.STOP)}>STOP</li>
            </ul>
          </div>
        </div>
        <div className={style.box}>
          <h3 className={style.title}><img src={eventIcn} alt={CALENDAR.EVENT} /></h3>
          <div className={style.right}>
            <ul className={style.work}>
              <li className={event?.find(e => e === EVENT.SEX) ? style.active : ''} onClick={() => updateEvent(EVENT.SEX)}>
                <img src={heartIcn} alt={EVENT.SEX} />
              </li>
              <li className={event?.find(e => e === EVENT.BAD) ? style.active : ''} onClick={() => updateEvent(EVENT.BAD)}>
                <img src={thundarIcn} alt={EVENT.BAD} />
              </li>
              <li className={event?.find(e => e === EVENT.BLOOD) ? style.active : ''} onClick={() => updateEvent(EVENT.BLOOD)}>
                <img src={bloodIcn} alt={EVENT.BLOOD} />
              </li>
            </ul>
          </div>
        </div>
        <div className={style.box}>
          <h3 className={style.title}><img src={noteIcn} alt={CALENDAR.MEMO} /></h3>
          <div className={style.right}>
            <textarea className={style.textarea} value={memoState} onChange={changeMemo} placeholder={CALENDAR.MEMO} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarDetail;
