<template>
  <router-link to="/" class="nav-link"> <img src="./assets/ups.png" alt="logo" width="200" height="200"> </router-link>
  <div id="app">
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
  


<style>
#StuGraph{
  margin: 50px auto;
}
</style>

