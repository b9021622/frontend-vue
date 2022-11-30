<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <!-- <router-link to="/" class="navbar-brand">BoredHorses -->
        
      <!-- </router-link> -->
      <div class="navbar-nav mr-auto">
       
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>
  .container h2 {
    text-align: center;
    margin: 25px auto;
  }
  </style>
