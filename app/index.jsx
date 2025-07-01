import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from "react";
import SkillsTab from "./skillTab";
import ProjectsTab from "./projectTab";
import StepCircles from "./studentId";

const Home = () => {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState("project");

    return (
        <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.topBackground}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Profile</Text>
                </View>

                <View style={styles.profileSection}>
                    <Image
                        source={require("../assets/images/Onpreeya.jpg")}
                        style={styles.profileImage}
                    />
                    <Text style={styles.name}>Onpreeya Jantakote</Text>
                    <StepCircles />
                    <Text style={styles.detailDes}>Computer Science and Information</Text>
                    <View style={styles.detailRow}>
                        <Ionicons name="location-sharp" size={16} color="#6b7280" style={{ marginRight: 6 }} />
                        <Text style={styles.detailDes}>KhonKaen University</Text>
                    </View>
                </View>

                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.studentIdButton}>
                        <Text style={styles.studentIdText}>onpreeya.ja@kkumail.com</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <View style={styles.sectionTabs}>
                    <TouchableOpacity onPress={() => setActiveTab("project")}>
                        <Text style={activeTab === "project" ? styles.activeTab : styles.inactiveTab}>PROJECT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab("skills")}>
                        <Text style={activeTab === "skills" ? styles.activeTab : styles.inactiveTab}>SKILLS</Text>
                    </TouchableOpacity>
                </View>

                {activeTab === "project" && <ProjectsTab />}
                {activeTab === "skills" && <SkillsTab />}
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f3f4f6",
    },
    header: {
        alignItems: "center",
        marginTop: 30,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#4f46e5",
    },
    profileSection: {
        alignItems: "center",
        marginVertical: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: "#4f46e5",
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
        color: "#1f2937",
        marginBottom: 5,
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
    },
    detailDes: {
        fontSize: 14,
        color: "#6b7280",

    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
        marginVertical: 10,
    },
    studentIdButton: {
        backgroundColor: "#4f46e5",
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
    },
    studentIdText: {
        color: "white",
        fontWeight: "bold",
    },
    sectionTabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
    },
    activeTab: {
        color: "#4f46e5",
        fontWeight: "bold",
        fontSize: 16,
        borderBottomWidth: 2,
        borderBottomColor: "#4f46e5",
        paddingBottom: 5,
    },
    topBackground: {
        backgroundColor: "white",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingBottom: 10,
    },
    inactiveTab: {
        color: "#9ca3af",
        fontSize: 16,
    },

});

export default Home;