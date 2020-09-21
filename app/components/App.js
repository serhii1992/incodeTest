import '../styles/application.scss';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setPrice, setExchange, setLastTradeTime } from './../reducers/timerReducer';
import { connectToSocket, changeInterval } from '../services/tickerService';
import { intervals } from './../constants/common';
import moment from 'moment';

// The below line is here as an example of getting prices

class App extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			bgPrice: '',
			activeInterval: null,
			visiblePopup: false
		};
	}

	toogleVisiblePopup = (e) => {
		e.stopPropagation();
		this.setState({ visiblePopup: !this.state.visiblePopup });
	};

	handleOutsideClick = (e) => {
		this.setState({ visiblePopup: false });
	};

	componentDidMount() {
		connectToSocket('APL', ({ price, exchange, last_trade_time }) => {
			this.props.setPrice(price);
			this.props.setExchange(exchange);
			this.props.setLastTradeTime(last_trade_time);
		});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.price < this.props.price) {
			this.setState({ bgPrice: 'greenBgPrice' });
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.setState(() => ({ bgPrice: '' }));
			}, 500);
		} else if (prevProps.price > this.props.price) {
			this.setState({ bgPrice: 'redBgPrice' });
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.setState(() => ({ bgPrice: '' }));
			}, 500);
		}
	}

	render() {
		return (
			<div className={'wrapperApp'} onClick={this.handleOutsideClick}>
				<div className="stock-ticker">
					<div className={'exchange'}>Exchange: {this.props.exchange}</div>
					<div className = {'priceBlock'}> 
						<span>Live price: </span>
						<span className={`${this.state.bgPrice}`}>{this.props.price} </span>
						<span className={'selectInterval'} onClick={this.toogleVisiblePopup}>
							change interval:
						</span>
					</div>
					<div className={'lastTradeTime'}>{`Last trade time: ${moment.utc(this.props.lastTradeTime).format('MM/DD/YY kk:mm:ss')} `}</div>
					{this.state.visiblePopup && (
						<div className="intervalPopup">
							{intervals.map((interval, index) => (
								<div
									className={` intervalPopup_item ${this.state.activeInterval === index
										? 'active'
										: ''}`}
									key={index}
									onClick={(e) => {
										changeInterval(interval);
										this.setState({ activeInterval: index });
									}}
								>
									{`${interval / 1000} seconds`}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		price: state.timerReducer.price,
		exchange: state.timerReducer.exchange,
		lastTradeTime: state.timerReducer.lastTradeTime
	};
};

export default connect(mapStateToProps, { setPrice, setExchange, setLastTradeTime })(App);
