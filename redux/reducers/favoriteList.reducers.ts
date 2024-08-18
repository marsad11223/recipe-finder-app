import { Recipe } from "@/utils/types";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { favoriteRecipes: Recipe[] } = {
  favoriteRecipes: [],
};

const favoriteListSlice = createSlice({
  name: "favoriteList",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Recipe>) => {
      state.favoriteRecipes.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favoriteRecipes = state.favoriteRecipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteListSlice.actions;

export const favoriteListReducer = favoriteListSlice.reducer;
