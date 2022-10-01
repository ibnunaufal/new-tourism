import { Button, Dimensions, Image, Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { API_URL } from "../utils/http";

export default function ImageDetail() {
  const r = useRoute();
  const { image, type } = r.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems:'center' }}>
      <Image
        source={{
          uri: `${API_URL}img/${
            type === "tempat" ? "tempat" : "acara"
          }/${image}`,
        }}
        style={styles.image}
      />
      <Button title="Download" onPress={() => Linking.openURL(`${API_URL}img/${
            type === "tempat" ? "tempat" : "acara"
          }/${image}`)} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',// Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height / 2,
  }
});
