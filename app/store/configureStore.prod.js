import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import timerReducer from '../reducers/timerReducer';

export const history = createHistory();
const middleware = routerMiddleware(history);


export function configureStore(initialState) {
    return createStore(
        redusers,
        rootReducer,
        initialState,
        applyMiddleware(middleware),
    );
}
