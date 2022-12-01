<template>

  <h2>Possible Sessions:  {{Sessions.length}}</h2>
  <h2>Sessions Attended:  {{Attended.length}}</h2>
  <h2>Attendance Score: {{Attended.length/Sessions.length * 100}}</h2>
    <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/stu-registerAtt" class="nav-link">Register Attendance</router-link>
        </li>
        <li class="nav-item">
          <a @click = "logOut" class="nav-link">Log Out</a>
        </li>
        </div>
  </template>
  
  <script>
  import StudentDataService from "../services/StudentDataService.js";
  import SessionDataService from "../services/SessionDataService.js";
  export default {
    
    name: 'ProfilePage',
    data() {
    return {
     Student: null,
     Sessions: [],
     Attended: []
    };
  },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods: {
  getSession(id) {
      SessionDataService.get(id)
        .then(response => {
          console.log(response.data);
          if(Date.parse(response.data[0].SessionDate)<Date.parse(new Date())){
            this.Sessions.push(response.data[0]);
          }
          console.log(this.Sessions);
        })
        .catch(e => {
          console.log(e);
        });
    },
  getAtt(){
    StudentDataService.get(this.$store.state.auth.user.id) 
    .then(response => {
            this.Student = response.data[0];
            console.log(response.data);
            for(let i = 0; i<this.Student.SessionsScheduled.length; i++){
                this.getSession(this.Student.SessionsScheduled[i]);
            }
           
            this.Attended = this.Student.SessionsAttended;
            console.log(this.Attended);
          })
          .catch(e => {
            console.log(e);
          });
  },
  logOut() {
    this.$store.dispatch('auth/logout');
    this.$router.push('/loginStu');
  }
},
    mounted() {
      this.getAtt();
      if (!this.currentUser) {
        this.$router.push('/loginStu');
      }
      
    }
    
  };


  </script>