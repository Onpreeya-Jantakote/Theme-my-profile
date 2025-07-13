import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { useTheme } from "./context/ThemeContext";

const About = () => {
  const { color, isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: color.background }]}>
      <StatusBar
        backgroundColor={color.background}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />

      <ScrollView contentContainerStyle={styles.scroll}>
        <Image
          source={require("../assets/images/Aj Tanapattara.jpg")}
          style={styles.profileImage}
          resizeMode="cover"
        />

        <View style={styles.infoSection}>
          <Text style={[styles.name, { color: color.text }]}>
            Tanapattara Wongkhamchan
          </Text>
          <Text style={[styles.bio, { color: color.textSecondary }]}>
            Hybrid Mobile Application Programming
          </Text>

          <Text style={[styles.description, { color: color.textSecondary }]}>
            Hardware architecture, characteristics and limitations of mobile devices, tools and languages for cross platform mobile application development, cross platform language programing, cross platform application development process for mobile devices, how to use memory and data store, user permission and hardware access permission, user interface, communication with external systems, interfacing with server,, mobile application testing using computer system simulation, security issues, hands-on practice
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: color.text }]}>200+</Text>
              <Text style={[styles.statLabel, { color: color.textSecondary }]}>ผู้เรียนแล้ว</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: color.text }]}>3</Text>
              <Text style={[styles.statLabel, { color: color.textSecondary }]}>วิชาที่สอน</Text>
            </View>
          </View>

          {/* ปุ่ม */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: color.primary }]}
            onPress={() => { }}
          >
            <Text style={styles.buttonText}>tanapattara@kku.ac.th</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    paddingBottom: 40,
  },
  profileImage: {
    width: "100%",
    height: 280,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 13,
    marginTop: 4,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});

export default About;
