<template>
  <h1>UoPS Admin - Add Courses</h1>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">CourseID</label>
        <input
          type="text"
          class="form-control"
          id="CourseID"
          required
          v-model="Course.CourseID"
          name="CourseID"
        />
      </div>
      <div class="form-group">
        <label for="name">CourseName</label>
        <input
          type="text"
          class="form-control"
          id="CourseName"
          required
          v-model="Course.CourseName"
          name="CourseName"
        />
      </div>
      <div class="form-group">
        <label for="colour">Course Leader</label>
        <input
          class="form-control"
          id="LecturerID"
          required
          v-model="Course.CourseLeader"
          name="LecturerID"
        />
      </div>
      <select v-model="Course.CourseLeader"> <option class="list-group-item"
        v-for=" (lec, index) in Lecturers" :value="lec._id"
        :key="index" 
        >
         {{  lec.LecturerFName + "  " +  lec.LecturerSName
           
        }}</option>
    </select >

      <button @click="saveCourse" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newCourse">Add</button>
    </div>
  </div>
</template>

<script>
import LecturerDataService from "@/services/LecturerDataService";
import CourseDataService from "../services/CourseDataService";

export default {
  name: "add-course",
  data() {
    return {
      Course: {
        id: null,
        CourseID: "",
        CourseName: "",
        CourseLeader: ""
      },
      Lecturers: [],
      LecturerNames: [],
      submitted: false
    };
  },
  methods: {
    getLecturers(){
      LecturerDataService.getAll()
      .then(response => {
          this.Lecturers = response.data,
          console.log(response.data)
        })
        .catch(e => {
          console.log(e);
        });
    },
    saveCourse() {
      var data = {
        CourseID: this.Course.CourseID,
        CourseName: this.Course.CourseName,
        CourseLeader: this.Course.CourseLeader
      };
      console.log(data);
      CourseDataService.create(data)
        .then(response => {
          this.Course.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newCourse() {
      this.submitted = false;
      this.Course = {};
    }
  },
  mounted() {
 
 this.getLecturers();
}
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>