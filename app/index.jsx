import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const insets = useSafeAreaInsets();
  const { color, profileImage, isDarkMode } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: color.background, paddingTop: insets.top }]}>
      <StatusBar
        backgroundColor={color.background}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={[styles.card, { backgroundColor: color.surface, shadowColor: color.shadow }]}>
          <Text style={[styles.studentId, { color: color.textSecondary }]}>
            ID: 653450107-5
          </Text>

          <Image source={profileImage} style={[styles.profileImage, { borderColor: color.primary }]} />

          <Text style={[styles.name, { color: color.text }]}>Onpreeya Jantakote</Text>
          <Text style={[styles.detail, { color: color.textSecondary }]}>
            Computer Science & Information
          </Text>

          <View style={styles.detailRow}>
            <Ionicons name="location-sharp" size={16} color={color.textSecondary} />
            <Text style={[styles.detail, { color: color.textSecondary }]}>
              Khon Kaen University
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.aboutBtn, { backgroundColor: color.primary + "dd", shadowColor: color.primary }]}
            onPress={() => navigation.navigate("about")}
          >
            <Ionicons name="information-circle-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.aboutBtnText}>About</Text>
          </TouchableOpacity>

          <View style={[styles.emailContainer, { backgroundColor: color.primary + "22", borderColor: color.primary }]}>
            <Text style={[styles.emailText, { color: color.primary }]}>
              onpreeya.ja@kkumail.com
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: color.divider || "#ccc" }]} />

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="envelope" size={20} color={color.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="github" size={20} color={color.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="linkedin" size={20} color={color.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="instagram" size={20} color={color.text} />
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeToggleWrapper: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
  },
  card: {
    margin: 20,
    borderRadius: 24,
    alignItems: "center",
    paddingVertical: 36,
    paddingHorizontal: 20,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
    elevation: 12,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    marginBottom: 16,
    marginTop: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },

  detail: {
    fontSize: 14,
    marginTop: 4,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  aboutBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 24,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  aboutBtnText: {
    fontWeight: "600",
    fontSize: 15,
    color: "#fff",
  },
  emailContainer: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 24,
    borderWidth: 1.5,
  },
  emailText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  divider: {
    height: 1,
    width: "90%",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 1,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  iconButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "transparent",
  },
  studentId: {
    fontSize: 13,
    fontStyle: "italic",
    alignSelf: "flex-end",
    marginBottom: 20,
  },

});

export default Home;