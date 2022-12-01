<template>
    <div class="navbar-nav mr-auto">
        <!-- <li class="nav-item">
          <router-link to="/lec-view-modules" class="nav-link">View My Modules</router-link>
        </li> -->
        <h1>Lecturer Homepage</h1>
        <li class="nav-item">
          <router-link to="/lec-view-sessions" class="nav-link">View My Sessions</router-link>
        </li>
        <li class="nav-item">
          <a @click = "logOut" class="nav-link">Log Out</a>
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
    methods:{
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  },
    mounted() {
      if (!this.currentUser) {
        this.$router.push('/login');
      }
    }
  };
  </script>
  