import axios from "axios";
var Api_Key = "AIzaSyAMjSZyyB4EJ-Qid7H_Fov269lnzetOFWE";
export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: { part: "snippet", maxresults: 5, key: Api_Key },
  headers: {},
});
