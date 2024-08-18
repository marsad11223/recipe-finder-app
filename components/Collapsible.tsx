import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState, useEffect, useRef } from "react";
import {
  Animated,
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
  const animation = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 350],
  });

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
      <Animated.View style={[styles.content, { height, overflow: "hidden" }]}>
        {children}
      </Animated.View>
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
