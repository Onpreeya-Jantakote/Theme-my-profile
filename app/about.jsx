import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

const About = () => {
  const { color } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: color.background }]}>
      <View style={styles.innerContainer}>
        <Text style={[styles.title, { color: color.text }]}>About Us</Text>
        <Text style={[styles.subtitle, { color: color.textSecondary }]}>รายวิชา React Native</Text>

        <Text style={[styles.text, { color: color.textSecondary }]}>
          เราคือทีมผู้พัฒนาที่มีความตั้งใจและหลงใหลในการสร้างแอปพลิเคชันที่ยอดเยี่ยม
          เป้าหมายของเราคือการส่งมอบซอฟต์แวร์คุณภาพสูงที่ช่วยยกระดับประสบการณ์ผู้ใช้และตอบสนองความต้องการของลูกค้า
        </Text>

        <View style={styles.toggleWrapper}>
          <ThemeToggle />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { marginVertical: 20, marginHorizontal: 24, alignItems: "center" },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 12 },
  subtitle: { fontSize: 20, fontWeight: "600", marginBottom: 16 },
  text: { fontSize: 16, lineHeight: 24, textAlign: "center" },
  toggleWrapper: {
    marginTop: 30,
  },
});

export default About;
