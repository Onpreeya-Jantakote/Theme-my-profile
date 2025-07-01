import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import * as Progress from "react-native-progress";

const SkillCard = ({ image, title, subtitle, progress, level }) => {
  return (
    <TouchableOpacity style={styles.skillCard}>
      <Image source={image} style={styles.skillImage} />
      <View style={styles.skillContent}>
        <Text style={styles.skillTitle}>{title}</Text>
        <Text style={styles.skillSubtitle}>{subtitle}</Text>
        <Text style={styles.skillLevel}>{level}</Text>
        <Progress.Bar progress={progress} width={200} color="#4f46e5" style={styles.skillProgress} />
      </View>
      <Text style={styles.skillArrow}>›</Text>
    </TouchableOpacity>
  );
};

const SkillsTab = () => {
  return (
    <ScrollView style={styles.skillsContainer}>
      <SkillCard
        image={require("../assets/images/React-skill.png")}
        title="React Native"
        subtitle="Learn basic of React from ChatGPT"
        progress={0.5}
        level="Beginner"
      />
      <SkillCard
        image={require("../assets/images/uxui-skill.png")}
        title="UX/UI Design"
        subtitle="Learn basic of UX/UI Design"
        progress={0.9}
        level="Amateur"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  skillsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  skillCard: {
    flexDirection: "row",
    backgroundColor: "#e5e7eb",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  skillImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  skillContent: {
    flex: 1,
  },
  skillTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1f2937",
  },
  skillSubtitle: {
    fontSize: 14,
    color: "#4b5563",
  },
  skillLevel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 5,
  },
  skillProgress: {
    marginTop: 4,
  },
  skillArrow: {
    fontSize: 26,
    color: "#9ca3af",
    marginLeft: 10,
  },
});

export default SkillsTab;
