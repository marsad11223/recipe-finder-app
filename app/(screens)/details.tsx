import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Recipe } from "@/utils/types";

export default function RecipeDetailScreen() {
  const { recipe } = useLocalSearchParams();
  const router = useRouter();
  const recipeData: Recipe = JSON.parse(recipe as string);

  const ingredients = recipeData.analyzedInstructions[0]?.steps
    .flatMap((step) => step.ingredients)
    .reduce((acc: any[], ingredient) => {
      if (!acc.find((i) => i.id === ingredient.id)) {
        acc.push(ingredient);
      }
      return acc;
    }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: recipeData.image }}
        style={styles.heroImage}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={styles.overlay}>
          <Text style={styles.heroTitle}>{recipeData.title}</Text>
        </View>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Recipe Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Servings: {recipeData.servings}</Text>
          <Text style={styles.detailText}>
            Preparation Time: {recipeData.readyInMinutes} mins
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.ingredientGrid}>
          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientCard}>
              <Image
                source={{
                  uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`,
                }}
                style={styles.ingredientImage}
              />
              <Text style={styles.ingredientName}>{ingredient.name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Instructions</Text>
        {recipeData.analyzedInstructions[0]?.steps.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <Text style={styles.stepIndex}>{index + 1}</Text>
            <Text style={styles.stepText}>{step.step}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  heroImage: {
    width: "100%",
    height: 250,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    padding: 15,
  },
  heroTitle: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    padding: 5,
  },
  content: {
    padding: 20,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 5,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  ingredientGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  ingredientCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  ingredientImage: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  ingredientName: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
  stepCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  stepIndex: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  stepText: {
    fontSize: 16,
    color: "#555",
  },
});
