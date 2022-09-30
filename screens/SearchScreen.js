import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { API_URL, getPage } from "../utils/http";
import { useNavigation } from "@react-navigation/native";

export default function SearchScreen() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [cari, setCari] = useState("");
  const [tag, setTag] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const [lastPage, setLastPage] = useState(0);
  const [isEndScrolled, setIsEndScrolled] = useState(false);
  const [totalData, setTotalData] = useState(0)
  const navigation = useNavigation();

  useEffect(() => {
    search();
  }, []);

  const footerItem = () => (
    <View
      style={{
        justifyContent: "center",
        paddingHorizontal: 30,
        backgroundColor: "white",
        paddingVertical: 10,
      }}
    >
      {moreLoading ? <ActivityIndicator /> : <Text></Text>}
      {isListEnd ? (
        <Text style={{ textAlign: "center" }}>
          Anda telah mencapai akhir data. Total {totalData} data
        </Text>
      ) : (
        <Text></Text>
      )}
      <Text></Text>
    </View>
  );
  const emptyItem = ({ item }) => (
    <View
      style={{
        justifyContent: "center",
        paddingHorizontal: 30,
        backgroundColor: "white",
        paddingVertical: 10,
      }}
    >
      <Text style={{ textAlign: "center" }}>Data Kosong</Text>
    </View>
  );

  const increasePages = () => {
    let p = Number(page) + 1;
    setPage(p);
    console.log(page + " after increase");
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={styles.sliderItem}
        onPress={() => navigation.navigate("SearchDetailStack", { item: item })}
      >
        <Image
          source={{ uri: `${API_URL}/img/tempat/${item.image}` }}
          style={styles.sliderImage}
        />
        <View style={styles.sliderView}>
          <Text style={styles.sliderItemTitle}>{item.name}</Text>
          <Text
            style={styles.sliderItemSubtitle}
          >{`${item.desa} ${item.kecamatan}`}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput
            style={styles.searchInput}
            onChangeText={(text) => setCari(text)}
          />
          <Pressable
            style={({ pressed }) => [
              styles.searchButton,
              pressed && styles.pressed,
            ]}
            onPress={searchPressed}
          >
            <Ionicons name="search" size={24} color={"white"} />
          </Pressable>
          {/* <Pressable
            style={({ pressed }) => [
              styles.filterButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="menu" size={24} color={"white"} />
          </Pressable> */}
        </View>
        {loading && <ActivityIndicator size={"large"} style={{flex:1,justifyContent:"center"}} />}
        {!loading && (
          <FlatList
            numColumns={2}
            data={data}
            renderItem={renderItem}
            ListEmptyComponent={emptyItem}
            ListFooterComponent={footerItem}
            onEndReachedThreshold={0.01}
            onEndReached={() => setIsEndScrolled(true)}
            onMomentumScrollEnd={() => {
              isEndScrolled && loadMore();
              setIsEndScrolled(false);
            }}
            keyExtractor={(item, key) => key}
            style={styles.listView}
          />
        )}
      </View>
    </>
  );

  async function searchPressed() {
    console.log(cari);
    search()
    setMoreLoading(false)
  }

  async function search() {
    setLoading(true);
    let res = await getPage(0, limit, cari, tag);
    setPage(1)
    setData(res.data.data);
    setLastPage(res.data.last_page);
    setTotalData(res.data.total)
    setLoading(false);
  }

  async function loadMore() {
    if (page == lastPage) {
      setIsListEnd(true);
    } else {
      setMoreLoading(true);
      let res = await getPage(page, limit, cari, tag);
      let result = res.data.data;
      console.log(result.length);
      var temp = data;
      for (let index = 0; index < result.length; index++) {
        temp.push(result[index]);
      }
      setData(temp);
      increasePages();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pressed: {
    opacity: 0.5,
  },
  search: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 7,
    backgroundColor: "white",
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: 'blue',
    borderWidth: 1
  },
  searchButton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "blue",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  filterButton: {
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  sliderTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  sliderView: {
    padding: 5,
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  sliderImage: {
    flex: 1,
    borderRadius: 10,
    width: Dimensions.get("window").width / 2 - 20,
    height: Dimensions.get("window").height / 3,
  },
  sliderItem: {
    marginHorizontal: 10,
    marginVertical: 10,
    width: Dimensions.get("window").width / 2 - 20,
    height: Dimensions.get("window").height / 3,
    borderRadius: 10,
  },
  sliderItemTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  sliderItemSubtitle: {
    textAlign: "center",
    color: "white",
  },
  listView: {
    // backgroundColor: "red",
  },
});
