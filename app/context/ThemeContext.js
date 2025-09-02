import { createContext, useContext, useState } from "react";


const lightProfile = require("../../assets/images/OnpreeyaLight.jpg");
const darkProfile = require("../../assets/images/OnpreeyaDark.png");

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = {
    isDarkMode,
    toggleTheme,
    profileImage: isDarkMode ? darkProfile : lightProfile,
    color: {
      background: isDarkMode ? "#0A0F2F" : "#fff",
      surface: isDarkMode ? "#121A4A" : "#f5f5f5",
      primary: isDarkMode ? "#00FFF7" : "#6200ee",
      secondary: isDarkMode ? "#00B9B0" : "#03dac5",
      text: isDarkMode ? "#00FFF7" : "#000",
      textSecondary: isDarkMode ? "#66FFF6" : "#333",
      error: isDarkMode ? "#FF3B3B" : "#b00020",
      shadow: isDarkMode ? "rgba(0, 255, 247, 0.6)" : "rgba(0,0,0,0.1)",
    },
    statusBarStyle: isDarkMode ? "light-content" : "dark-content",
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
