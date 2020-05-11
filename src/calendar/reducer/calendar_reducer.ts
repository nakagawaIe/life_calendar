import { ActionTypeCreator } from '../../_common/interface'

const CALENDAR_STORAGE = 'calendar';

enum TYPE {
  CALENDAR_UPDATE = 'CalendarUpdate',
  CALENDAR_IMPORT = 'CalendarImport',
}
export enum MENST {
  START = 'start',
  STOP = 'stop',
}
export enum EVENT {
  SEX = 'sex',
  BAD = 'bad',
  BLOOD = 'blood',
}

export interface ICalendar {
  id: string;
  data: ICalendarData;
}
export interface ICalendarData {
  work: number;
  plan: string;
  unti: number;
  menst: MENST.START | MENST.STOP;
  event: Array<EVENT>;
  memo: string;
}
export type IMenstPeriods = Array<[string, string | undefined, number | null]>;


interface IActions {
  [TYPE.CALENDAR_UPDATE]: {
    id: ICalendar['id'];
    data: ICalendarData;
  };
  [TYPE.CALENDAR_IMPORT]: {
    calendars: ICalendar[];
  };
}
type IState = ReturnType<typeof initialState>;


const getMenstPeriods = (calendars: ICalendar[]) => {
  const start = calendars.filter(c => c.data.menst === MENST.START).map(c => c.id)
  const stop = calendars.filter(c => c.data.menst === MENST.STOP).map(c => c.id)
  const period: IMenstPeriods = [];
  start.forEach((s, i) => {
    const before = stop[i - 1];
    const diffTime = before && new Date(s).getTime() - new Date(before).getTime();
    const diff = diffTime ? Math.floor(diffTime / (1000 * 60 * 60 * 24)) : null;

    period.unshift([s, stop[i], diff])
  })
  return period;
}

function initialState() {
  const getCalendar = localStorage.getItem(CALENDAR_STORAGE);
  const calendars: ICalendar[] = getCalendar ? JSON.parse(getCalendar) : [];

  return {
    calendars: calendars as ICalendar[],
    menstPeriods: getMenstPeriods(calendars),
  }
}

function reducer(state = initialState(), action: ActionTypeCreator<IActions>): IState {
  switch (action.type) {
    case TYPE.CALENDAR_UPDATE: {
      const { calendars } = state;
      const { id, data } = action;
      const target = calendars.find((c: ICalendar) => c.id === id);
      if (target) {
        const removedCalendars = calendars.filter((c: ICalendar) => c.id !== id)
        target.data = {
          work: data.work,
          plan: data.plan,
          unti: data.unti,
          menst: data.menst,
          event: data.event,
          memo: data.memo,
        }
        const newCalendars = removedCalendars.concat(target).sort((a, b) => new Date(a.id) > new Date(b.id) ? 1 : -1);

        localStorage.setItem(CALENDAR_STORAGE, JSON.stringify(newCalendars));
        return {
          ...state,
          calendars: newCalendars,
          menstPeriods: getMenstPeriods(newCalendars),
        };
      }
      const newCalendars = calendars.concat({ id, data });
      return {
        ...state,
        calendars: newCalendars,
        menstPeriods: getMenstPeriods(newCalendars),
      };
    }
    case TYPE.CALENDAR_IMPORT: {
      const { calendars } = action;
      localStorage.setItem(CALENDAR_STORAGE, JSON.stringify(calendars));
      return {
        ...state,
        calendars,
      };
    }
  }
  return state;
}

export {
  reducer as CalendarReducer,
  TYPE as CALENDAR_ACTION_TYPE,
}