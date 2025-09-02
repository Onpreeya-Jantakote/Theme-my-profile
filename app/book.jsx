import { router, Link } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.150.1:3000/api";

export default function Book() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/signin");
      }
    } catch (e) {
      console.error("Auth check failed", e);
      router.replace("/signin");
    } finally {
      setCheckingAuth(false);
    }
  }, []);

  const fetchBooks = useCallback(async () => {
    try {
      setError("");
      setLoading(true);

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/signin");
        return;
      }

      const res = await fetch(`${BASE_URL}/books?page=1&limit=50`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      setData(Array.isArray(json?.books) ? json.books : []);
    } catch (e) {
      setError("Failed to load book data");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth().then(() => {
      fetchBooks();
    });
  }, [checkAuth, fetchBooks]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchBooks();
    setRefreshing(false);
  }, [fetchBooks]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={() => router.push(`/book_detail?id=${item._id}`)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.meta}>Author: {item.author || "-"}</Text>
      <Text style={styles.meta}>Genre: {item.genre || "-"}</Text>
      <View style={styles.row}>
        <Text style={styles.badge}>{item.year ?? "-"}</Text>
        <Text style={styles.price}>
          ฿{Number(item.price ?? 0).toLocaleString()}
        </Text>
        <Text style={[styles.avail, item.available ? styles.ok : styles.no]}>
          {item.available ? "Available" : "Out of Stock"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (checkingAuth) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.dim}>Verifying...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>All Books</Text>
        <Link href="/book_new" asChild>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>+ Add New Book</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.dim}>Loading book data...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity style={styles.secondaryBtn} onPress={fetchBooks}>
            <Text style={styles.secondaryBtnText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 24 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.dim}>No books available</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F7F7FB" },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  header: { fontSize: 24, fontWeight: "700" },
  primaryBtn: {
    backgroundColor: "#2F80ED",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  primaryBtnText: { color: "white", fontWeight: "600" },
  secondaryBtn: {
    borderColor: "#2F80ED",
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 8,
  },
  secondaryBtnText: { color: "#2F80ED", fontWeight: "600" },
  card: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  meta: { color: "#666", marginBottom: 2 },
  row: { flexDirection: "row", gap: 10, alignItems: "center", marginTop: 8 },
  badge: {
    backgroundColor: "#EEF2FF",
    color: "#3B5BDB",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
    fontWeight: "600",
  },
  price: { marginLeft: "auto", fontWeight: "700" },
  avail: { marginLeft: 8, fontWeight: "600" },
  ok: { color: "#27AE60" },
  no: { color: "#EB5757" },
  center: { alignItems: "center", paddingVertical: 24, gap: 8 },
  dim: { color: "#888" },
  error: { color: "#EB5757", fontWeight: "600" },
});
