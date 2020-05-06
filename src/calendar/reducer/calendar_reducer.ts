enum TYPE {
  CALENDAR_FETCH = 'CalendarFetch',
  CALENDAR_UPDATE = 'CalendarUpdate',
}

export enum MENST {
  START = 'start',
  STOP = 'stop',
}

export interface ICalendar {
  id: number;
  data: ICalendarData;
}
export interface ICalendarData {
  work: number;
  plan: string;
  menst: MENST.START | MENST.STOP;
  unti: number;
  memo: string;
}

function initialState() {
  return {
    calendars: [
      {
        id: 2020522,
        data: {
          work: 2,
          plan: 'むつみの誕生日',
          menst: MENST.START,
          unti: 2,
          memo: 'その他なんでも記入OK'
        }
      },
      {
        id: 2020528,
        data: {
          work: 1,
          plan: '',
          menst: MENST.STOP,
          unti: 1,
          memo: 'テキストテキスト'
        }
      }
    ] as ICalendar[],
  };
}

function reducer(state = initialState(), action: any): IState {
  switch (action.type) {
    case TYPE.CALENDAR_FETCH: {
      return {
        ...state,
        calendars: action.calendars,
      };
    }
    case TYPE.CALENDAR_UPDATE: {
      const { calendars } = state;
      const { data } = action;
      const target = calendars.find(c => c.id === data.id);
      if (target) {
        const removedCalendars = calendars.filter(c => c.id !== data.id)
        target.data = {
          work: data.work,
          plan: data.plan,
          unti: data.unti,
          menst: data.menst,
          memo: data.memo,
        }

        return {
          ...state,
          calendars: removedCalendars.concat(target),
        };
      }
      return {
        ...state,
        calendars: calendars.concat(action.data),
      };
    }
  }
  return state;
}


// interface IActions {
//   [TYPE.CALENDAR_FETCH]: {
//     calendar: ICalendar;
//   };
//   [TYPE.CALENDAR_UPDATE]: {
//     calendar: ICalendar;
//   };
// }

// type Action = ActionTypeCreator<IActions>;
type IState = ReturnType<typeof initialState>;

export {
  reducer as CalendarReducer,
  TYPE as CALENDAR_ACTION_TYPE,
};