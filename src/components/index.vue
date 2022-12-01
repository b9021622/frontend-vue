<template >
    <h1>UoPS Attendance System - Homepage</h1>
    <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/registerStu" class="btn btn-success">Register Student</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/loginStu" class="btn btn-success">Log In (Student)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/studentHome" class="btn btn-success">Student Homepage</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="btn btn-success">Register Lecturer</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/login" class="btn btn-success">Log In (Staff)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/lecturerHome" class="btn btn-success">Lecturer Homepage</router-link>
        </li>
        <li class="nav-item">
          <a @click = "logOut" class="btn btn-success">Log Out</a>
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