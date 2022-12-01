<template>


    <div class="navbar-nav mr-auto">
      <p>{{}}</p>
        </div>
        <div class="form-group">
        <label for="Code">Enter Attendance Code</label>
        <input
          class="form-control"
          id="Code"
          required
          v-model="Code"
          name="Code"
        />
      </div>
      <button @click="registerAttendance" class="btn btn-success">Submit</button>
      <h1>{{message}}</h1>
  </template>
  
  <script>
import SessionDataService from "../services/SessionDataService.js";
import StudentDataService from "../services/StudentDataService.js";
  export default {
    name: 'ProfilePage',

    data() {
    return {
     Student: null,
     Modules: [],
     Code : null,
     Session: null,
     message: ""
    };
  },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods: {
      getStu(){
      StudentDataService.get(this.$store.state.auth.user.id).then(
      response => {
            this.Student = response.data;
            console.log(response.data);
        },
        error => {
          console.log(error);
        }),
        this.populateStuSessions();
    },
    // getModules(){
     

    // },
    populateStuSessions(){
      //this.getModules();
      StudentDataService.getModules(this.$store.state.auth.user.id)
      .then(
      response => {
        console.log(response.data);
            this.Modules = response.data;
            for(let i = 0; i<this.Modules.length; i++){
            for(let j = 0; j<this.Modules[i].Sessions.length; j++){
            console.log(j);
            var data = {Session:this.Modules[i].Sessions[j] }
            StudentDataService.addSession(this.$store.state.auth.user.id, data);
        }
      }
            console.log(response.data);
        },
        error => {
          console.log(error);
        }),
      console.log(this.Modules);
      
      
    },
    fillInAttendance(){
      console.log("there");
      console.log(this.Session[0]);
      var data = {ID : this.Session[0]._id}
      StudentDataService.registerAttendance(this.$store.state.auth.user.id, data)
      .then(
        response => {
        console.log(response.data);
        if(response.data.modifiedCount == 1){
          this.message = "Successfully Registered";
        }
        else{
          this.message= "Already Registered";
        }
        },
        error => {
          console.log(error);
        })


    },
    registerAttendance(){
      console.log("HEre");
      var code = this.Code;
      SessionDataService.getByCode(code).then(
        response => {
          if(response.data == "Empty"){
            console.log(response.data);
            this.message = "Session Not Found"
          }
          else{console.log("GETSESRES");
          console.log(response.data);
          this.Session = response.data;
          this.fillInAttendance();

          }
        
        }).catch(
        error => {
          console.log(error);
        })

    },
  },
    mounted() {
      this.getStu();
      if (!this.currentUser) {
        this.$router.push('/login');
      }
      
    }
  };
  </script>
  