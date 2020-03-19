import React, { useContext, useEffect, useCallback } from "react";
import { SocketContext } from "../../Contexts/SocketContext/SocketContext";
import { AppContext } from "../../Contexts/AppContext/AppContext";
import { finnHubKey } from "./../../Constants/Keys";
const SocketManager = props => {
  const [socketData, setSocketData] = useContext(SocketContext);
  const [state, setState] = useContext(AppContext);

  const globalSelectedStock = state.selectedStock;

  const socket = new WebSocket(`wss://ws.finnhub.io?token=${finnHubKey}`);

  const handleMessage = useCallback(
    event => {
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
        console.log(values);
        if (values && values[0] && data.data[0].s === globalSelectedStock) {
          const newData = [...values, ...(socketData.data || [])];
          setSocketData({ data: newData });
        }
      } catch (e) {
        console.log("error in socket", e);
      }
    },
    [globalSelectedStock, setSocketData, socketData.data]
  );

  // First setup execution, configuring socket message callback
  useEffect(() => {
    // Connection opened
    socket.addEventListener("open", function(event) {
      globalSelectedStock &&
        socket.send(
          JSON.stringify({ type: "subscribe", symbol: globalSelectedStock })
        );
    });
    // Listen for messages
    socket.addEventListener("message", handleMessage);
  }, [globalSelectedStock, handleMessage, socket]);

  useEffect(() => {
    console.log(socketData);
  }, [socketData]);

  return <div />;
};

export default SocketManager;
