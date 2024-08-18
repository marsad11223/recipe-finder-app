import axios from "axios";
import { Recipe } from "@/utils/types";
import {
  API_ENDPOINT,
  API_KEY,
  NUMBER_OF_RECIPES_PER_PAGE,
} from "@/constants/constants";
import { dummyData } from "@/utils/mockData";

export const fetchRecipes = async (
  query: string,
  pageNumber: number,
  mealType: string = "",
  diet: string = "",
  cuisine: string = ""
): Promise<Recipe[]> => {
  try {
    const response = await axios.get(API_ENDPOINT, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        apiKey: API_KEY,
        query,
        number: NUMBER_OF_RECIPES_PER_PAGE,
        addRecipeInformation: true,
        addRecipeInstructions: true,
        offset: (pageNumber - 1) * NUMBER_OF_RECIPES_PER_PAGE,
        // Add filter parameters if provided
        ...(mealType && { type: mealType }),
        ...(diet && { diet }),
        ...(cuisine && { cuisine }),
      },
    });

    return response.data.results;

    // Use mock data if API call fails: Due to Spoonacular API limitations (150 requests per day).
    // const promise = new Promise<Recipe[]>((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(dummyData);
    //   }, 1500);
    // });

    // return promise;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw new Error("Failed to fetch recipes", { cause: error });
  }
};
