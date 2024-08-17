import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={() => {}}>
        <Text>Click me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
