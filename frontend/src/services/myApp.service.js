import http from '../http-common';

class MyAppDataService {
  getAll() {
    //return http.get("/myapps");
    return http.get("/");
  }
  // get(id) {
  //   return http.get(`/myapps/${id}`);
  // }
  // create(data) {
  //   return http.post("/myapps", data);
  // }
  // update(id, data) {
  //   return http.put(`/myapps/${id}`, data);
  // }
  // delete(id) {
  //   return http.delete(`/myapps/${id}`);
  // }
  // deleteAll() {
  //   return http.delete(`/myapps`);
  // }
  // findByTitle(title) {
  //   return http.get(`/myapps?title=${title}`);
  // }
}

export default new MyAppDataService();
