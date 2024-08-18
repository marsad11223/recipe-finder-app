import React from "react";
import { FlatList, ActivityIndicator, StyleSheet } from "react-native";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/utils/types";

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
  return (
    <FlatList
      data={recipes}
      renderItem={({ item }) => (
        <RecipeCard recipe={item} onPress={() => onRecipePress(item.id)} />
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
