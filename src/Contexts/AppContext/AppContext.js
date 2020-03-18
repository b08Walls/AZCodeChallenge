import React, { useState } from "react";

const AppContext = React.createContext([{}, () => {}]);

const AppContextProvider = props => {
  const [state, setState] = useState(() => {
    try {
      const lsState = localStorage.getItem("StockManagerAppContext");

      return lsState ? JSON.parse(lsState) : {};
    } catch (error) {
      console.log(error);
      return {};
    }
  });

  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };
