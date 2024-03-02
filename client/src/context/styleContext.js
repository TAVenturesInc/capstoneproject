import React, { useContext } from "react";

const styleContext = React.createContext();

const useStyleContext = () => {
  return useContext(styleContext);
};

function StyleContext({ children }) {
  const [theme, setTheme] = React.useState("green");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "green" ? "amber" : "green"));
  };

  return (
    <>
      <styleContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </styleContext.Provider>
    </>
  );
}

export { StyleContext, useStyleContext };
