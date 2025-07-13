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
        <View style={[styles.card, { backgroundColor: color.surface, shadowColor: color.shadow }]}>
          <Image
            source={require("../assets/images/Aj Tanapattara.jpg")}
            style={styles.profileImage}
            resizeMode="cover"
          />

          <View style={styles.infoSection}>
            <Text style={[styles.name, { color: color.text }]}>
              AJ. Tanapattara Wongkhamchan
            </Text>
            <Text style={[styles.bio, { color: color.secondary }]}>
              Hybrid Mobile Application Programming
            </Text>

            <View style={[styles.divider, { backgroundColor: color.divider || "#ccc" }]} />

            <Text style={[styles.description, { color: color.textSecondary }]}>
              Hardware architecture, characteristics and limitations of mobile devices, tools and languages for cross platform mobile application development, cross platform language programing, cross platform application development process for mobile devices, how to use memory and data store, user permission and hardware access permission, user interface, communication with external systems, interfacing with server, mobile application testing using computer system simulation, security issues, hands-on practice
            </Text>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={[styles.statNumber, { color: color.primary }]}>REACT NATIVE</Text>
                <Text style={[styles.statLabel, { color: color.textSecondary }]}>Programming Language</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: color.primary }]}
              onPress={() => { }}
            >
              <Text style={styles.buttonText}>tanapattara@kku.ac.th</Text>
            </TouchableOpacity>
          </View>
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
  card: {
    margin: 20,
    borderRadius: 20,
    overflow: "hidden",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },
  profileImage: {
    width: "100%",
    height: 260,
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
    letterSpacing: 0.5,
  },

  bio: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 12,
  },
  divider: {
    height: 1,
    marginVertical: 12,
    borderRadius: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
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
    fontSize: 20,
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
