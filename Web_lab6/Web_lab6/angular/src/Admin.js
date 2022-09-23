import React from "react";

import "./css/Admin.css";

export default class Admin extends React.Component {
  render() {
    return (
      <div className="Admin">
        <div className="header">
          <p>Admin <button className="button" onClick={this.props.startTrades}>Start trades</button></p>
        </div>
        <div className="brokers">{getBrokers(this.props.brokers)}</div>
      </div>
    );

    function getBrokers(br)
    {
      let res = [];
      for (let i = 0; i < br.length; i++)
      {
        let broker = [];
        broker.push(
          <p> {br[i].name} </p>,
        <p> ${br[i].money} </p>
        );

        let array = [];
        for (let j = 0; j < br[i].stocks.length; j++)
        {
          array.push(
            <div className="item" key={j}>
              <p>Id: {j}</p>
              <p>Amount: {br[i].stocks[j]}</p>
              <p>On trades: {br[i].onTradeStocks[j]} </p>
              <p>Price: ${br[i].price[j]}</p>
            </div>
          );
        }
        broker.push(<div className="itemArray" key={2}>{array}</div>);
        res.push( <div className="broker" key={br[i].id}> {broker}</div>);
      }
      return <div>{res}</div>;
    }
  }
}
