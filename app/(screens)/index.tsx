import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

import Toast from "react-native-toast-message";

import { Collapsible } from "@/components/Collapsible";
import SearchInput from "@/components/SearchInput";
import FilterPicker from "@/components/FilterPicker";
import ActionButtons from "@/components/ActionButtons";
import RecipeList from "@/components/RecipeList";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import useDebounce from "@/hooks/useDebounce";
import { fetchRecipes } from "@/services/apiService";
import { Recipe } from "@/utils/types";
import {
  NUMBER_OF_RECIPES_PER_PAGE,
  mealTypes,
  dietDefinitions,
  cuisines,
} from "@/constants/constants";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {} = useAppSelector((state) => state.favoritesList);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMealType, setSelectedMealType] = useState<string>("");
  const [selectedDiet, setSelectedDiet] = useState<string>("");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [collaspActions, setCollaspActions] = useState<boolean>(true);

  const fetchAndSetRecipes = useCallback(
    async (
      searchTerm: string,
      page: number,
      mealType: string,
      diet: string,
      cuisine: string
    ) => {
      setLoading(true);
      try {
        const query = `${searchTerm} ${mealType} ${diet} ${cuisine}`.trim();
        const newRecipes = await fetchRecipes(query, page);
        setCollaspActions(false);
        setRecipes((prevRecipes) =>
          page === 1 ? newRecipes : [...prevRecipes, ...newRecipes]
        );
        setHasMore(newRecipes.length === NUMBER_OF_RECIPES_PER_PAGE);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "An error occurred while fetching recipes.",
          text2: "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleSearch = (text: string) => {
    setPage(1);
    fetchAndSetRecipes(
      text,
      1,
      selectedMealType,
      selectedDiet,
      selectedCuisine
    );
  };

  const debouncedSearch = useDebounce(handleSearch, 500);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchAndSetRecipes(
        searchTerm,
        nextPage,
        selectedMealType,
        selectedDiet,
        selectedCuisine
      );
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedMealType("");
    setSelectedDiet("");
    setSelectedCuisine("");
    setPage(1);
    fetchAndSetRecipes("", 1, "", "", "");
  };

  useEffect(() => {
    fetchAndSetRecipes("", 1, selectedMealType, selectedDiet, selectedCuisine);
  }, [fetchAndSetRecipes, selectedMealType, selectedDiet, selectedCuisine]);

  const handleRecipePress = (id: number) => {
    // router.push(`/recipe-details?id=${id}`);
  };

  return (
    <ImageBackground
      source={{ uri: "https://your-image-url.com/background.jpg" }}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>Recipe Finder</Text>
        <SearchInput
          value={searchTerm}
          onChangeText={(value) => {
            debouncedSearch(value);
            setSearchTerm(value);
          }}
        />
        <Collapsible
          title="Actions (Expand to Apply Filters)"
          isOpen={collaspActions}
          onPress={() => setCollaspActions(!collaspActions)}
        >
          <FilterPicker
            selectedValue={selectedMealType}
            onValueChange={(itemValue) => setSelectedMealType(itemValue)}
            items={mealTypes}
            placeholder="Select Meal Type"
          />
          <FilterPicker
            selectedValue={selectedDiet}
            onValueChange={(itemValue) => setSelectedDiet(itemValue)}
            items={dietDefinitions}
            placeholder="Select Diet"
          />
          <FilterPicker
            selectedValue={selectedCuisine}
            onValueChange={(itemValue) => setSelectedCuisine(itemValue)}
            items={cuisines}
            placeholder="Select Cuisine"
          />
          <ActionButtons onClearFilters={handleClearFilters} />
        </Collapsible>
        {loading && page === 1 ? (
          <ActivityIndicator size="large" color="#FF6347" />
        ) : (
          <RecipeList
            recipes={recipes}
            loading={loading}
            onEndReached={handleLoadMore}
            onRecipePress={handleRecipePress}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    flex: 1,
    width: width,
    maxWidth: 500,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
});
