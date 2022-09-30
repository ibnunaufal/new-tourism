import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <View style={styles.container}>
      {!isLoggedIn && (
        <View style={styles.isEmpty}>
          <Image
            style={{ width: 100, height: 100, marginBottom: 10 }}
            source={require("./../assets/image/null.png")}
          />
          <Text>Anda Belum Login</Text>
          <Button title="Login" onPress={()=> {navigation.navigate('Login')}} />
          <Button title="Register" onPress={()=> {navigation.navigate('Register')}} />
        </View>
      )}
      {isLoggedIn && (
        <View style={styles.loggedInView}>
          <View style={styles.topView}>
            <Image
              style={{ width: 100, height: 100, marginBottom: 10 }}
              source={require("./../assets/image/logo-salatiga.png")}
            />
            <Text style={styles.appName}>Dolan Salatiga</Text>
            <Text>versi 0.0.1</Text>
          </View>
          <View style={styles.bottomView}>
            <Pressable
              style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            >
              <Ionicons name="person" size={24} color={"white"} />
              <View style={styles.textView}>
                <Text style={styles.text}>Nama</Text>
              </View>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            >
              <Ionicons name="mail" size={24} color={"white"} />
              <View style={styles.textView}>
                <Text style={styles.text}>Email</Text>
              </View>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            >
              <Ionicons name="exit" size={24} color={"white"} />
              <View style={styles.textView}>
                <Text style={styles.text}>Logout</Text>
              </View>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  appName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  isEmpty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loggedInView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  item: {
    marginVertical: 5,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "grey",
    borderRadius: 10,
  },
  textView: {
    marginLeft: 10,
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
  pressed: {
    opacity: 0.6,
  },
});
