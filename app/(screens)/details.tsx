import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";

const { width } = Dimensions.get("window");

export default function RecipeDetailScreen() {
  const { recipe } = useLocalSearchParams();
  const recipeData = JSON.parse(recipe as string);

  console.log(recipeData, "recipeData");
  return (
    <ImageBackground
      source={{ uri: "https://your-image-url.com/background.jpg" }}
      style={styles.background}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Detail screen</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    flex: 1,
    width: width,
    maxWidth: 500,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
});
