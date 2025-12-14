import axios from "axios";

const URL = "http://localhost:5000";

/* projeto-armarinho-list-back.vercel.app */

/* localhost:5000 */
export default axios.create({
  baseURL: URL,
});
