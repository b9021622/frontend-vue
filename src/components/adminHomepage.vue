<template>
  <h1>UoPS Admin Homepage</h1>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
          <router-link to="/view-courses" class="nav-link">View Courses</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/viewall-Modules" class="nav-link">View Modules</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addcourse" class="nav-link">Add Course</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addMod" class="nav-link">Add Module</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addSession" class="nav-link">Add Session</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/viewall-sessions" class="nav-link">View Sessions</router-link>
        </li>
        
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
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
    methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/Adminlogin');
    }
  },
    mounted() {
      if (!this.currentUser) {
        //this.$router.push('/login');
      }
    }
  };
  </script>