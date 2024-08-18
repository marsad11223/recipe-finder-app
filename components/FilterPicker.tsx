import React from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

interface FilterPickerProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: string[];
  placeholder: string;
}

const FilterPicker: React.FC<FilterPickerProps> = ({
  selectedValue,
  onValueChange,
  items,
  placeholder,
}) => {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles.picker}
    >
      <Picker.Item label={placeholder} value="" />
      {items.map((item) => (
        <Picker.Item key={item} label={item} value={item} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default FilterPicker;
