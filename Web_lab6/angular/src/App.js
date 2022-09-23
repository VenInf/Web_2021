import React from 'react';
import io from 'socket.io-client';

import Login from "./Login";
import Admin from "./Admin";
import User from "./User";

import './css/App.css';

let socket;
class App extends React.Component{
  state = {
    name: 'empty',
    stocks: null,
    brokers: null,
    startTrades: false,
    message: '',
    started:false
  };

  render() {
    return (
      <div className="App">
        {this.getBody()}
      </div>
    );
  }

  getBody() {
    switch (this.state.name) {
      case "empty":
        return <Login login={this.login} message={this.state.message}/>;
      case 'admin':
        return <Admin brokers={this.state.brokers} startTrades={this.start_trades}/>;
      default:
        return (
          <User brokers={this.state.brokers}
                name={this.state.name}
                stocks={this.state.stocks}
                sell={this.sell}
                buy={this.buy}
                started={this.state.started}/>
        );
    }
  }

  login = (event) => {
    event.preventDefault();
    let name = event.target.elements.name.value;
    socket = io("http://localhost:3000");

    socket.on('connect',function(){
      socket.emit('login', {name:name});
    });
    socket.on('find_broker', (data) => {
      this.setState({name: data.name, message: data.message});
    });

    socket.on('update', (data) => {
      this.setState({
        stocks: data.stocks,
        brokers: data.brokers,
        started:data.started
      })
    });

    socket.on('start_trades', () =>{
      this.setState({
        startTrades: true
      });
    });
  };

  start_trades = () => {
    socket.emit('start');
  };

  sell = (name, id, amount) => {
    socket.emit('sell', {name:name, id:id, amount:amount});
  };

  buy = (name, id, amount) => {
    socket.emit('buy', {name:name, id:id, amount:amount});
  };
}

export default App;
