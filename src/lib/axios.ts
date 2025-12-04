import axios from "axios";

const URL = "http://projeto-armarinho-list-back.vercel.app";

/* projeto-armarinho-list-back.vercel.app */

/* localhost:5000 */
export default axios.create({
  baseURL: URL,
});
