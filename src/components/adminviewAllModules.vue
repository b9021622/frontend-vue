<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3"></div>
        </div>
      <div class="col-md-6">
        <h4>Module List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(Module, index) in Modules"
            :key="index"
            @click="setActiveModule(Module, index)"
          >
            {{ Module.ModuleID }}
            {{"||"}}
            {{Module.ModuleName}}
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <div v-if="currentModule">
          <router-link :to="'/adminDeets/' + currentModule._id" class="badge badge-danger">Edit</router-link> 
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
          
            
<!--           
  <label><strong>Module Lecturers : </strong></label> 
          <ul class="list-group-item"
            v-for=" (lec, index) in currentModule.ModuleLecturers"
            :key="index"
            >
            {{ getLec(lec)
               
            }}
            {{
               currentModuleLecturers[index]
            }}
        </ul> -->
      
         
          <!-- <router-link :to="'/Modules/' + currentModule._id" class="badge badge-danger">Edit</router-link> -->
        </div>
        <div v-else>
          <br />
          <p>Please click on a module...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ModuleDataService from "../services/ModuleDataService.js";
  import LecturerDataService from "../services/LecturerDataService.js";
  //import StudentDataService from "../services/StudentDataService.js";
  export default {
    name: "Modules-list",
    data() {
      return {
        Modules: [],
        currentModule: null,
        currentModuleLeader: null,
        currentModuleLecturers : [],
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
      retrieveModules() {
        ModuleDataService.getAll().then(
          response => {
              this.Modules = response.data;
          },
          error => {
            this.$router.push("/login");
            this.Modules =
              (error.response && 
               error.response.data &&
               error.response.data.message ) ||
              error.message ||
              error.toString();
          }
        );
      
      },
     
      getLec(LecID) {
        LecturerDataService.get(LecID)
          .then(response => {
            console.log("response.data");
            console.log(response.data);
            this.currentModuleLecturers.push(response.data[0].LecturerFName + "  " + response.data[0].LecturerSName);
          })
          .catch(e => {
            console.log(e);
          });
      },
      getLecturer(Module) {
        console.log(Module);
        console.log(Module.ModuleLeader);
        LecturerDataService.get(Module.ModuleLeader)
          .then(response => {
            this.currentModuleLeader = response.data[0].LecturerFName + "  " + response.data[0].LecturerSName;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
        
      },
      refreshList() {
        this.getRole(this.$store.state.auth.user.id);
        this.retrieveModules();
        this.currentModule = null;
        this.currentModuleLecturers = [];
        this.currentIndex = -1;
      },
  
      setActiveModule(Module, index) {
        console.log(this.currentModule);
        this.getLecturer(Module);
        console.log("Imhere");
        this.currentModule = Module;
        this.currentIndex = Module ? index : -1;
      },
    },
    mounted() {
     
      this.retrieveModules();
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