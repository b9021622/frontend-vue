<template>

  <h2>Possible Sessions:  {{Sessions.length}}</h2>

  <h2>Sessions Attended: {{Attended.length}}</h2>
  <H2>Attendance Score: {{Attended.length/Sessions.length * 100}}</H2>
    <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/stu-registerAtt" class="nav-link">Register Attendance</router-link>
        </li>
        <li class="nav-item">
          <a @click = "logOut" class="nav-link">Log Out</a>
        </li>
        </div>
        <!--<H2>Attendance Score: {{Attended.length/Sessions.length * 100}}</H2>-->
        <div>
      <Doughnut :chart-data="chartData"/></div>
        
  </template>
  
  <script>
  import StudentDataService from "../services/StudentDataService.js";
  import SessionDataService from "../services/SessionDataService.js";


  import {Doughnut} from "vue-chartjs"
  import {ArcElement} from 'chart.js'
  import Chart from 'chart.js/auto';
  Chart.register(ArcElement);


var totalSessions = 97;
var sessionsAttended = 10;
var percentageAttendance = (Math.round(((sessionsAttended/totalSessions)*100) * 100) / 100).toFixed(1);
var BGC;

if(percentageAttendance>50){
  BGC = "orange";
  if(percentageAttendance>80){
    BGC = "#00A310";
  }
}
else{
  BGC = "red";
}


  export default {
    name: "ProfilePage",
    components: { Doughnut },
    data() {
        return {
            Student: null,
            Sessions: [],
            Attended: [],
            chartData: {
        labels: [ 'Attended', 'Missed'],
        datasets: [
          {
            data: [sessionsAttended, totalSessions-sessionsAttended],
            radius:[140],
            backgroundColor:[
            BGC,
      "#E8F0FE",
    ],
    borderColor:[
      "#ab47bc",
      "#ab47bc"
    ]
          }
        ]
      }
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
                if (Date.parse(response.data[0].SessionDate) < Date.parse(new Date())) {
                    this.Sessions.push(response.data[0]);
                }
                console.log(this.Sessions);
            })
                .catch(e => {
                console.log(e);
            });
        },
        getAtt() {
            StudentDataService.get(this.$store.state.auth.user.id)
                .then(response => {
                this.Student = response.data[0];
                console.log(response.data);
                for (let i = 0; i < this.Student.SessionsScheduled.length; i++) {
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
            this.$store.dispatch("auth/logout");
            this.$router.push("/loginStu");
        }
    },
    mounted() {
        this.getAtt();
        if (!this.currentUser) {
            this.$router.push("/loginStu");
        }
    },
};


  </script>

