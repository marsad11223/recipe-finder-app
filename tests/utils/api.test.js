import axios from "axios";
import { fetchRecipes } from "../../services/apiService";
import {
  API_ENDPOINT,
  API_KEY,
  NUMBER_OF_RECIPES_PER_PAGE,
} from "@/constants/constants";

jest.mock("axios");

describe("fetchRecipes with real API call", () => {
  it("returns data from API correctly", async () => {
    const mockResponse = {
      data: { results: [{ id: 1, title: "Test Recipe" }] },
    };
    axios.get.mockResolvedValue(mockResponse);

    const query = "chicken";
    const pageNumber = 1;
    const data = await fetchRecipes(query, pageNumber);

    expect(data).toEqual(mockResponse.data.results);
    expect(axios.get).toHaveBeenCalledWith(API_ENDPOINT, {
      headers: { "Content-Type": "application/json" },
      params: {
        apiKey: API_KEY,
        query,
        number: NUMBER_OF_RECIPES_PER_PAGE,
        addRecipeInformation: true,
        addRecipeInstructions: true,
        offset: 0,
      },
    });
  });
});
