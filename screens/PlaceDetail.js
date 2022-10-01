import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { API_URL, getAllImages, getAllReview } from "../utils/http";
import {
  addBookmark,
  deleteBookmark,
  findBookmark,
  getBookmark,
} from "../utils/localstorage";

export default function PlaceDetail({ route, navigation }) {
  const { item } = route.params;
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    getImages();
    async function find() {
      let x = await findBookmark(item.id);
      console.log(x);
      setIsSaved(x);
    }
    find();
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => bookmarkPress()}>
          {isSaved && <Ionicons name="bookmark" size={24} color={"black"} />}
          {!isSaved && (
            <Ionicons name="bookmark-outline" size={24} color={"black"} />
          )}
        </Pressable>
      ),
    });
  });
  function bookmarkPress() {
    console.log("pre");
    if (isSaved) {
      deleteBookmark(item);
      setIsSaved(false);
    } else {
      addBookmark(item);
      setIsSaved(true);
    }
  }
  const renderItemReview = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
        <Text>{item.message}</Text>
      </View>
    );
  };
  const renderItemImage = ({ item }) => {
    return (
      <Pressable
        style={styles.sliderItem}
        onPress={() =>
          navigation.navigate("ImageDetail", {
            image: item.image,
            type: "tempat",
          })
        }
      >
        <Image
          source={{ uri: `${API_URL}img/tempat/${item.image}` }}
          style={styles.sliderImage}
        />
      </Pressable>
    );
  };
  async function getImages() {
    setLoading(true);
    let res = await getAllImages(item.id);
    let res2 = await getAllReview(item.id);
    let temp = [];
    if (res.data.length === 0) {
      temp.push({ image: item.image });
      setImages(temp);
    } else {
      setImages(res.data);
    }
    setReviews(res2.data);
    setLoading(false);
    // console.log(temp)
  }
  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <ActivityIndicator
          size={"large"}
          style={{ flex: 1, justifyContent: "center" }}
        />
      )}
      {!loading && (
        <ScrollView style={styles.container}>
          <FlatList
            data={images}
            horizontal={true}
            renderItem={renderItemImage}
            style={{ width: "100%", }}
          />
          <View style={styles.content}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.topField}>
              <Ionicons name="pin" size={24} color={"black"} />
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.textField}>
                  {item.desa} {item.kecamatan}
                </Text>
              </View>
            </View>
            <View style={styles.topField}>
              <Ionicons name="pricetag" size={24} color={"black"} />
              <View style={{ justifyContent: "center" }}></View>
              <Text style={styles.textField}>
                {String(item.ticket) == "0" ? "Gratis" : item.ticket}
              </Text>
            </View>
            <View style={styles.topField}>
              <Ionicons name="time" size={24} color={"black"} />
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.textField}>{item.seninJumat}</Text>
              </View>
            </View>
            <View style={{}}>
              <Text style={styles.textField}>{item.desc}</Text>
            </View>
            <View style={styles.topField}>
              <Ionicons name="body" size={24} color={"black"} />
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.textField}>
                  {String(item.disabilities) == "0" ? "Tidak" : ""} Ramah
                  Disabilitas
                </Text>
              </View>
            </View>
            <View style={styles.topField}>
              <Ionicons name="wifi" size={24} color={"black"} />
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.textField}>
                  Wifi {String(item.wifi) == "0" ? "Tidak" : ""}Tersedia
                </Text>
              </View>
            </View>
            <View style={styles.topField}>
              <Ionicons name="car" size={24} color={"black"} />
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.textField}>
                  Parkir {String(item.wifi) == "0" ? "Tidak" : ""}Tersedia
                </Text>
              </View>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.topField,
                pressed && { opacity: 0.5 },
              ]}
              onPress={() => {
                Alert.alert(
                  "Buka di Maps",
                  "Anda akan diarahkan ke Google Maps",
                  [
                    {
                      text: "Batal",
                      onPress: () => console.log("Cancel"),
                      style: "cancel",
                    },
                    {
                      text: "Buka Sekarang",
                      onPress: () => {
                        console.log("Update");
                        // Linking.openURL("market://details?id=com.salatiga.tourism");
                        Linking.openURL(
                          item.mapUrl
                        );
                        // Linking.openURL("https://wa.me/6281225951789");
                      },
                      style: "default",
                    },
                  ]
                );
              }}
            >
              <Ionicons name="map" size={24} color={"black"} />
              <View style={{ justifyContent: "center" }}>
                <Text style={[styles.textField, { color: "blue" }]}>
                  {"Lihat lokasi di Google Maps >"}
                </Text>
              </View>
            </Pressable>
            <View style={styles.topField}>
              <Text>Tags: {item.tags}</Text>
            </View>
          </View>
          {/* <View style={styles.mainReview}>
            <View style={styles.topReview}>
              <Text>Review:</Text>
              <Text>Tambah Review</Text>
            </View>
            {reviews.map((item) => (
              <View>
                <Text>{item.name}</Text>
                <Text>{item.message}</Text>
              </View>
            ))}
          </View> */}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    backgroundColor: "white",
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  topField: {
    flexDirection: "row",
    margin: 5,
  },
  itemField: {
    flexDirection: "row",
  },
  textField: {
    fontSize: 14,
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  mainReview: {
    backgroundColor: "white",
    marginVertical: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  topReview: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sliderItem: {
    // width: Dimensions.get("screen").width / 2,
    // height: Dimensions.get("screen").height / 3,
    borderRadius: 10,
  },
  sliderImage: {
    flex: 1,
    borderRadius: 10,
    width: Dimensions.get("screen").width - 40,
    height: Dimensions.get("screen").height / 3,
    backgroundColor: 'red'
  },
});
