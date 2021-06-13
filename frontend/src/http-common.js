import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://gorest.co.in/public-api/todos",
  headers: {
    "Content-type": "application/json"
  }
});
