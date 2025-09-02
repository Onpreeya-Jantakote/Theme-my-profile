import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.150.1:3000/api";

export default function BookDetail() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [token, setToken] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    year: "",
    price: "",
    available: true,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
      const t = await AsyncStorage.getItem("token");
      if (!t) {
        router.replace("/signin");
        return;
      }
      setToken(t);
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

  useEffect(() => {
    if (!token) return;

    (async () => {
      try {
        setError("");
        setLoading(true);
        const res = await fetch(`${BASE_URL}/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        const b = json?.book;
        setForm({
          title: b?.title ?? "",
          author: b?.author ?? "",
          description: b?.description ?? "",
          genre: b?.genre ?? "",
          year: String(b?.year ?? ""),
          price: String(b?.price ?? ""),
          available: Boolean(b?.available),
        });
      } catch (e) {
        console.error(e);
        setError("Failed to load book data");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token]);

  const handleUpdate = async () => {
    const v = validate();
    if (v) {
      setModalMessage(v);
      setModalVisible(true);
      return;
    }

    try {
      setSaving(true);
      const payload = {
        title: form.title.trim(),
        author: form.author.trim(),
        description: form.description.trim(),
        genre: form.genre.trim(),
        year: form.year ? Number(form.year) : null,
        price: form.price ? Number(form.price) : 0,
        available: form.available,
      };
      const res = await fetch(`${BASE_URL}/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Update failed");
      setModalMessage("saved successfully!");
      setModalVisible(true);
    } catch (e) {
      console.error(e);
      setModalMessage("Failed to update");
      setModalVisible(true);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = () => {
    setModalMessage("Are you sure you want to delete this book?");
    setModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const res = await fetch(`${BASE_URL}/books/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setModalMessage("Deleted successfully");
      router.replace("/book"); 
      setDeleted(true);
      setModalVisible(true);
    } catch (e) {
      console.error(e);
      setModalMessage("Failed to delete");
      setModalVisible(true);
    } finally {
      setDeleting(false);
    }
  };

  if (checkingAuth || loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.dim}>Loading...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Update Book</Text>
      {/* <Text style={styles.sub}>ID: {id}</Text> */}

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
          <Text style={styles.label}>Publication Year</Text>
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

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[styles.btn, styles.primary]}
          disabled={saving}
          onPress={handleUpdate}
        >
          <Text style={styles.btnText}>
            {saving ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.danger]}
          disabled={deleting}
          onPress={() => setConfirmDeleteModal(true)}
        >
          <Text style={styles.btnText}>{deleting ? "Deleting..." : "Delete"}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={confirmDeleteModal}
        animationType="fade"
        onRequestClose={() => setConfirmDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete this book?</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                style={[styles.btn, styles.danger, { flex: 1 }]}
                onPress={async () => {
                  setConfirmDeleteModal(false);
                  await handleDelete();
                }}
              >
                <Text style={styles.btnText}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.btn, styles.modalBtn, { flex: 1 }]}
                onPress={() => setConfirmDeleteModal(false)}
              >
                <Text style={[styles.btnText, { color: "#fff" }]}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#F7F7FB" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  dim: { color: "#888" },
  error: { color: "#EB5757", fontWeight: "600" },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 6, color: "#333" },
  sub: { color: "#666", marginBottom: 16 },
  label: { fontWeight: "600", marginBottom: 6, marginTop: 10, color: "#333" },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E6E8EC",
    fontSize: 16,
    color: "#333",
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
  btnRow: { flexDirection: "row", gap: 10, marginTop: 16 },
  btn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#2F80ED",
  },
  primary: { backgroundColor: "#2F80ED" },
  danger: { backgroundColor: "#EB5757" },
  btnText: { color: "white", fontWeight: "700", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  modalText: { fontSize: 18, fontWeight: "600", marginBottom: 20, textAlign: "center" },
  modalBtn: { backgroundColor: "#a8a8a8ff", paddingHorizontal: 20, paddingVertical: 10 },
});
