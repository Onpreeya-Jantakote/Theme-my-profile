import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ProjectsTab = () => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card}>
        <Image
          source={require("../assets/images/events-project.jpg")}
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>CIS Event Hub</Text>
        <Text style={styles.cardDescription}>เว็บแอปพลิเคชันจัดการกิจกรรมสําหรับนักศึกษา</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Image
          source={require("../assets/images/fitway-project.png")}
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>FIT WAY</Text>
        <Text style={styles.cardDescription}>เว็บแอปพลิเคชันสําหรับคํานวณสารอาหาร - จัดตารางออกกําลังกาย</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    width: "45%",
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#1f2937",
  },
  cardDescription: {
    fontSize: 12,
    color: "#6b7280",
  },
});

export default ProjectsTab;
