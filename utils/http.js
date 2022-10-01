import axios from "axios";
import { AxiosResponse, AxiosError } from 'axios'


export const API_URL = "https://salatigatourism.com/";

export async function getData(url) {
  console.log(`GET ${API_URL + url}`);
  const response = await axios.get(API_URL + url);
  return response;
}
export async function postData(url) {
  const response = await axios.get(API_URL + url);
  return response;
}

export async function getHomeData() {
  return await getData("api/mobilehome");
}

export async function getPage(page, limit, cari, tags) {
  let url = "";
  if (!cari) {
    cari = "";
  }
  if (!tags) {
    tags = "";
  }
  url =
    "api/getpage?page=" +
    page +
    "&limit=" +
    limit +
    "&cari=" +
    cari +
    "&tags=" +
    tags;

  return await getData(url);
}

export async function getAllImages(id) {
  let url = "api/imagebyid?cari=" + id;
  return await getData(url);
}
export async function getAllReview(id) {
  let url = "api/reviewbyid?cari=" + id;
  return await getData(url);
}
export async function getAcaraPage(page, limit, cari, tags) {
  let url = "";
  if (!cari) {
    cari = "";
  }
  if (!tags) {
    tags = "";
  }
  url =
    "api/getacara?page=" +
    page +
    "&limit=" +
    limit +
    "&cari=" +
    cari +
    "&tags=" +
    tags;
  return await getData(url);
}

export async function doLogin(username, password) {
  let url = API_URL + "api/mobileactionlogin?email=" + username + "&password=" + password;
  // return await getData(url);
  // console.log(url)
  // axios.get(url).then(async(res) => {
  //   return res
  // }).catch(async(e)=>{
  //   return e
  // })
  
  // axios.get('foo.example')
  // .then((response: AxiosResponse) => {
  //   // Handle response
  // })
  // .catch((reason: AxiosError) => {
  //   if (reason.response!.status === 400) {
  //     // Handle 400
  //   } else {
  //     // Handle else
  //   }
  //   console.log(reason.message)
  // })
}

export async function doRegister(name, email, password) {
  let url =
    "api/mobilepostRegistration?email=" +
    email +
    "&name=" +
    name +
    "&password=" +
    password;
  return await getData(url);
}

export async function getAppInfo(){
  let url = "api/getInfo?id=com.salatiga.tourism"
  // let url = "api/getInfo?id=id.co.solusinegeri.katalis"
  return await getData(url)
}
