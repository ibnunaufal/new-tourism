import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { deleteBookmark, getBookmark } from "../utils/localstorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../utils/http";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";

export default function BookmarkScreen() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function init() {
      setLoading(true);
      let x = await getBookmark();
      setDatas(x);
      setLoading(false);
    }
    init();
  }, [isFocused]);
  async function refresh() {
    setLoading(true);
    let x = await getBookmark();
    setDatas(x);
    setLoading(false);
  }

  async function deleteItem(item) {
    console.log(JSON.stringify(item));
    await deleteBookmark(item);
    refresh()
  }

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={({ pressed }) => [styles.itemView, pressed && styles.pressed]}
        onPress={() =>
          navigation.navigate("BookmarkDetailStack", { item: item })
        }
      >
        <View style={styles.imageView}>
          {/* image */}
          <Image
            source={{ uri: `${API_URL}/img/tempat/${item.image}` }}
            style={styles.image}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.title}>{item.name}</Text>
          <Text>{`${item.desa} ${item.kecamatan}`}</Text>
        </View>
        <View style={styles.pressView}>
          <Pressable
            style={({ pressed }) => [
              styles.pressable,
              pressed && styles.pressed,
            ]}
            onPress={() => {
              deleteItem(item);
            }}
          >
            <Ionicons name="trash" size={24} color="white" />
          </Pressable>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {!loading && <FlatList data={datas} renderItem={renderItem} />}
      {loading && <ActivityIndicator size={"large"} style={{flex:1,justifyContent:"center"}} />}
    </View>
  );
}

const styles = StyleSheet.create({
  itemView: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
  },
  imageView: {
    flex: 2,
  },
  image: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textView: {
    flex: 3,
    justifyContent: "center",
    paddingLeft: 10,
  },
  pressView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
    backgroundColor: "red",
    padding: 5,
    marginHorizontal: 2,
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.5,
  },
  title: {
    fontWeight: "bold",
  },
});
