import React from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Search for recipes..."
      placeholderTextColor="#aaa"
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: height * 0.07,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
});

export default SearchInput;
