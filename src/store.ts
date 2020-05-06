import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { CalendarReducer } from './calendar/reducer/calendar_reducer';

const reducers = combineReducers({
  calendar: CalendarReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));