import React, { createContext, useState } from "react";

export const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const [active, setActive] = useState("hiiiiiii!!!!!!!!!!!");
  return (
    <TestContext.Provider value={{ active, setActive }}>
      {children}
    </TestContext.Provider>
  );
};
