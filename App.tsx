import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Search } from "react-native-sonos";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const search = new Search({ timeout: 10000 });
search.addListener("DeviceAvailable", (sonos, model) => {
  console.log([sonos, model]);
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
