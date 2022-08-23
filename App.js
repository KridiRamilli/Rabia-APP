import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootTab from "./navigation/RootTab";

export default function App() {
  return <RootTab />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
