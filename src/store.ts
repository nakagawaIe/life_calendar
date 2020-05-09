import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { CalendarReducer } from './calendar/reducer/calendar_reducer';
import { SettingReducer } from './setting/reducer/setting_reducer';

const reducers = combineReducers({
  calendar: CalendarReducer,
  setting: SettingReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));