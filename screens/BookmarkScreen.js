import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocalData, getMyObject, gettingLocalData, savingLocalData, setObjectValue, storeLocalData } from "../utils/localstorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookmarkScreen() {
  const [datas, setDatas] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function init(){
      // await storeLocalData({data:"data"})
      // let x = await gettingLocalData()
      // console.log(x)
      // setObjectValue({d:'c'})
      setLoading(true)
      let x = await getMyObject()
      setDatas(x)
      setLoading(false)
    }
    init()
  }, []);
  return (
    <View>
      {!loading&&<Text>{JSON.stringify(datas)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({});
