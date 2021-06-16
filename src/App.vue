<template>
  <div id="app">
    <notifications
      position="bottom center"
      group="foo"
      width="50%"
    />
    <router-view />
  </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css';
export default {

}
</script>
<style>
  .vue-notification {
  padding: 10px;
  margin: 0 5px 5px;
  font-size: 20px!important;
  color: #ffffff;
}
.vue-notification.success {
    background: #42A85F;
    border-left-color: #42A85F;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 5%;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: initial;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
