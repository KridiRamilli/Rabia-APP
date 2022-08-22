import { Text, View, StyleSheet } from "react-native";
import React from "react";

function Settings({ route }) {
  console.log(route.params);

  return (
    <View styles={styles.container}>
      <Text>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default Settings;
