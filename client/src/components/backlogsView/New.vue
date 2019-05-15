<template>
  <div id="new-backlog">
    <h1>New Backlog</h1>
  </div>
</template>

<script>
export default {
  name: 'NewBacklog',
}
</script>

<style lang="scss" scoped>
#new-backlog {
  @include showborder;
  width: 30%;
  height: 30%;
  align-self: flex-end;
}

#new-backlog:hover {
  cursor: pointer;
}
</style>
