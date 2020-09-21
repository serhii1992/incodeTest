import  timerReducer  from './timerReducer';
import { combineReducers } from 'redux';

const redusers = combineReducers  ({
    timerReducer: timerReducer,
})

export default redusers;
