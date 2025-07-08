import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

const Home = () => {
  const insets = useSafeAreaInsets();
  const { color, profileImage } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: color.background, paddingTop: insets.top }]}>
      <View style={[styles.card, { backgroundColor: color.surface, shadowColor: color.shadow }]}>
        <Image source={profileImage} style={[styles.profileImage, { borderColor: color.primary }]} />
        <Text style={[styles.name, { color: color.text }]}>Onpreeya Jantakote</Text>
        <Text style={[styles.detail, { color: color.textSecondary }]}>Computer Science & Information</Text>
        <View style={styles.detailRow}>
          <Ionicons name="location-sharp" size={16} color={color.textSecondary} />
          <Text style={[styles.detail, { color: color.textSecondary }]}>Khon Kaen University</Text>
        </View>

        <TouchableOpacity style={[styles.aboutBtn, { backgroundColor: color.primary }]}>
          <Ionicons name="information-circle-outline" size={18} color="#000" style={{ marginRight: 6 }} />
          <Text style={[styles.aboutBtnText, { color: "#000" }]}>About Us</Text>
        </TouchableOpacity>

        <View style={[styles.emailContainer, { backgroundColor: color.primary + "22" }]}>
          <Text style={[styles.emailText, { color: color.primary }]}>onpreeya.ja@kkumail.com</Text>
        </View>

        <View style={styles.toggleWrapper}>
          <ThemeToggle />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    margin: 20,
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 16,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 12,  // สำหรับ android เงา
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    marginBottom: 16,
  },
  name: { fontSize: 22, fontWeight: "bold" },
  detail: { fontSize: 14, marginTop: 4 },
  detailRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 },
  aboutBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  aboutBtnText: { fontWeight: "600", fontSize: 15 },
  emailContainer: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  emailText: { fontWeight: "bold" },
  toggleWrapper: {
    marginTop: 30,
  },
});

export default Home;
