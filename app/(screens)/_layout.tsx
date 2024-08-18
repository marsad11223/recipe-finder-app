import { Stack } from "expo-router";
import React from "react";

export default function Screens() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="favorites" />
      <Stack.Screen name="details" />
    </Stack>
  );
}
