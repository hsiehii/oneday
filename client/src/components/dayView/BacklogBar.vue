<template>
  <div class="backlog-bar">
    <backlog-dropdown :backlogs=backlogs>
    </backlog-dropdown>
    <backlog-tasks :tasks=activeLogTasks>
    </backlog-tasks>
  </div>
</template>

<script>
import BacklogDropdown from './BacklogDropdown';
import BacklogTasks from './BacklogTasks';

export default {
  name: 'backlog-bar',

  components: {
    BacklogDropdown,
    BacklogTasks,
  },

  props: {
    dayTasks: Array,
  },

  computed: {
    backlogs() {
      return this.$store.getters.BACKLOGS || null;
    },
    activeLogTasks() {
      if (this.backlogs) {
        return this.backlogs[0].tasks;
      }
      return [];
    },
  },
}

</script>

<style scoped lang="scss">

.backlog-bar {
  height: 100%;
  width: 20%;
  font-family: 'Quicksand';
  background-color: $second-color;
  color: $key-color;
}

</style>
