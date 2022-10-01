import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { API_URL, getAllImages, getAllReview } from "../utils/http";
import axios from "axios";
import { saveProfile } from "../utils/localstorage";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation();
  const [errMsg, setErrMsg] = useState("");

  async function register() {
    let url =
      API_URL +
      "api/mobilepostRegistration?name=" +
      name +
      "&email=" +
      username +
      "&password=" +
      password;
    // console.log(url);
    setIsLoading(true);
    setErrMsg('')
    axios
      .get(url)
      .then((res) => {
        setIsLoading(false);
        setIsError(false);
        // console.log(res.data);
        saveAndExit(res.data.profile)
      })
      .catch(function (error) {
        setIsLoading(false);
        setIsError(true);
        if (error.response) {
          console.log(error.response.data);
          // setErrMsg(error.response.data.message)
          Alert.alert("Gagal",error.response.data.message)
          console.log(error.response.status);
          if (String(error.response.status) === "401") {
            Alert.alert("Gagal", "Username atau password salah");
          }
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        // console.log(error.config);
      });
  }

  async function saveAndExit(data){
    await saveProfile(data)
    navigation.navigate('ProfileStack')
  }

  return (
    <View style={styles.container}>
      {isLoading && (
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(52, 52, 52, 0.8)",
            ...StyleSheet.absoluteFill,
            zIndex: 2,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.text}>Register</Text>
        <View style={styles.input}>
          <Ionicons name="person" size={24} color={"white"} />
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setName(text)}
            placeholder={"Masukkan Nama Anda"}
          />
        </View>
        <View style={styles.input}>
          <Ionicons name="mail" size={24} color={"white"} />
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setUsername(text)}
            keyboardType={"email-address"}
            placeholder={"Masukkan Email Anda"}
          />
        </View>
        <View style={styles.input}>
          <Ionicons name="lock-closed" size={24} color={"white"} />
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            placeholder={"Masukkan Password Anda"}
          />
        </View>
        <Button title="Register" onPress={register} />
        {errMsg !== "" && (
          <Pressable
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => setErrMsg("")}
          >
            <Text
              style={{ color: "red", fontWeight: "bold", textAlign: "center" }}
            >
              {errMsg}
            </Text>
            <Text style={{ fontSize: 10, textAlign: "center" }}>
              Klik disini untuk menutup pesan ini
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    margin: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
  },
  input: {
    backgroundColor: "#ccc",
    borderRadius: 5,
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
  },
  textInput: {
    marginHorizontal: 5,
    width: Dimensions.get("window").width / 1.5 - 20,
  },
});
