import AsyncStorage from "@react-native-async-storage/async-storage";

export const setObjectValue = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("key", jsonValue);
  } catch (e) {
    // save error
  }

  console.log("Done.");
};
export const getMyObject = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("key");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }

  console.log("Done.");
};

export async function addBookmark(item) {
  let initObject = await getMyObject();
  let favArr = initObject.fav;
  favArr.push(item);
  initObject.fav = favArr;
  setObjectValue(initObject);
}
export async function deleteBookmark(item) {
  let initObject = await getMyObject();
  let favArr = initObject.fav;
  favArr.push(item);
  initObject.fav = favArr;
  setObjectValue(initObject);
}
export async function getBookmark() {
  let initObject = await getMyObject();
  return initObject.fav;
}

export async function saveProfile(item) {
  let initObject = await getMyObject();
  initObject.profile = item;
  setObjectValue(initObject);
}
export async function getProfile() {
  let initObject = await getMyObject();
  return initObject.profile;
}

// let example = {
//     fav: [{
//         ...item
//     }],
//     profile: {
//         name:'aaa'
//     }
// }
