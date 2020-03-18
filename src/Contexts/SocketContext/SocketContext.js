import React, { useState } from "react";

const SocketContext = React.createContext([{}, () => {}]);

const SocketContextProvider = props => {
  const [socketState, setSocketState] = useState({});

  return (
    <SocketContext.Provider value={[socketState, setSocketState]}>
      {props.children}
    </SocketContext.Provider>
  );
};

export { SocketContextProvider, SocketContext };
