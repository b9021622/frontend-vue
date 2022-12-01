<template>
  <h1>UoPS Admin - Add Modules</h1>
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="name">ModuleID</label>
          <input
            type="text"
            class="form-control"
            id="ModuleID"
            required
            v-model="Module.ModuleID"
            name="ModuleID"
          />
        </div>
        <div class="form-group">
          <label for="name">ModuleName</label>
          <input
            type="text"
            class="form-control"
            id="ModuleName"
            required
            v-model="Module.ModuleName"
            name="ModuleName"
          />
        </div>
        <div>
        <label for="why">Module Leader:</label>
        <select id = "Why" label: Module Leader v-model="Module.ModuleLeader"> <option class="list-group-item"
          v-for=" (lec, index) in Lecturers" :value="lec._id"
          :key="index" 
          >
           {{  lec.LecturerFName + "  " +  lec.LecturerSName
             
          }}
          </option>
        </select >
        </div>
      <div>
      <label for="whynot"> Course:</label>
        <select id="whynot" label: Module Leader v-model="Module.CourseID"> 
        <option class="list-group-item"
          v-for=" (lec, index) in Courses" :value="lec._id"
          :key="index" 
          >
           {{  lec.CourseName
             
          }}
        </option>
      </select >
      </div>
        <button @click="saveModule" class="btn btn-success">Submit</button>
      </div>
  
      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newModule">Add</button>
      </div>
    </div>
  </template>
  
  <script>
  import LecturerDataService from "../services/LecturerDataService";
import ModuleDataService from "../services/ModuleDataService";
import CourseDataService from "../services/CourseDataService";
  export default {
    name: "add-module",
    data() {
      return {
        Module: {
          id: null,
          ModuleID: "",
          ModuleName: "",
          ModuleLeader: "",
          CourseID: ""
        },
        Lecturers: [],
        Courses: [],
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
          }),
          CourseDataService.getAll()
        .then(response => {
            this.Courses = response.data,
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          });
      },
      saveModule() {
        var data = {
          ModuleID: this.Module.ModuleID,
          ModuleName: this.Module.ModuleName,
          ModuleLeader: this.Module.ModuleLeader,
          CourseID: this.Module.CourseID
        };
        console.log(data);
        ModuleDataService.create(data)
          .then(response => {
            this.Module.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          })

      },
      
      newModule() {
        this.submitted = false;
        this.Module = {};
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