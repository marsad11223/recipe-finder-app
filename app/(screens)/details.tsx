import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import Toast from "react-native-toast-message";

import { useAppDispatch, useAppSelector } from "@/redux";
import {
  addFavorite,
  removeFavorite,
} from "@/redux/reducers/favoriteList.reducers";

import { isFavoriteRecipe } from "@/utils/helpers";
import { Recipe } from "@/utils/types";

export default function RecipeDetailScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { recipe } = useLocalSearchParams();
  const { favoriteRecipes } = useAppSelector((state) => state.favoritesList);

  const recipeData: Recipe = JSON.parse(recipe as string);

  const [isFavorite, setIsFavorite] = useState(
    isFavoriteRecipe(favoriteRecipes, recipeData.id)
  );

  const ingredients = recipeData.analyzedInstructions[0]?.steps
    .flatMap((step) => step.ingredients)
    .reduce((acc: any[], ingredient) => {
      if (!acc.find((i) => i.id === ingredient.id)) {
        acc.push(ingredient);
      }
      return acc;
    }, []);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    if (isFavoriteRecipe(favoriteRecipes, recipeData.id)) {
      dispatch(removeFavorite(recipeData.id));
      setIsFavorite(false);
      Toast.show({
        type: "success",
        text1: "Recipe removed from favorites",
      });
    } else {
      dispatch(addFavorite(recipeData));
      setIsFavorite(true);
      Toast.show({
        type: "success",
        text1: "Recipe added to favorites",
      });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: recipeData.image }}
        style={styles.heroImage}
        resizeMode="cover"
      >
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoriteToggle}
          >
            <FontAwesome
              name={isFavorite ? "heart" : "heart-o"}
              size={24}
              color={isFavorite ? "red" : "#fff"}
            />
          </TouchableOpacity>
        </View>
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
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    position: "absolute",
    width: "100%",
    top: 0,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    padding: 5,
  },
  favoriteButton: {
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
