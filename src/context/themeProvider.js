// ThemeProvider.js
import React from 'react';
import ThemeContext from './themeContext';

const ThemeProvider = ({ children }) => {
  const theme = {
    color: 'blue',
    background: 'lightgray',
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
