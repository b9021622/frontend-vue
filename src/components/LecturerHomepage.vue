<template>


    <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/lec-view-modules" class="nav-link">View My Modules</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/lec-view-sessions" class="nav-link">View My Sessions</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/myStudentsAttendance" class="nav-link">View My Students' Attendance</router-link>
        </li>
        </div>
  </template>
  
  <script>
  export default {
    name: 'ProfilePage',
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    mounted() {
      if (!this.currentUser) {
        this.$router.push('/login');
      }
    }
  };
  </script>
  