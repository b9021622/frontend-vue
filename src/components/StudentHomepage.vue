<template>

  <h2>Possible Sessions:  {{Sessions.length}}</h2>

  <h2>Sessions Attended: {{Attended.length}}</h2>
  <H2>Attendance Score: {{Attended.length/Sessions.length * 100}}</H2>
    <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/stu-registerAtt" class="btn btn-success" >Register Attendance</router-link>
        </li>
        <li class="nav-item">
          <a @click = "logOut" class="btn btn-success">Log Out</a>
        </li>
        </div>
        <!--<H2>Attendance Score: {{Attended.length/Sessions.length * 100}}</H2>-->
        <div class="row" >
        <div class ="col-4"> </div>
        <div class ="col-4">
      <Doughnut :chart-data="chartData"/></div>
    </div>
  </template>
  
  <script>
  import StudentDataService from "../services/StudentDataService.js";
  import SessionDataService from "../services/SessionDataService.js";


  import {Doughnut} from "vue-chartjs"
  import {ArcElement} from 'chart.js'
  import Chart from 'chart.js/auto';
  Chart.register(ArcElement);


var totalSessions = 40;
var sessionsAttended = 15;
var percentageAttendance = (Math.round(((sessionsAttended/totalSessions)*100) * 100) / 100).toFixed(1);
var BGC;

if(percentageAttendance>50){
  BGC = "Green";
  if(percentageAttendance>80){
    BGC = "DarkGreen";
  }
}
else{
  BGC = "LightGreen";
}
Chart.defaults.color = '#000';


  export default {
    name: "ProfilePage",
    components: { Doughnut },
    data() {
        return {
            Student: null,
            Sessions: [],
            Attended: [],
            chartData: {
        labels: [ 'Attended', 'Missed', 'HardCodedDataToDemonstrateAttendanceVisualisation'],
        datasets: [
          {
            data: [sessionsAttended, totalSessions-sessionsAttended],
            radius:[140],
            backgroundColor:[
            BGC,
            "#E8F0FE",
            "#000000"
            ],
    borderColor:[
      "#0047bc",
      "#ab4700", 
    ],
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

