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
     Sessions: null,
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
    retrieveSessions(){
        SessionDataService.getAll().then(
          response => {
            console.log(response.data);
              this.Sessions = response.data;
              console.log("this.Sessions");
              console.log(this.Sessions);
          },
          error => {
            this.Sessions =
              (error.response && 
               error.response.data &&
               error.response.data.message ) ||
              error.message ||
              error.toString();
          }
        )},
    fillInAttendance(){
      console.log("there");
      console.log(this.Session._id);
      var data = {ID : this.Session._id}
      var studentID = this.$store.state.auth.user.id
      StudentDataService.registerAttendance(studentID, data)
      .then(
        response => {
        console.log(response.data);
        if(response.data.modifiedCount == 1){
          this.message = "Successfully Registered";
          this.$router.push('/StudentHome');
        }
        else{
          this.message= "Already Registered";
          this.$router.push('/stu-registerAtt');
        }
        },
        error => {
          console.log("dd");
          console.log(error);
        })


    },
    registerAttendance(){
      console.log("HEre");
      for(var i = 0; i<this.Sessions.length; i++){
        if(this.Sessions[i].AttendanceCode == this.Code){
          this.Session = this.Sessions[i];
          this.fillInAttendance();
        }
      }
      if(this.Session == null){
        this.message = "Session Not Found";
      }
    },
  },
    mounted() {
      this.retrieveSessions();
      this.getStu();
      if (!this.currentUser) {
        this.$router.push('/loginStu');
      }
      
    }
  };
  </script>