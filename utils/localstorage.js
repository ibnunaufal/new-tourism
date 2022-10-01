import AsyncStorage from "@react-native-async-storage/async-storage";

export const setObjectValue = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("bookmark", jsonValue);
  } catch (e) {
    // save error
  }

  console.log("Done.");
};
export const getMyObject = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("bookmark");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }

  console.log("Done.");
};

export const setObjectProfileValue = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("profile", jsonValue);
  } catch (e) {
    // save error
  }

  console.log("Done.");
};
export const getProfleObject = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("profile");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }

  console.log("Done.");
};

export async function addBookmark(item) {
  let initObject = await getMyObject();
  let favArr = []
  if(!initObject){
    favArr.push(item)
    setObjectValue(favArr);
    return  
  }
  favArr = initObject;
  favArr.push(item);
  initObject = favArr;
  setObjectValue(initObject);
}
export async function deleteBookmark(item) {
  let initObject = await getMyObject();
  let favArr = []
  favArr = initObject;
  for (let i = 0; i < favArr.length; i++) {
    const element = favArr[i];
    if(element.id === item.id){
      favArr.splice(i,1)
    }
  }
  setObjectValue(initObject);
}
export async function getBookmark() {
  console.log('getting bookmark...')
  let initObject = await getMyObject();
  return initObject;
}

export async function findBookmark(id) {
  console.log('find bookmark...' + id)
  let initObject = await getMyObject();
  let temp = false
  if(!initObject){
    temp = false
  }
  await initObject.forEach(element => {
    // console.log(JSON.stringify(element))
    if(String(element.id) === String(id)){
      console.log(id + " = " + element.id)
      temp = true
    }
  });
  return temp
}

export async function saveProfile(item) {
  let initObject = await getProfleObject();
  initObject = item;
  setObjectProfileValue(initObject);
}
export async function getProfile() {
  let initObject = await getProfleObject();
  return initObject;
}
export async function logoutProfile() {
  await AsyncStorage.clear()
  // let initObject = await getProfleObject();
  // return initObject;
}

// let example = {
//     fav: [{
//         ...item
//     }],
//     profile: {
//         name:'aaa'
//     }
// }
