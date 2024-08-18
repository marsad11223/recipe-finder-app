import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import Icon from "@expo/vector-icons/AntDesign";

type RecipeCardProps = {
  recipe: {
    id: number;
    title: string;
    image: string;
  };
  onPress: (id: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
};

const { width } = Dimensions.get("window");

export default function RecipeCard({
  recipe,
  onPress,
  isFavorite,
  onToggleFavorite,
}: RecipeCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(recipe.id)}
      testID="recipe-card"
    >
      <Image
        source={{ uri: recipe.image }}
        style={styles.image}
        testID="recipe-image"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{recipe.title}</Text>
      </View>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => onToggleFavorite(recipe.id)}
      >
        <Icon
          name={isFavorite ? "heart" : "hearto"}
          size={24}
          color={isFavorite ? "#FF6347" : "#ccc"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 3, // For Android shadow
    width: width * 0.9, // 90% of the screen width
    alignSelf: "center",
    position: "relative", // To position the heart icon
  },
  image: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "transparent",
    zIndex: 1, // Ensure it is above other elements
  },
});
