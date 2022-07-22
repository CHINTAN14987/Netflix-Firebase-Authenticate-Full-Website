import axios from "axios";
var Api_Key = "AIzaSyCxv1k2shJN8vzytNJiHDTkxW2wIGyvG4c";
export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: { part: "snippet", maxresults: 5, key: Api_Key },
  headers: {},
});
