import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const StepCircles = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.circle}>
        <Text style={styles.number}>6</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.circle}>
        <Text style={styles.number}>5</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.circle}>
        <Text style={styles.number}>3</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.circle}>
        <Text style={styles.number}>4</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.circle}>
        <Text style={styles.number}>5</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.circle}>
        <Text style={styles.number}>0</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.circle}>
        <Text style={styles.number}>1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.circle}>
        <Text style={styles.number}>0</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.circle}>
        <Text style={styles.number}>7</Text>
      </TouchableOpacity>
      <Text style={styles.number}>-</Text>
      <TouchableOpacity style={styles.circle}>
        <Text style={styles.number}>5</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
    padding: 5,
    justifyContent: "center",
  },
  circle: {
    width: 23,
    height: 23,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#06b6d4",
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: 14,
    color: "#4f46e5",
    fontWeight: "bold",
  },
});

export default StepCircles;
