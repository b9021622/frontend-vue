<template>
  <div class="list row">
    <div class="col-md-8">
    </div>
    <div class="col-md-6">
      <h4>Module List for {{MyName}}</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(Module, index) in Modules"
          :key="index"
          @click="setActiveModule(Module, index)"
        >
          {{ Module.ModuleID }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentModule">
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
      </ul>
       
        <!-- <router-link :to="'/Modules/' + currentModule._id" class="badge badge-danger">Edit</router-link> -->
      </div>
      <div v-else>
        <br />
        <p>Please click on a Module</p>
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
      MyName: "",
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
      ModuleDataService.getMineLecturer(this.$store.state.auth.user.id).then(
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
    getName(id){
      LecturerDataService.get(id)
        .then(response => {
          console.log("response.data11");
          console.log(response.data);
          this.MyName = response.data[0].LecturerFName + "  " + response.data[0].LecturerSName;
          console.log(this.MyName );
        })
        .catch(e => {
          console.log(e);
        });},
    getLec(LecID) {
      LecturerDataService.get(LecID)
        .then(response => {
          console.log("response.data12");
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
      this.currentModuleLecturers = [];
      console.log("Imhere");
      this.currentModule = Module;
      this.currentIndex = Module ? index : -1;
    },
  },
  mounted() {
   
    this.retrieveModules();
    this.getName(this.$store.state.auth.user.id);
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