import http from "../http-common";
import authHeader from './auth-header';
class ModuleDataService {

    getAll() {
      return http.get("/Module/Modules",
      { headers: authHeader() });
    }

    getMineLecturer(id){
        return http.get(`/Lecturer/getModules/${id}`,
        { headers: authHeader() });
    }
    getMineStudent(id){
        return http.get(`/Student/getModules/${id}`,
        { headers: authHeader() });
    }
    get(id) {
        return http.get(`/Module/Modules/${id}`)
    }

    create(data) {
        return http.post("/Module/Modules", data);
    }

    update(id, data) {
        console.log("!");
        return http.put(`/Module/Modules/${id}`, data);
    }

    delete(id) {
        return http.delete(`/Module/Modules/${id}`);
    }

    deleteAll() {
        return http.delete(`/Module/Modules`);
    }

    findByName(name) {
        return http.get(`/Module/Modules?name=${name}`);
    }  
}

export default new ModuleDataService();