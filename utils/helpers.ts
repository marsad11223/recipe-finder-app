import { Recipe } from "./types";

export const isFavoriteRecipe = (
  favoriteRecipes: Recipe[],
  recipeId: number
) => {
  return favoriteRecipes.some((recipe) => recipe.id === recipeId);
};
