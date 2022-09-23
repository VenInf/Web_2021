import React from "react";

import "./css/User.css";

let income =0;
export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      brokers: props.brokers,
      stocks: props.stocks,
      amount: 0,
      id: 0,
      message: ''
    };
  }

  render() {
    return (
      <div className="User">
        <div className="header">
          <p> {this.props.name} Income: {income}</p>
        </div>
        {this.props.started &&
          <div className="broker">
            {this.state.message !== '' && <p className="warning">{this.state.message}</p>}
            <p>Id: <input type="number" min="0" step="1" onChange={this.getId}/></p>
            <p>Amount: <input type="number" min="0" step="1" onChange={this.getAmount}/></p>
            <button className="button" onClick={this.sell}>Sell</button>
            <button className="button" onClick={this.buy}>Buy</button>
          </div>}
        <div className="brokers">
          {this.getBrokers(this.props.name, this.props.brokers)}
        </div>
        <div className="trades">
          {this.getTrades(this.props.stocks)}</div>
      </div>
    );
  }

  getId = (event) => {
    this.setState({ id: Number(event.target.value) });
  };

  getAmount = (event) => {
    this.setState({ amount: Number(event.target.value) });
  };

  getBrokers(brokerName, brokers)
  {
    for (let i = 0; i < brokers.length; i++)
    {
      var brokerI = undefined;
      if (brokers[i].brokerName === brokerName)
      {
        brokerI = i;
        break;
      }
    }
    if (brokerI === undefined)
    {
      return;
    }

    let res = [];
    income = brokers[brokerI].money - brokers[brokerI].startMoney;
    res.push(<p key={1}>Money: {brokers[brokerI].money} </p>);
    let array = [];
    for (let i = 0; i < brokers[brokerI].stocks.length; i++) {
      array.push(
        <div className="item" key={i}>
          <p>Id: {i}</p>
          <p>You have: {brokers[brokerI].stocks[i]}</p>
          <p>Spent money: {brokers[brokerI].price[i]}</p>
          <p>On trades: {brokers[brokerI].onTradeStocks[i]} </p>
        </div>
      );
    }
    res.push(
      <div className="itemArray" key={2}>
        {array}
      </div>
    );
    return <div className="broker">{res}</div>;
  }

  getTrades(stocks) {
    let array = [];
    for (let i = 0; i < stocks.length; i++) {
      array.push(
        <div className="item" key={i}>
          <p>Id: {i}</p>
          <p>Avaliable: {stocks[i].inTrade}</p>
          <p>Price: ${stocks[i].price}</p>
        </div>
      );
    }
    return (
      <div className="broker">
        <p>Stocks on trades</p>
        <div className="itemArray">
          {array}
        </div>
      </div>
    );
  }

  sell = () => {
    if (this.state.id > this.props.stocks.length)
    {
      this.setState({ message: "Wrong stock id"});
      return;
    }
    let brokers = this.props.brokers;
    var brokerI = undefined;
    for (let i = 0; i < brokers.length; i++)
    {
      if (brokers[i].name === this.state.name)
      {
        brokerI = i;
        break;
      }
    }
    if (brokerI === undefined)
    {
      return;
    }

    if (this.state.amount > brokers[brokerI].stocks[this.state.id])
    {
      this.setState({ message: "To much to sell"});
      return;
    }
    this.setState({ message: ''});
    this.props.sell(this.props.name, this.state.id, this.state.amount);
  };

  buy = () => {
    let brokers = this.props.brokers;
    if (this.state.id > this.props.stocks.length)
    {
      this.setState({ message: 'Wrong broker ID'});
      return;
    }

    var brokerI = undefined;
    for (let i = 0; i < brokers.length; i++)
    {
      if (brokers[i].name === this.state.name)
      {
        brokerI = i;
        break;
      }
    }

    if (brokerI === undefined)
    {
      return;
    }

    if (this.state.amount > this.props.stocks[this.state.id].inTrade)
    {
      this.setState({ message: 'Not enough stocks for sale'});
      return;
    }
    
    let reqMoney = this.props.stocks[this.state.id].price * this.state.amount;
    if (brokers[brokerI].money < reqMoney)
    {
      this.setState({ message: 'Not enough money'});
      return;
    }

    this.setState({ message: ''});
    this.props.buy(this.props.name, this.state.id, this.state.amount);
  };
}
