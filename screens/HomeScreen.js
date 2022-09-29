import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL, getData, getHomeData } from "../utils/http";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [headline, setHeadline] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [acara, setAcara] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    init();
  }, []);

  const HeadlineItem = ({ item }) => {
    return (
      <View style={styles.sliderItem}>
        <Image
          source={{ uri: `${API_URL}/img/headline/${item.image}` }}
          style={styles.sliderImage}
        />
        <View style={styles.sliderView}>
          <Text style={styles.sliderItemTitle}>{item.title}</Text>
          <Text style={styles.sliderItemSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
    );
  };
  const RekomItem = ({ item }) => {
    return (
      <Pressable
        style={styles.sliderItem}
        onPress={() => navigation.navigate("HomeDetailStack", { item: item })}
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
  const AcaraItem = ({ item }) => {
    return (
      <View style={styles.sliderItem}>
        <Image
          source={{ uri: `${API_URL}/img/acara/${item.image}` }}
          style={styles.sliderImage}
        />
        <View style={styles.sliderView}>
          <Text style={styles.sliderItemTitle}>{item.name}</Text>
          <Text
            style={styles.sliderItemSubtitle}
          >{`${item.desa} ${item.kecamatan}`}</Text>
        </View>
      </View>
    );
  };

  async function init() {
    setLoading(true);
    const data = await getHomeData();
    setHeadline(data.data.headline);
    setRecomendation(data.data.tempat);
    setAcara(data.data.event);
    console.log(data.data.headline);
    setLoading(false);
  }

  return (
    <ScrollView style={styles.container}>
      {loading && <ActivityIndicator size={"large"} />}
      {!loading && (
        <View style={{ flex: 1 }}>
          <View style={styles.top}>
            <Text style={styles.title}>Dolan Salatiga</Text>
            <Image
              style={styles.logo}
              source={require("./../assets/image/logo-salatiga.png")}
            />
          </View>
          <View style={styles.slider}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={HeadlineItem}
              data={headline}
            />
          </View>
          <View style={styles.slider}>
            <View style={styles.sliderTitle}>
              <Text>Rekomendasi</Text>
              <Pressable onPress={() => navigation.navigate("Search")}>
                <Text style={{ color: "blue" }}>{"Lihat Semua >"}</Text>
              </Pressable>
            </View>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={RekomItem}
              data={recomendation}
            />
          </View>
          <View style={styles.slider}>
            <View style={styles.sliderTitle}>
              <Text>Acara</Text>
              <Pressable onPress={() => navigation.navigate("AcaraStack")}>
                <Text style={{ color: "blue" }}>{"Lihat Semua >"}</Text>
              </Pressable>
            </View>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={AcaraItem}
              data={acara}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  slider: {
    marginVertical: 10,
  },
  sliderTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
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
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").height / 3,
  },
  sliderItem: {
    marginHorizontal: 10,
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").height / 3,
    borderRadius: 10,
  },
  sliderItemTitle: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  sliderItemSubtitle: {
    textAlign: "center",
    color: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    // backgroundColor: 'blue'
  },
});
