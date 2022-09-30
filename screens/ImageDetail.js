import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

export default function ImageDetail() {
  const r = useRoute();
  const { image, type } = r.params;
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{
          uri: `${API_URL}/img/${
            type === "tempat" ? "tempat" : "acara"
          }/${image}`,
        }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
