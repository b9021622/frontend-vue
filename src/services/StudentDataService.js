import http from "../http-common";

class StudentDataService {

    getAll() {
      return http.get("/Student/Students");
    }

    get(id) {
        return http.get(`/Student/Students/${id}`)
    }

    getModules(id){
        return http.get(`/Student/getModules/${id}`)
    }

    create(data) {
        return http.post("/Student/Students", data);
    }
    addSession(id, data){
        console.log(id, data);
        return http.post(`/Student/add/${id}`, data);
    }
    registerAttendance(id, data){
        console.log(id);
        return http.post(`/Student/attended/${id}`, data);
    }
    update(id, data) {
        return http.put(`/Student/Students/${id}`, data);
    }

    delete(id) {
        return http.delete(`/Student/Students/${id}`);
    }

    deleteAll() {
        return http.delete(`/Student/Students`);
    }

    findByName(name) {
        return http.get(`/Student/Students?name=${name}`);
    }  
}

export default new StudentDataService();