// tests/components/Search.test.js

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SearchInput from "../../components/SearchInput"; // Adjust the path as necessary

describe("SearchInput Component", () => {
  // Test for rendering and placeholder text
  test("renders correctly with initial props", () => {
    const { getByPlaceholderText } = render(
      <SearchInput value="" onChangeText={() => {}} />
    );

    const input = getByPlaceholderText("Search for recipes...");
    expect(input).toBeTruthy();
  });

  // Test for handling input changes
  test("calls onChangeText when text changes", () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput value="" onChangeText={onChangeTextMock} />
    );

    const input = getByPlaceholderText("Search for recipes...");
    fireEvent.changeText(input, "New search term");

    expect(onChangeTextMock).toHaveBeenCalledWith("New search term");
  });
});
