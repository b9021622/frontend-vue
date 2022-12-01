<template>
  <h1>UoPS Admin - Course Details</h1>
  <div><router-link :to="'/view-courses/'"  class="btn btn-success">Back To Courses</router-link></div>
  <div v-if="currentCourse" class="edit-form">
    <form>
      <div class="form-group">
        <label for="CourseID"> CourseID </label>
        <input type="text" class="form-control" id="CourseID"
          v-model="currentCourse.CourseID"
        >
      </div>
      <div class="form-group">
        <label for="CourseName">Course Name</label>
       
        <input type="text" class="form-control" id="CourseName"
          v-model="currentCourse.CourseName"
        />
      </div>
      <div>
      <label for="why">Course Leader:</label>
      <select id = "Why" v-model="currentCourse.CourseLeader"> <option class="list-group-item"
        v-for=" (lec, index) in Lecturers" :value="lec._id"
        :key="index" 
        >
         {{  lec.LecturerFName + "  " +  lec.LecturerSName
           
        }}
        </option>
      </select >
      </div>

      <div>
  </div>
    </form>

    <button class="btn btn-success" id = "danger"
      @click="deleteCourse"
    >
      Delete
    </button>

    <button type="submit" class="btn btn-success"
      @click="updateCourse()"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on an Course...</p>
  </div>
</template>

<script>
import CourseDataService from "../services/CourseDataService";
import LecturerDataService from "../services/LecturerDataService";
export default {
  name: "Course-details",
  data() {
    return {
      currentCourse: null,
      currentCourseLeader: null,
      message: '',
      Lecturers : []
    };
  },
  methods: {
    getCourse(id) {
      CourseDataService.get(id)
        .then(response => {
          this.currentCourse = response.data[0];
          console.log("Current Course");
          console.log(response.data);
          this.getLecturers()
          console.log(this.CourseID);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getLecturers(){
        console.log("Here");
        LecturerDataService.getAll()
        .then(response => {
            this.Lecturers = response.data,
            
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          })}
      ,
    updateCourse() {
      console.log("?");
      console.log(this.currentCourse);
      CourseDataService.update(this.currentCourse._id, this.currentCourse)
        .then(response => {
          console.log(response.data);
          this.message = 'The Course was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteCourse() {
      console.log("£");
      CourseDataService.delete(this.currentCourse._id)
        .then(response => {
          console.log(response.data);
          this.$router.push("/view-Courses");
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getCourse(this.$route.params.id);
    
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>