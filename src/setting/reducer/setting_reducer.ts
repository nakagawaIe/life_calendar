const SETTING_STORAGE = 'setting';

enum TYPE {
  SETTING_UPDATE = 'SettingUpdate',
}

export interface IAction {
  type: TYPE;
  work: string[];
}
type IState = ReturnType<typeof initialState>;


function initialState() {
  const getSetting = localStorage.getItem(SETTING_STORAGE);
  const work: IAction['work'] = getSetting ? JSON.parse(getSetting) : ['日勤', '休み', '有休', '夜勤', '研修', '早番'];

  return {
    work,
  }
}

function reducer(state = initialState(), action: IAction): IState {
  switch (action.type) {
    case TYPE.SETTING_UPDATE: {
      const { work } = action;
      localStorage.setItem(SETTING_STORAGE, JSON.stringify(work));
      return {
        ...state,
        work,
      };
    }
  }
  return state;
}

export {
  reducer as SettingReducer,
  TYPE as SETTING_ACTION_TYPE,
}