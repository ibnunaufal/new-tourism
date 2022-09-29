import axios from "axios";

export const API_URL = "https://salatigatourism.com/";

export async function getData(url) {
  const response = await axios.get(API_URL + url);
  console.log(`GET ${API_URL + url}`);
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
export async function getAcaraPage(page, limit, cari, tags){
  let url = ""
  if(!cari){
    cari = ""
  }
  if(!tags){
    tags = ""
  }
  url = 'api/getacara?page='+page+'&limit='+limit+'&cari='+cari+'&tags='+tags;
  return await getData(url)
}
