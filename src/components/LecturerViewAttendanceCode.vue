<template>

  <div>
    <h2 >Attendance Code</h2>
    <h1 >{{name}}</h1>
  </div>
  <div class="navbar-nav mr-auto">
    <li class="nav-item">
        <router-link to="/lec-view-sessions" class="nav-link">Back</router-link>
      </li>
      </div>
</template>

<script>
export default {
  name: 'ViewCode',
  data() {
    return {
      name: ""
    };
  },
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
    this.name = this.$route.params.id;
    console.log(this.name);
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
