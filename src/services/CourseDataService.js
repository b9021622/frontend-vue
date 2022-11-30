import http from "../http-common";

class CourseDataService {

    getAll() {
      return http.get("/course/courses");
    }

    get(id) {
        return http.get(`/course/courses/${id}`)
    }
    
    addModule(data){
        return http.post("/course/courses/addMod", data);
    }
    create(data) {
        return http.post("/course/courses", data);
    }

    update(id, data) {
        return http.put(`/course/courses/${id}`, data);
    }

    delete(id) {
        return http.delete(`/course/courses/${id}`);
    }

    deleteAll() {
        return http.delete(`/course/courses`);
    }

    findByName(name) {
        return http.get(`/course/courses?name=${name}`);
    }  
}

export default new CourseDataService();