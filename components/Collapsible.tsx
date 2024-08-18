import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  Text,
} from "react-native";

import { Colors } from "@/constants/Colors";

export function Collapsible({
  children,
  title,
  isOpen = true,
  onPress = () => {},
}: PropsWithChildren<{ title: string; isOpen: boolean; onPress: () => void }>) {
  const theme = useColorScheme() ?? "light";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => onPress()}
        activeOpacity={0.8}
      >
        <Text style={styles.title}>{title}</Text>
        <Ionicons
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={18}
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
        />
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
