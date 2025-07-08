import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from "react";
import { Link } from "expo-router";

const Home = () => {
    const insets = useSafeAreaInsets();

    return (
        <ScrollView style={[styles.container, { paddingTop: insets.top }]}>

                <View style={styles.profileSection}>
                    <Image
                        source={require("../assets/images/Onpreeya.jpg")}
                        style={styles.profileImage}
                    />
                    <Text style={styles.name}>Onpreeya Jantakote</Text>
                    <Text style={styles.detailDes}>Computer Science and Information</Text>
                    <View style={styles.detailRow}>
                        <Ionicons name="location-sharp" size={16} color="#6b7280" style={{ marginRight: 6 }} />
                        <Text style={styles.detailDes}>KhonKaen University</Text>
                    </View>
                    <Link href={"/about"} style={styles.button}>
                        <Text>About Us</Text>
                    </Link>
                </View>

                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.studentIdButton}>
                        <Text style={styles.studentIdText}>onpreeya.ja@kkumail.com</Text>
                    </TouchableOpacity>
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
    topBackground: {
        backgroundColor: "white",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingBottom: 10,
    },
});

export default Home;
