<template>
  <h1>UoPS Admin - Course List</h1>
  <div><router-link :to="'/adminHome/'"  class="btn btn-success">Back To Admin Home</router-link></div>
    <div class="list row">
      <div class="col-md-8">
    
      </div>
      <div class="col-md-6">
        <h4>Course List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(course, index) in courses"
            :key="index"
            @click="setActiveCourse(course, index)"
          >
            {{ course.CourseID }}
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <div v-if="currentCourse">
          <h4>Course</h4>
          <router-link :to="'/adminCDeets/' + currentCourse._id"  class="btn btn-success">Edit</router-link> 
          <div>
            <label><strong>CourseID:</strong></label> {{ currentCourse.CourseID }}
          </div>
          <div>
            <label><strong>CourseName:</strong></label> {{ currentCourse.CourseName }}
          </div>
          <div>
            <label><strong>CourseLeader:</strong></label> {{ currentModuleLeader }}
          </div>
          <!-- <router-link :to="'/courses/' + currentCourse._id" class="badge badge-danger">Edit</router-link> -->
        </div>
        <div v-else>
          <br />
          <p>Please click on a course...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CourseDataService from "../services/CourseDataService.js";
  import LecturerDataService from "../services/LecturerDataService.js";
  export default {
    name: "courses-list",
    data() {
      return {
        courses: [],
        currentCourse: null,
        currentModuleLeader: null,
        currentIndex: -1,
        name: ""
      };
    },
    methods: {
      retrieveCourses() {
        CourseDataService.getAll()
          .then(response => {
            this.courses = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
        
      },
      getLecturer(course) {
        console.log(course);
        console.log(course.CourseLeader);
        LecturerDataService.get(course.CourseLeader)
          .then(response => {
            this.currentModuleLeader = response.data[0].LecturerFName + "  " + response.data[0].LecturerSName;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      refreshList() {
        this.retrieveCourses();
        this.currentCourse = null;
        this.currentIndex = -1;
      },
  
      setActiveCourse(course, index) {
        this.getLecturer(course);
        this.currentCourse = course;
        this.currentIndex = course ? index : -1;
      },
    },
    mounted() {
      this.retrieveCourses();
    }
  };
  </script>
  
  <style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  </style>