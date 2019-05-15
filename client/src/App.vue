<template>
  <div id="app">
    <Navigation></Navigation>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: 'app',
  components: {
    Navigation
  }
}
</script>

<style lang="scss">

@import url("./assets/fonts/_fonts.scss");

* {
  box-sizing: border-box;
}

html, body, #app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}


</style>
