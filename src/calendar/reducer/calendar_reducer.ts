const CALENDAR_STORAGE = 'calendar';

enum TYPE {
  CALENDAR_UPDATE = 'CalendarUpdate',
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
  id: number;
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

interface IAction {
  type: TYPE;
  id: ICalendar['id'];
  data: ICalendarData;
}
type IState = ReturnType<typeof initialState>;


function initialState() {
  const getCalendar = localStorage.getItem(CALENDAR_STORAGE);
  const calendars = getCalendar ? JSON.parse(getCalendar) : [];
  return {
    calendars: calendars as ICalendar[],
  }
}

function reducer(state = initialState(), action: IAction): IState {
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
        const newCalendar = removedCalendars.concat(target);

        localStorage.setItem(CALENDAR_STORAGE, JSON.stringify(newCalendar));
        return {
          ...state,
          calendars: newCalendar,
        };
      }
      return {
        ...state,
        calendars: calendars.concat({ id, data }),
      };
    }
  }
  return state;
}

export {
  reducer as CalendarReducer,
  TYPE as CALENDAR_ACTION_TYPE,
}