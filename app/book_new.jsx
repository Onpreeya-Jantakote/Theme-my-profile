import { router } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.150.1:3000/api";

export default function BookNew() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    year: "",
    price: "",
    available: true,
  });
  const [saving, setSaving] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const onChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    if (!form.title.trim()) return "Please enter the book title";
    if (!form.author.trim()) return "Please enter the author";
    if (form.year && isNaN(Number(form.year))) return "Publication year must be a number";
    if (form.price && isNaN(Number(form.price))) return "Price must be a number";
    return "";
  };

  const checkAuth = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) router.replace("/signin");
    } catch (e) {
      console.error("Auth check failed", e);
      router.replace("/signin");
    } finally {
      setCheckingAuth(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleCreate = async () => {
    const v = validate();
    if (v) return Alert.alert("Incomplete Data", v);

    try {
      setSaving(true);

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/signin");
        return;
      }

      const payload = {
        title: form.title.trim(),
        author: form.author.trim(),
        description: form.description.trim(),
        genre: form.genre.trim(),
        year: form.year ? Number(form.year) : null,
        price: form.price ? Number(form.price) : 0,
        available: form.available,
      };

      const res = await fetch(`${BASE_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Create failed");

      Alert.alert("Success", "Book added successfully!");
      router.replace("/book"); 

    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (checkingAuth) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.dim}>Verifying...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Book</Text>

      <Text style={styles.label}>Title *</Text>
      <TextInput
        style={styles.input}
        value={form.title}
        onChangeText={(t) => onChange("title", t)}
        placeholder="e.g., The Pragmatic Programmer"
        placeholderTextColor="#B0B0B0"
      />

      <Text style={styles.label}>Author *</Text>
      <TextInput
        style={styles.input}
        value={form.author}
        onChangeText={(t) => onChange("author", t)}
        placeholder="e.g., Robert C. Martin"
        placeholderTextColor="#B0B0B0"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        multiline
        numberOfLines={4}
        value={form.description}
        onChangeText={(t) => onChange("description", t)}
        placeholder="Brief summary of the book"
        placeholderTextColor="#B0B0B0"
      />

      <Text style={styles.label}>Genre</Text>
      <TextInput
        style={styles.input}
        value={form.genre}
        onChangeText={(t) => onChange("genre", t)}
        placeholder="e.g., Technology"
        placeholderTextColor="#B0B0B0"
      />

      <View style={styles.row2}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Publication Year *</Text>
          <TextInput
            style={styles.input}
            value={form.year}
            onChangeText={(t) => onChange("year", t)}
            placeholder="2025"
            placeholderTextColor="#B0B0B0"
            keyboardType="numeric"
          />
        </View>
        <View style={{ width: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Price (THB)</Text>
          <TextInput
            style={styles.input}
            value={form.price}
            onChangeText={(t) => onChange("price", t)}
            placeholder="499"
            placeholderTextColor="#B0B0B0"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Status</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Switch
            value={form.available}
            onValueChange={(v) => onChange("available", v)}
          />
          <Text>{form.available ? "Available" : "Out of Stock"}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.btn, styles.primary]}
        disabled={saving}
        onPress={handleCreate}
      >
        <Text style={styles.btnText}>
          {saving ? "Saving..." : "Save"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, styles.ghost]}
        onPress={() => router.back()}
      >
        <Text style={[styles.btnText, { color: "#2F80ED" }]}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#F7F7FB" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  label: { fontWeight: "600", marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E6E8EC",
  },
  multiline: { height: 110, textAlignVertical: "top" },
  row2: { flexDirection: "row", alignItems: "flex-start", marginTop: 6 },
  switchRow: {
    marginTop: 12,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E8EC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 16,
  },
  primary: { backgroundColor: "#2F80ED" },
  ghost: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#2F80ED" },
  btnText: { color: "white", fontWeight: "700" },
  center: { alignItems: "center", paddingVertical: 24, gap: 8 },
  dim: { color: "#888" },
});
