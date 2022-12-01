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
  background-color: rgb(118, 118, 255);
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
.btn.btn-success{
  background-color:rgba(208, 211, 255, 0.527);
  border-color: rgb(78, 78, 255);
  margin-bottom: 2px;
  color: black;
}
.btn.btn-success:hover {
  background-color: rgba(208, 211, 255, 0.123);
  border-color: black;
}
#danger{
  background-color:rgb(245, 121, 121);
}
#formstuff{
  background-color: rgb(118, 118, 255);
  border-color:transparent;
}

#TableID{
  display: block;
  height: 400px;
  overflow-y: scroll;
  border-style:solid;
  border-color:black;
}
table td, table th {
    border: 1px solid black;
}

/* width */
::-webkit-scrollbar {
  width: 30px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(118, 118, 255);
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(8, 0, 126); 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

</style>

