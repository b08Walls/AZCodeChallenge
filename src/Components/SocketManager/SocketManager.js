import React, { useContext, useEffect } from "react";
import { SocketContext } from "../../Contexts/SocketContext/SocketContext";
import { AppContext } from "../../Contexts/AppContext/AppContext";
import { finnHubKey } from "./../../Constants/Keys";
const SocketManager = props => {
  const [socketState, setSocketState] = useContext(SocketContext);
  const [state, setState] = useContext(AppContext);

  const { myStocks } = state;
  const socket = new WebSocket(`wss://ws.finnhub.io?token=${finnHubKey}`);
  useEffect(() => {
    const _myStocks = myStocks ? Object.keys(myStocks) : null;
    if (_myStocks) {
      console.log("HAY STOCKS PARA REGISTRAR");
      // Connection opened -> Subscribe
      socket.addEventListener("open", function(event) {
        _myStocks.forEach(s => {
          console.log("subscribing to: ", s);
          socket.send(JSON.stringify({ type: "subscribe", symbol: s }));
        });
      });

      // Listen for messages
      socket.addEventListener("message", function(event) {
        try {
          const data = JSON.parse(event.data);
          const values = data.data.map(v => ({
            date: new Date(v.t),
            volume: Number(v.v),
            high: Number(v.p),
            low: Number(v.p),
            open: Number(v.p),
            close: Number(v.p)
          }));

          // const symbol = data[0].s;
          // if (symbol) {
          //   const symbolArray = [...(socketState[symbol] || []), ...values];
          //   const tempSocketState = { ...socketState };
          //   tempSocketState[symbol] = symbolArray;
          //   setSocketState(tempSocketState);
          // }

          console.log(values);
        } catch (e) {
          console.log("error in socket", e);
        }
      });

      // Unsubscribe
      var unsubscribe = function(symbol) {
        socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
      };
    }
  }, [myStocks, socket]);

  useEffect(() => {
    console.log(socketState);
  }, [socketState]);

  return <div />;
};

export default SocketManager;
