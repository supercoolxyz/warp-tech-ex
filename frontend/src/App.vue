<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/dashboard">Dashboard</router-link> |
    <router-link to="/user-stories">User Stories</router-link> |
    <router-link to="/milestones">Milestones</router-link> |
    <router-link to="/actors">Actors</router-link> |
    <router-link to="/about">About</router-link>  </nav>
  <router-view/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

