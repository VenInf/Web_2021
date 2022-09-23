const stocks = require("../../data/stocks.json");
const brokers = require("../../data/brokers.json");

let io;

module.exports.setupIo = function (server) {
  io = require('socket.io')(server);

  function emitUpdateHelper(socket)
  {
    socket.json.emit("update", {
      stocks: stocks,
      brokers: brokers,
      started: true
    });
    socket.broadcast.json.emit("update", {
      stocks: stocks,
      brokers: brokers,
      started: true
    });
  }

  function emitLoginHelper(socket, dataName)
  {
    socket.json.emit("update", {
      stocks: stocks,
      brokers: brokers,
      started: false
    });
    socket.json.emit("find_broker", {
      name: dataName,
      started: false
    });
  }

  io.on("connection", function (socket)
  {
    socket.on("login", function (data)
    {
      if (data.name === "admin")
      {
        emitLoginHelper(socket, data.name);
        return;
      }

      for (let broker of brokers)
      {
        if (broker.name === data.name)
        {
          emitLoginHelper(socket, data.name);
          return;
        }
      }
    });

    socket.on("start", ()=> {
      socket.broadcast.json.emit("start_trades");
      socket.json.emit("start_trades");
      setInterval(() => {
        for (let stock of stocks)
        {
          switch (stock.distribution)
          {
            case "even":
              stock.price = Math.round(stock.stPrice + (Math.random() - 0.5) * stock.max * 2);
              break;
            case "normal":
              stock.price = Math.round(stock.stPrice + (randNormal(stocks.length) - 0.5) * stock.max * 2);
              break;
            default:
              break;
          }
        }
        for (let broker of brokers)
        {
          for (let i = 0; i < stocks.length; i++)
          {
            broker.price[i] = broker.stocks[i] * stocks[i].price;
            broker.onTradePrice[i] = broker.onTradeStocks[i] * stocks[i].price;
          }
        }
        emitUpdateHelper(socket);

      }, 1000);
    });

    socket.on("sell", function (data) {
      let id = Number(data.id);
      let amount = Number(data.amount);
      var theBroker = undefined;
      for (let broker of brokers)
      {
        if (broker.name === data.name)
        {
          theBroker = broker;
        }
      }

      if (theBroker !== undefined)
      {
        theBroker.stocks[id] -= amount;
        theBroker.onTradeStocks[id] += amount;
        theBroker.price[id] = theBroker.stocks[id] * stocks[id].price;
        theBroker.onTradePrice[id] = theBroker.onTradeStocks[id] * stocks[id].price;
        stocks[id].inTrade += amount;
        emitUpdateHelper(socket);
      }
    });

    socket.on("buy", function (data) {
      let id = Number(data.id);
      let amount = Number(data.amount);
      var theBroker = undefined;
      for (let broker of brokers)
      {
        if (broker.name === data.name)
        {
          theBroker = broker;
        }
      }

      if (theBroker.name === data.name)
      {
        theBroker.money -= amount * stocks[id].price;
        theBroker.stocks[id] += amount;
        theBroker.price[id] = theBroker.stocks[id] * stocks[id].price;
        stocks[id].inTrade -= amount;
        buyStocks(amount, id);
        emitUpdateHelper(socket);
      }
    });
  });
}

function randNormal(n)
{
  let sum = 0;
  for (let i = 0; i < n; ++i)
    sum += Math.random();
  return sum / n;
}

function buyStocks(amount, id)
{
  for (let broker of brokers)
  {
    if (broker.onTradeStocks[id] > 0) {
      let currentAmount = broker.onTradeStocks[id] - amount;
      if (currentAmount < 0)
      {
        amount = -currentAmount;
        broker.money += broker.onTradeStocks[id] * stocks[id].price;
        broker.onTradeStocks[id] = 0;
      }
      
      if (currentAmount >= 0)
      {
        broker.money += amount * stocks[id].price;
        broker.onTradeStocks[id] -= amount;
      }
      broker.onTradePrice[id] = broker.onTradeStocks[id] * stocks[id].price;
    }
  }
}
