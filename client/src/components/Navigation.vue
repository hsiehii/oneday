<template>
  <div id="nav">
    <router-link to="/days/today">Today</router-link>
    <router-link to="/backlogs">Backlogs</router-link>
  </div>
</template>

<script>
export default {
  name: 'navigation'
}
</script>

<style lang="scss" scoped>
#nav {
  height: 5%;
  background-color: $tertiary-color;
}
</style>
