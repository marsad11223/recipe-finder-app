import {
  favoriteListReducer,
  addFavorite,
  removeFavorite,
} from "../../redux/reducers/favoriteList.reducers";
import { Recipe } from "@/utils/types";

describe("favoriteListSlice", () => {
  const mockRecipe: Recipe = {
    id: 1,
    title: "Test Recipe",
    image: "test-image-url",
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    veryHealthy: false,
    cheap: false,
    veryPopular: false,
    sustainable: false,
    lowFodmap: false,
    weightWatcherSmartPoints: 0,
    gaps: "",
    preparationMinutes: null,
    cookingMinutes: null,
    aggregateLikes: 0,
    healthScore: 0,
    creditsText: "",
    sourceName: "",
    pricePerServing: 0,
    readyInMinutes: 0,
    servings: 0,
    sourceUrl: "",
    imageType: "",
    summary: "",
    cuisines: [],
    dishTypes: [],
    diets: [],
    occasions: [],
    analyzedInstructions: [],
    spoonacularScore: 0,
    spoonacularSourceUrl: "",
  };

  it("should add a recipe to the favorite list", () => {
    const previousState = { favoriteRecipes: [] };
    const newState = favoriteListReducer(
      previousState,
      addFavorite(mockRecipe)
    );

    expect(newState.favoriteRecipes).toEqual([mockRecipe]);
  });

  it("should remove a recipe from the favorite list by id", () => {
    const previousState = { favoriteRecipes: [mockRecipe] };
    const newState = favoriteListReducer(
      previousState,
      removeFavorite(mockRecipe.id)
    );

    expect(newState.favoriteRecipes).toEqual([]);
  });

  it("should not remove a recipe if the id doesn't exist", () => {
    const previousState = { favoriteRecipes: [mockRecipe] };
    const newState = favoriteListReducer(previousState, removeFavorite(999));

    expect(newState.favoriteRecipes).toEqual([mockRecipe]);
  });
});
