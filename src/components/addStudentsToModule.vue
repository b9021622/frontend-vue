<template>
  <h1>UoPS Admin - Add Students to Module</h1>
  <div><router-link :to="'/viewall-Modules/'"  class="btn btn-success">Back To Modules</router-link></div>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3"></div>
        </div>
      <div class="col-md-6">
        <h4>Select Student To Add</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(Student, index) in Students"
            :key="index"
            @click="chooseForAddition(Student._id)"
          >
          {{ Student.StudentID }}
            {{ Student.StudentFName }}
            {{Student.StudentSName}}
          </li>
        </ul>
      </div>
      <div class="col-md-6">
          <div v-if="currentModule">
            <button type="submit" class="btn btn-success"
          @click="updateModule()"
        >
          Update
        </button>
            <h4>Module</h4>
              
            <div>
              <label><strong>ModuleID:</strong></label> {{ currentModule.ModuleID }}
            </div>
            <div>
              <label><strong>ModuleName:</strong></label> {{ currentModule.ModuleName }}
            </div>
            <div>
              <label><strong>ModuleLeader:</strong></label> {{ currentModuleLeader}}
            </div>
            
              <label><strong>Module Students : </strong></label> 
            
            <ul class="list-group-item"
              v-for=" (stu, index) in currentModule.StudentsEnrolled"
              :key="index" @click="chooseForRemoval(stu)"
              >
              {{
              
              getLec(stu)
                 
              }}
              {{
                 currentModuleStudents[index]
              }}
          </ul>
        
           
            <!-- <router-link :to="'/Modules/' + currentModule._id" class="badge badge-danger">Edit</router-link> -->
          </div>
        </div>
        </div>
  </template>
  
  <script>
  import ModuleDataService from "../services/ModuleDataService.js";
  import StudentDataService from "../services/StudentDataService.js";
  //import StudentDataService from "../services/StudentDataService.js";
  export default {
    name: "Modules-list",
    data() {
      return {
        currentModule: null,
        currentModuleLeader: null,
        Students: [],
        currentModuleStudents : [],
        currentIndex: -1,
        name: ""
      };
    },
    computed: {
        currentUser() {
          return this.$store.state.auth.user;
        }
      },
    methods: {
      getStudents(){
          console.log("Here");
          StudentDataService.getAll()
          .then(response => {
              this.Students = response.data,
              
              console.log(response.data)
            })
            .catch(e => {
              console.log(e);
            })}
        ,
      getLec(LecID) {
        StudentDataService.get(LecID)
          .then(response => {
            console.log("response.data");
            console.log(response.data);
            if(!this.currentModuleStudents.includes(response.data[0].StudentFName + "  " + response.data[0].StudentSName)){
              this.currentModuleStudents.push(response.data[0].StudentFName + "  " + response.data[0].StudentSName);
            }
         
            console.log("ARRAY");
            console.log(this.currentModuleStudents)
          })
          .catch(e => {
            console.log(e);
          });
      },
      getModule(id) {
          ModuleDataService.get(id)
            .then(response => {
              this.currentModule = response.data[0];
              console.log("Current Module");
              console.log(response.data);
              
            })
            .catch(e => {
              console.log(e);
            });
        },
      refreshList() {
        //this.getRole(this.$store.state.auth.user.id);
        this.retrieveModules();
        this.currentModule = null;
        this.currentModuleStudents = [];
        this.currentIndex = -1;
        
      },
      chooseForAddition(id){
        console.log("formatcheck");
        console.log(this.currentModule.StudentsEnrolled);
        if(!this.currentModule.StudentsEnrolled.includes(id)){this.currentModule.StudentsEnrolled.push(id)}
        
        
        console.log(this.currentModuleStudents)
      },
      chooseForRemoval(id){
        console.log("formatcheck");
        console.log(this.currentModule.StudentsEnrolled);
        const index = this.currentModule.StudentsEnrolled.indexOf(id);
        if (index > -1) { 
          this.currentModule.StudentsEnrolled.splice(index, 1); 
          this.currentModuleStudents.splice(index, 1);
        }
        console.log(this.currentModuleStudents)
      },
      updateModule() {
          console.log("?");
          ModuleDataService.update(this.currentModule._id, this.currentModule)
            .then(response => {
              console.log(response.data);
              this.message = 'The Module was updated successfully!';
            })
            .catch(e => {
              console.log(e);
            });
        },
    },
    mounted() {
     
      this.getModule(this.$route.params.id);
      this.getStudents();
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