<template>
  <h1>UoPS Admin - Session Details</h1>
  <div v-if="currentSession" class="edit-form">
    <form>
      <div class="form-group">
        <label for="SessionID"> SessionID </label>
        <input type="text" class="form-control" id="SessionID"
          v-model="currentSession.SessionID"
        >
      </div>
      <div class="form-group">
        <label for="SessionName">Session Name</label>
       
        <input type="text" class="form-control" id="SessionName"
          v-model="currentSession.SessionName"
        />
      </div>
      <div class="form-group">
        <label for="why">Module:  </label>
        <select id = "Why" v-model="currentSession.SessionModule"> <option class="list-group-item"
          v-for=" (mod, index) in Modules" :value="mod._id"
          :key="index" 
          >
           {{  mod.ModuleID + " | " +  mod.ModuleName
             
          }}
          </option>
        </select >
        </div>
      <div>
      <label for="why">Lecturer:</label>
      <select id = "Why" v-model="currentSession.Lecturer"> <option class="list-group-item"
        v-for=" (lec, index) in Lecturers" :value="lec._id"
        :key="index" 
        >
         {{  lec.LecturerFName + "  " +  lec.LecturerSName
           
        }}
        </option>
      </select >
      </div>
      <div class="form-group">
        <label for="SessionName">Session Date</label>
       
        <input type="Datetime-local" class="form-control" id="SessionName"
          v-model="currentSession.SessionDate"
        />
      </div>
      <div class="form-group">
        <label for="SessionType">Session Type</label>
       
        <input type="text" class="form-control" id="SessionType"
          v-model="currentSession.SessionType"
        />
      </div>
      
    </form>

    <button class="badge badge-danger mr-2"
      @click="deleteSession"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateSession()"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on an Session...</p>
  </div>
</template>

<script>
import SessionDataService from "../services/SessionDataService";
import ModuleDataService from "../services/ModuleDataService.js";
import LecturerDataService from "../services/LecturerDataService";
import moment from 'moment';
export default {
  name: "Session-details",
  data() {
    return {
      currentSession: null,
      //currentSessionLecturers:[],
      currentSessionLeader: null,
      message: '',
      Lecturers: [],
      Modules: []
    };
  },
  methods: {
    getSession(id) {
      console.log("?ads");
      SessionDataService.get(id)
        .then(response => {
          console.log(response.data);
          this.currentSession = response.data[0];
          console.log("Current Session");
          this.getModules();
          
          console.log(this.currentSession);
          console.log(this.currentSession.SessionModule);
          this.currentSession.SessionDate = moment(this.currentSession.SessionDate).format("YYYY-MM-DDTkk:mm");
          console.log(typeof this.currentSession.SessionDate);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getModules(){
        ModuleDataService.getAll()
        .then(response => {
            this.Modules = response.data,
            console.log(response.data)
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
    updateSession() {
      console.log("?");
      SessionDataService.update(this.currentSession._id, this.currentSession)
        .then(response => {
          console.log(response.data);
          this.message = 'The Session was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    getLecturer(Session) {
      console.log(Session);
      console.log(Session.SessionLeader);
      LecturerDataService.get(Session.SessionLeader)
        .then(response => {
          this.currentSessionLeader = response.data[0].LecturerFName + "  " + response.data[0].LecturerSName;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      
    },

    deleteSession() {
      console.log("£");
      SessionDataService.delete(this.currentSession._id)
        .then(response => {
          console.log(response.data);
          this.$router.push("/viewall-sessions");
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    console.log("?");
    this.getSession(this.$route.params.id);
    this.getLecturers(this.Session);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>