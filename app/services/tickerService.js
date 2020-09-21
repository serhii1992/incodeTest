import io from 'socket.io-client';
let socket = null;

socket = io('http://localhost:4000');

export const connectToSocket = (stockSymbol, cl) => {

    socket.on('connect', () => {
        console.log('connected');

        socket.on(stockSymbol, (data) => {
            cl(JSON.parse(data));
          //  console.log(data);
        });
        socket.emit('ticker', stockSymbol);
    });

    socket.on('disconnect', () => {
        console.log('disconnected');
    });
};

export const changeInterval = (interval) => {
    socket.emit('changeInterval', interval);
}

// "ticker": "APL",
// "exchange": "NASDAQ",
// "price": "198.10",
// "change": "126.71",
// "change_percent": "0.54",
// "last_trade_time": "2020-09-19T10:12:14.000Z",
// "dividend": "0.38",
// "yield": "0.59"