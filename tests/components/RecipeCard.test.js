// RecipeCard.test.js

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import RecipeCard from "../../components/RecipeCard";

const mockRecipe = {
  id: 1,
  title: "Test Recipe",
  image: "test-image-url",
};

test("renders correctly with provided recipe", () => {
  const { getByText, getByTestId } = render(
    <RecipeCard
      recipe={mockRecipe}
      onPress={() => {}}
      isFavorite={false}
      onToggleFavorite={() => {}}
    />
  );

  expect(getByText("Test Recipe")).toBeTruthy();

  const image = getByTestId("recipe-image");
  expect(image.props.source.uri).toBe("test-image-url");
});

test("triggers onPress when pressed", () => {
  const onPressMock = jest.fn();
  const { getByTestId } = render(
    <RecipeCard
      recipe={mockRecipe}
      onPress={onPressMock}
      isFavorite={false}
      onToggleFavorite={() => {}}
    />
  );

  fireEvent.press(getByTestId("recipe-card"));
  expect(onPressMock).toHaveBeenCalled();
});
