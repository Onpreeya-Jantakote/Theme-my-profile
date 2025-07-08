import { TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Ionicons from 'react-native-vector-icons/Ionicons';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, color } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 5 }}>
      <Ionicons
        name={isDarkMode ? "moon" : "sunny"}
        size={24}
        color={color.text}
      />
    </TouchableOpacity>
  );
};

export default ThemeToggle;