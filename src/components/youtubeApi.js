import axios from "axios";
var Api_Key = "AIzaSyCvnX1UTb0SDJp1Dmf6STep9jXD1GSOGqs";
export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: { part: "snippet", maxresults: 5, key: Api_Key },
  headers: {},
});
