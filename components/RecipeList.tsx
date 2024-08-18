import React from "react";
import { FlatList, ActivityIndicator, StyleSheet } from "react-native";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/utils/types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { isFavoriteRecipe } from "@/utils/helpers";
import {
  addFavorite,
  removeFavorite,
} from "@/redux/reducers/favoriteList.reducers";
import Toast from "react-native-toast-message";

interface RecipeListProps {
  recipes: Recipe[];
  loading: boolean;
  onEndReached: () => void;
  onRecipePress: (id: number) => void;
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
          onPress={() => onRecipePress(item.id)}
          isFavorite={isFavoriteRecipe(favoriteRecipes, item.id)}
          onToggleFavorite={() => onToggleFavorite(item)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.flatListContainer}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? <ActivityIndicator size="large" color="#FF6347" /> : null
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
});

export default RecipeList;
