import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

interface ActionButtonsProps {
  onClearFilters: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onClearFilters }) => {
  const router = useRouter();

  return (
    <>
      <TouchableOpacity
        style={[styles.button, styles.clearFiltersButton]}
        onPress={onClearFilters}
      >
        <Text style={styles.buttonText}>Clear Filters</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.favoritesButton]}
        onPress={() => router.push("/favorites")}
      >
        <Text style={styles.buttonText}>View Favorites</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#FF6347",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  favoritesButton: {
    backgroundColor: "#4682B4",
  },
  clearFiltersButton: {
    backgroundColor: "#6a0dad",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ActionButtons;
