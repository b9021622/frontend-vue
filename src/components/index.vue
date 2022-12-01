<template>
    <h1>UoPS Attendance System - Homepage</h1>
    <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/stu-registerAtt" class="nav-link">Register Attendance</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/loginStu" class="nav-link">Log In (Student)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/studentHome" class="nav-link">Student Homepage</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/registerStu" class="nav-link">Register Student</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/login" class="nav-link">Log In (Staff)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/lecturerHome" class="nav-link">Lecturer Homepage</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link">Register Lecturer</router-link>
        </li>
    </div>
</template>
  
<script>
    export default {
    name: "index-page",

    components: {  },

    data() {
        return {
        
        };
    },
    computed: {
        },
    methods: {
        },
    mounted() {
    }
    };
</script>