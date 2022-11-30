import http from "../http-common";

class LecturerDataService {

    getAll() {
      return http.get("/lecturer/lecturers");
    }

    get(id) {
        return http.get(`/lecturer/lecturers/${id}`)
    }

    

    create(data) {
        return http.post("/lecturer/lecturers", data);
    }

    update(id, data) {
        return http.put(`/lecturer/lecturers/${id}`, data);
    }

    delete(id) {
        return http.delete(`/lecturer/lecturers/${id}`);
    }

    deleteAll() {
        return http.delete(`/lecturer/lecturers`);
    }

    findByName(name) {
        return http.get(`/lecturer/lecturers?name=${name}`);
    }  
}

export default new LecturerDataService();