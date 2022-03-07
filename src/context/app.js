import React, { createContext, useContext, useState } from "react";
const AppContext = createContext();
const useApp = () => useContext(AppContext);
const AppProvider = ({ children, value = {} }) => (
  <AppContext.Provider value={useState({ ...value })}>
    {children}
  </AppContext.Provider>
);

export { AppProvider, useApp };
