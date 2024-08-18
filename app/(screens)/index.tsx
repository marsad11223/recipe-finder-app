import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

import RecipeCard from "@/components/RecipeCard";
import { Collapsible } from "@/components/Collapsible";

import useDebounce from "@/hooks/useDebounce";
import { fetchRecipes } from "@/services/apiService";
import { Recipe } from "@/utils/types";
import {
  NUMBER_OF_RECIPES_PER_PAGE,
  mealTypes,
  dietDefinitions,
  cuisines,
} from "@/constants/constants";

export default function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMealType, setSelectedMealType] = useState<string>("");
  const [selectedDiet, setSelectedDiet] = useState<string>("");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [collaspActions, setCollaspActions] = useState<boolean>(true);
  const router = useRouter();

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
        alert("An error occurred while fetching recipes.");
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
    fetchAndSetRecipes(searchTerm, 1, "", "", "");
  };

  useEffect(() => {
    // Fetch popular recipes on initial load
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
        <TextInput
          style={styles.searchInput}
          placeholder="Search for recipes..."
          placeholderTextColor="#aaa"
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
          <Picker
            selectedValue={selectedMealType}
            onValueChange={(itemValue) => setSelectedMealType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Meal Type" value="" />
            {mealTypes.map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
          <Picker
            selectedValue={selectedDiet}
            onValueChange={(itemValue) => setSelectedDiet(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Diet" value="" />
            {dietDefinitions.map((diet) => (
              <Picker.Item key={diet} label={diet} value={diet} />
            ))}
          </Picker>
          <Picker
            selectedValue={selectedCuisine}
            onValueChange={(itemValue) => setSelectedCuisine(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Cuisine" value="" />
            {cuisines.map((cuisine) => (
              <Picker.Item key={cuisine} label={cuisine} value={cuisine} />
            ))}
          </Picker>
          <TouchableOpacity
            style={[styles.button, styles.clearFiltersButton]}
            onPress={handleClearFilters}
          >
            <Text style={styles.buttonText}>Clear Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.favoritesButton]}
            onPress={() => router.push("/favorites")}
          >
            <Text style={styles.buttonText}>View Favorites</Text>
          </TouchableOpacity>
        </Collapsible>
        {loading && page === 1 ? (
          <ActivityIndicator size="large" color="#FF6347" />
        ) : (
          <FlatList
            data={recipes}
            renderItem={({ item }) => (
              <RecipeCard recipe={item} onPress={handleRecipePress} />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContainer}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loading ? (
                <ActivityIndicator size="large" color="#FF6347" />
              ) : null
            }
          />
        )}
      </View>
    </ImageBackground>
  );
}

const { width, height } = Dimensions.get("window");

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
  searchInput: {
    height: height * 0.07,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    width: "100%",
    backgroundColor: "#FF6347",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  favoritesButton: {
    backgroundColor: "#4682B4",
  },
  clearFiltersButton: {
    backgroundColor: "#6a0dad",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  flatListContainer: {
    width: "100%",
    paddingBottom: 20,
    marginTop: 20,
  },
});
