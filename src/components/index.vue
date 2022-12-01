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
        <li class="nav-item">
          <a @click = "logOut" class="nav-link">Log Out</a>
        </li>
    </div>
</template>
  
<script>
    export default {
    name: 'IndexPage',
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods:{
    logOut() {
        if (this.currentUser) {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        }
    },
  },
    mounted() {
    }
  };
</script>