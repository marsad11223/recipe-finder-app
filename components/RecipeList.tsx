import React from "react";
import { FlatList, ActivityIndicator, StyleSheet, Text } from "react-native";
import Toast from "react-native-toast-message";

import RecipeCard from "@/components/RecipeCard";

import {
  addFavorite,
  removeFavorite,
} from "@/redux/reducers/favoriteList.reducers";
import { useAppDispatch, useAppSelector } from "@/redux/store";

import { isFavoriteRecipe } from "@/utils/helpers";
import { Recipe } from "@/utils/types";

interface RecipeListProps {
  recipes: Recipe[];
  loading: boolean;
  onEndReached: () => void;
  onRecipePress: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  loading,
  onEndReached,
  onRecipePress,
}) => {
  const dispatch = useAppDispatch();
  const { favoriteRecipes } = useAppSelector((state) => state.favoritesList);

  const onToggleFavorite = (recipe: Recipe) => {
    if (isFavoriteRecipe(favoriteRecipes, recipe.id)) {
      dispatch(removeFavorite(recipe.id));
      Toast.show({
        type: "success",
        text1: "Recipe removed from favorites",
      });
    } else {
      dispatch(addFavorite(recipe));
      Toast.show({
        type: "success",
        text1: "Recipe added to favorites",
      });
    }
  };

  return (
    <FlatList
      data={recipes}
      renderItem={({ item }) => (
        <RecipeCard
          recipe={item}
          onPress={() => onRecipePress(item)}
          isFavorite={isFavoriteRecipe(favoriteRecipes, item.id)}
          onToggleFavorite={() => onToggleFavorite(item)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.flatListContainer}
      onEndReached={recipes.length > 0 ? onEndReached : undefined}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? <ActivityIndicator size="large" color="#FF6347" /> : null
      }
      ListEmptyComponent={
        <Text style={styles.emptyText}>No results found</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    paddingBottom: 20,
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#555",
    marginTop: 20,
  },
});

export default RecipeList;
