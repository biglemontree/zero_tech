<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import request from './utils/request.js'
import api from './constants/api'
export default {
  name: 'app',
  components: {
    HelloWorld
  },
  mounted() {
    request({
      url: api.CheckUser,
      data: {
        phone: 135674547,
        IDCardNum: '47541471444414155',
        code: 'dt4',
        name: 'dt4'
      }
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
