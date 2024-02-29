import React, { useContext } from "react";

const styleContext = React.createContext();

const useStyleContext = () => {
    return useContext(styleContext);
};
  
function StyleContext({children}){    
    const [theme, setTheme] = React.useState('green');

    const toggleTheme = () => {
      console.log(`from toggle theme I: ${theme}`)
      setTheme(prevTheme => (prevTheme === 'green' ? 'amber' : 'green'));
      console.log(`from toggle theme II: ${theme}`)
    };

    return (
        <>
            <styleContext.Provider value={{ theme, toggleTheme }}>
                {children}
            </styleContext.Provider>
        </>
    );
};

export { StyleContext, useStyleContext };

