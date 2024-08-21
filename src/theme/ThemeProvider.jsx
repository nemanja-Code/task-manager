import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const ThemeContext = createContext();

function ThemeProvider({ children }){
   const [theme, setTheme] = useState("light");

   const toggleTheme = () => {
     setTheme(t => (t === "light" ? "dark" : "light"));
   };

   return (
     <ThemeContext.Provider value={{ theme, toggleTheme }}>
       {children}
     </ThemeContext.Provider>
   );
};
ThemeProvider.propTypes = {children: PropTypes.node}
export default ThemeProvider;
