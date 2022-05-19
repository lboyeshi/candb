import axios from "axios";
export const axios_fetcher = (url: string) =>
  axios.get(url).then((res) => res.data);
