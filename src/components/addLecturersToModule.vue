<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3"></div>
      </div>
    <div class="col-md-6">
      <h4>Select Lecturer To Add</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(Lecturer, index) in Lecturers"
          :key="index"
          @click="chooseForAddition(Lecturer._id)"
        >
        {{ Lecturer.LecturerID }}
          {{ Lecturer.LecturerFName }}
          {{Lecturer.LecturerSName}}
        </li>
      </ul>

      <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllAnimals">
        Remove All
      </button> -->
    </div>
    <div class="col-md-6">
        <div v-if="currentModule">
          <button type="submit" class="badge badge-success"
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
            <label><strong>ModuleLeader:</strong></label> {{ this.getLeader(this.currentModule)}}{{currentModuleLeader}}
          </div>
          
            <label><strong>Module Lecturers : </strong></label> 
          
          <ul class="list-group-item"
            v-for=" (lec, index) in currentModule.ModuleLecturers"
            :key="index" @click="chooseForRemoval(lec)"
            >
            {{
            
            getLec(lec)
               
            }}
            {{
               currentModuleLecturers[index]
            }}
        </ul>
      
         
          <!-- <router-link :to="'/Modules/' + currentModule._id" class="badge badge-danger">Edit</router-link> -->
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
      currentModule: null,
      currentModuleLeader: null,
      Lecturers: [],
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
      getLeader(currentModule) {
        LecturerDataService.get(currentModule.ModuleLeader)
          .then(response => {
            this.currentModuleLeader = response.data[0].LecturerFName + "  " + response.data[0].LecturerSName;
            console.log(response.data);
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
          if(!this.currentModuleLecturers.includes(response.data[0].LecturerFName + "  " + response.data[0].LecturerSName)){
            this.currentModuleLecturers.push(response.data[0].LecturerFName + "  " + response.data[0].LecturerSName);
          }
       
          console.log("ARRAY");
          console.log(this.currentModuleLecturers)
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
      this.currentModuleLecturers = [];
      this.currentIndex = -1;
      
    },
    chooseForAddition(id){
      console.log("formatcheck");
      console.log(this.currentModule.ModuleLecturers);
      if(!this.currentModule.ModuleLecturers.includes(id)){this.currentModule.ModuleLecturers.push(id)}
      
      console.log("fish"),
      console.log(this.currentModuleLecturers)
    },
    chooseForRemoval(id){
      console.log("formatcheck");
      console.log(this.currentModule.ModuleLecturers);
      const index = this.currentModule.ModuleLecturers.indexOf(id);
      if (index > -1) { 
        this.currentModule.ModuleLecturers.splice(index, 1); 
        this.currentModuleLecturers.splice(index, 1);
      }
      //if(this.currentModule.ModuleLecturers.includes(id)){this.currentModule.ModuleLecturers.push(id)}
      
      console.log("fish"),
      console.log(this.currentModuleLecturers)
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


  //   searchName() {
  //     AnimalDataService.findByName(this.name)
  //       .then(response => {
  //         this.animals = response.data;
  //         this.setActiveAnimal(null);
  //         console.log(response.data);
  //       })
  //       .catch(e => {
  //         console.log(e);
  //       });
  //   }
  },
  mounted() {
   
    this.getModule(this.$route.params.id);
    this.getLecturers();
    
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