import React, { createContext, useContext, useState } from "react";
const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const useUser = () => {
  const { user, setUser } = useApp();
  return [user, setUser];
};

export const AppProvider = ({ children, value = {} }) => {
  const [user, setUser] = useState();
  return (
    <AppContext.Provider value={{ ...value, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
