<template>
  <h1>UoPS Admin - Session List</h1>
    <div class="list row">
      <div class="col-md-12">
        <div>
<table id = "TableID">
  <thead>
    <tr>
      <th>Module</th>
      <th >Session ID</th>
      <th>Session Name</th>
      <th >Session Date</th>
      <th >Time</th>
      <th>Edit</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(row, index) in SessionsByTime" :key="index"  >
        <td>{{getModule(row.SessionModule)}}</td>
      <td>{{row.SessionID}}</td>
      <td>{{row.SessionName}}</td>
      <td>{{ dateFormat(row.SessionDate)}}</td>
      <td>{{ timeFormat(row.SessionDate)}}</td>
      <td><router-link :to="'/adminSDeets/' + row._id"  class="btn btn-success">Edit</router-link> </td>
    </tr>
  </tbody>
</table>

        </div>
      </div>
    </div>
    <div><router-link :to="'/adminHome/'"  class="btn btn-success">Back To Admin Home</router-link></div>
  </template>
  
  <script>
  import SessionDataService from "../services/SessionDataService.js";
  import LecturerDataService from "../services/LecturerDataService.js";
  import ModuleDataService from "../services/ModuleDataService.js";
  import moment from 'moment';
  //import StudentDataService from "../services/StudentDataService.js";
  export default {
    name: "Sessions-list",
 
    components: {  },  // <---- add this row


    data() {
      return {
        Sessions: [],
        SessionsByTime: [],
        Modules: [],
        currentSession: null,
        currentSessionLeader: null,
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
      retrieveSessions() {
        SessionDataService.getAll().then(
          response => {
           
              this.Sessions = response.data;
              this.sortByTime(this.Sessions)
              //console.log(this.Sessions);
          },
          error => {
            this.Sessions =
              (error.response && 
               error.response.data &&
               error.response.data.message ) ||
              error.message ||
              error.toString();
          }
        ),
        ModuleDataService.getAll().then(
            response => {
           
           this.Modules = response.data;
           //console.log(this.Modules);
       },
        )
      
      },

      sortByTime(Sessions){
        this.SessionsByTime = Sessions.sort(function(a,b) {
            console.log(typeof a.SessionDate);
            return Date.parse(a.SessionDate)-Date.parse(b.SessionDate);
        });
      },
      dateFormat(value) {
            if (value) {
              return moment(String(value)).format('DD/MM/YYYY')
     }
        },
timeFormat(value) {
  if (value) {
    return moment(String(value)).format('hh:mm')
  }
},
getModule(value){
        for(let i = 0; i<this.Modules.length; i++){
            if(value == this.Modules[i]._id){
                console.log(this.Modules[i].ModuleName);
                return this.Modules[i].ModuleName;
            }
        }
}
,
      getLecturer(Session) {
        console.log(Session);
        LecturerDataService.get(Session.Lecturer)
          .then(response => {
            this.currentSessionLeader = response.data[0].LecturerFName + "  " + response.data[0].LecturerSName;
            console.log("Imhere");
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
        
      },
      refreshList() {
        this.getRole(this.$store.state.auth.user.id);
        this.retrieveSessions();
        this.currentSession = null;
        this.currentSessionLecturers = [];
        this.currentIndex = -1;
      },
  
      setActiveSession(Session, index) {
        this.currentSession = Session;
        this.currentIndex = Session ? index : -1;
        console.log(this.currentSession);
        this.getLecturer(this.currentSession);
        
        
      },
    },
    mounted() {
     
      this.retrieveSessions();
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