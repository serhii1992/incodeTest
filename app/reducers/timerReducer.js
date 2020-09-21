const SET_PRICE = 'SET_TIMER';
const SET_EXCHANGE = 'SET_EXCHANGE';
const SET_LAST_TRADE_TIME = 'SET_LAST_TRADE_TIME';


const initialState = {
    exchange: '',
    price: null,
    lastTradeTime: null
};

const timerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRICE:
            return {
                ...state, price: action.price
            };
        case SET_EXCHANGE:
            return {
                ...state, exchange: action.exchange
            };
        case SET_LAST_TRADE_TIME:
            return {
                ...state, lastTradeTime: action.lastTradeTime
            };
        default:
            return state;
    }
};

export const setPrice = price => ({type: SET_PRICE, price});
export const setExchange = exchange => ({type: SET_EXCHANGE, exchange});
export const setLastTradeTime = lastTradeTime => ({type: SET_LAST_TRADE_TIME, lastTradeTime});


export default timerReducer;