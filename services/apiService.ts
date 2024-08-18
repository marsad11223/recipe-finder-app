import axios from "axios";
import { Recipe } from "@/utils/types";
import {
  API_ENDPOINT,
  API_KEY,
  NUMBER_OF_RECIPES_PER_PAGE,
} from "@/constants/constants";
import Toast from "react-native-toast-message";
import { dummyData } from "@/utils/mockData";

export const fetchRecipes = async (
  query: string,
  pageNumber: number,
  mealType: string = "",
  diet: string = "",
  cuisine: string = ""
): Promise<Recipe[]> => {
  try {
    // const response = await axios.get(API_ENDPOINT, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   params: {
    //     apiKey: API_KEY,
    //     query,
    //     number: NUMBER_OF_RECIPES_PER_PAGE,
    //     addRecipeInformation: true,
    //     addRecipeInstructions: true,
    //     offset: (pageNumber - 1) * NUMBER_OF_RECIPES_PER_PAGE,
    //     // Add filter parameters if provided
    //     ...(mealType && { type: mealType }),
    //     ...(diet && { diet }),
    //     ...(cuisine && { cuisine }),
    //   },
    // });

    // return response.data.results;

    const promise = new Promise<Recipe[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(dummyData);
      }, 1500);
    });

    return promise;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    Toast.show({
      type: "error",
      text1: "An error occurred while fetching recipes.",
    });

    return [];
  }
};
