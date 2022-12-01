<template>
  <h1>UoPS Admin - Module Details</h1>
  <div><router-link :to="'/viewall-Modules/'"  class="btn btn-success">Back To Modules</router-link></div>
    <div v-if="currentModule" class="edit-form">
      <form>
        <div class="form-group">
          <label for="ModuleID"> ModuleID </label>
          <input type="text" class="form-control" id="ModuleID"
            v-model="currentModule.ModuleID"
          >
        </div>
        <div class="form-group">
          <label for="ModuleName">Module Name</label>
         
          <input type="text" class="form-control" id="ModuleName"
            v-model="currentModule.ModuleName"
          />
        </div>
        <div>
        <label for="why">Module Leader:</label>
        <select id = "Why" v-model="currentModule.ModuleLeader"> <option class="list-group-item"
          v-for=" (lec, index) in Lecturers" :value="lec._id"
          :key="index" 
          >
           {{  lec.LecturerFName + "  " +  lec.LecturerSName
             
          }}
          </option>
        </select >
        </div>
    <div class="form-group">
        <h4>Lecturers</h4>
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
    </div>
        <div>
            <router-link :to="'/addLecsTo/' + currentModule._id" class="btn btn-success">Add Lecturers</router-link> 
            <router-link :to="'/addStuToMod/' + currentModule._id" class="btn btn-success">Add Students</router-link> 
    </div>
      </form>
  
      <button class="btn btn-success" id = "danger"
        @click="deleteModule"
      >
        Delete
      </button>
  
      <button type="submit" class="btn btn-success"
        @click="updateModule()"
      >
        Update
      </button>
      <p>{{ message }}</p>
    </div>
  
    <div v-else>
      <br />
      <p>Please click on an Module...</p>
    </div>
  </template>
  
  <script>
  import ModuleDataService from "../services/ModuleDataService";
  import LecturerDataService from "../services/LecturerDataService";
  export default {
    name: "Module-details",
    data() {
      return {
        currentModule: null,
        currentModuleLecturers:[],
        currentModuleLeader: null,
        message: '',
        Lecturers : []
      };
    },
    methods: {
      getModule(id) {
        ModuleDataService.get(id)
          .then(response => {
            this.currentModule = response.data[0];
            console.log("Current Module");
            console.log(response.data);
            
            console.log(this.moduleID);
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
  
      deleteModule() {
        console.log("£");
        ModuleDataService.delete(this.currentModule._id)
          .then(response => {
            console.log(response.data);
            this.$router.push("/viewall-Modules");
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.message = '';
      this.getModule(this.$route.params.id);
      this.getLecturers(this.Module)
    }
  };
  </script>
  
  <style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>