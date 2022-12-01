import http from "../http-common";

class SessionDataService {

    getAll() {
      return http.get("/Session/Sessions");
    }
    get(id) {
        return http.get(`/Session/Sessions/${id}`)
    }
    addCode(data){
        return http.post(`/Session/code`, data)
    }
    getCode(id){
        return http.get(`/Session/code/${id}`)
    }
    getByCode(id){
        return http.get(`/Session/bycode/${id}`)
    }

    create(data) {
        return http.post("/Session/Sessions", data);
    }

    update(id, data) {
        console.log("sESION!");
        return http.put(`/Session/Sessions/${id}`, data);
    }

    delete(id) {
        return http.delete(`/Session/Sessions/${id}`);
    }

    deleteAll() {
        return http.delete(`/Session/Sessions`);
    }

    findByName(name) {
        return http.get(`/Session/Sessions?name=${name}`);
    }  
}

export default new SessionDataService();