import { Alert, Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { APPVERSION } from "../utils/version";
import { getProfile, logoutProfile } from "../utils/localstorage";

export default function ProfileScreen({route}) {
  const navigation = useNavigation();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState([{
    name:'',
    email:''
  }])
  const isFocused = useIsFocused();
  useEffect(() => {
    async function init() {
      let x = await getProfile();
      console.log(x)
      if(x===null){
        setIsLoggedIn(false)
      }else{
        setProfile(x)
        setIsLoggedIn(true)
      }
    }
    if(isFocused){
      init()
    }
    // init();
    console.log('focus '+isFocused)
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {!isLoggedIn && (
        <View style={styles.isEmpty}>
          <Image
            style={{ width: 100, height: 100, marginBottom: 10 }}
            source={require("./../assets/image/null.png")}
          />
          <Text>Anda Belum Login</Text>
          <View style={{margin: 10}}>
            <Button title="Login" onPress={()=> {navigation.navigate('Login')}} />
          </View>
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
            <Text>versi {APPVERSION}</Text>
          </View>
          <View style={styles.bottomView}>
            <Pressable
              style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            >
              <Ionicons name="person" size={24} color={"white"} />
              <View style={styles.textView}>
                <Text style={styles.text}>{profile[0].name}</Text>
              </View>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.item, pressed && styles.pressed]}
            >
              <Ionicons name="mail" size={24} color={"white"} />
              <View style={styles.textView}>
                <Text style={styles.text}>{profile[0].email}</Text>
              </View>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.item, pressed && styles.pressed]}
              onPress={() => {
                Alert.alert(
                  "Logout",
                  "Anda akan keluar dari akun ini?",
                  [
                    {
                      text: "Batal",
                      onPress: () => console.log("Cancel"),
                      style: "cancel",
                    },
                    {
                      text: "Keluar",
                      onPress: () => {
                        logoutProfile()
                        setIsLoggedIn(false)
                        setProfile([])
                      },
                      style: "default",
                    },
                  ]
                );
              }}
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
