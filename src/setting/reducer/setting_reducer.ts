import { ActionTypeCreator } from '../../_common/interface'

const SETTING_STORAGE = 'setting';

enum TYPE {
  SETTING_UPDATE = 'SettingUpdate',
  SETTING_IMPORT = 'SettingImport',
}

export type ISettingsWork = string[];


interface IActions {
  [TYPE.SETTING_UPDATE]: {
    work: string[];
  };
  [TYPE.SETTING_IMPORT]: {
    work: string[];
  };
}
type IState = ReturnType<typeof initialState>;


function initialState() {
  const getSetting = localStorage.getItem(SETTING_STORAGE);
  const work: ISettingsWork = getSetting ? JSON.parse(getSetting) : ['日勤', '休み', '有休', '夜勤', '研修', '早番'];

  return {
    work,
  }
}

function reducer(state = initialState(), action: ActionTypeCreator<IActions>): IState {
  switch (action.type) {
    case TYPE.SETTING_UPDATE: {
      const { work } = action;
      localStorage.setItem(SETTING_STORAGE, JSON.stringify(work));
      return {
        ...state,
        work,
      };
    }
    case TYPE.SETTING_IMPORT: {
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