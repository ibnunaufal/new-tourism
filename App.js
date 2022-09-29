import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import BookmarkScreen from "./screens/BookmarkScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaceDetail from "./screens/PlaceDetail";
import AcaraScreen from "./screens/AcaraScreen";
import AcaraDetailScreen from "./screens/AcaraDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <>
      <StatusBar style="default" />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchStack}
            options={{
              headerShown: false,
              title: "Search",
              tabBarLabel: "Search",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="search" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Bookmark"
            component={BookmarkScreen}
            options={{
              title: "Bookmark",
              tabBarLabel: "Bookmark",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="bookmark" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

function HomeStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeStack" component={HomeScreen} options={{
        title: 'Home',
        headerShown: false
      }} />
      <Stack.Screen name="HomeDetailStack" component={PlaceDetail} options={{
        title: 'Detail'
      }} />
      <Stack.Screen name="AcaraStack" component={AcaraScreen} options={{
        title: 'Acara'
      }} />
      <Stack.Screen name="AcaraDetailStack" component={AcaraDetailScreen} options={{
        title: 'Detail Acara'
      }} />
    </Stack.Navigator>
  )
}

function SearchStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchStack" component={SearchScreen} options={{
        title: 'Pencarian'
      }} />
      <Stack.Screen name="SearchDetailStack" component={PlaceDetail} options={{
        title: 'Detail'
      }} />
    </Stack.Navigator>
  )
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
