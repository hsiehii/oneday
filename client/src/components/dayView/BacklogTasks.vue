<template>
  <div class="backlog-tasks">
    <backlog-task v-for="task in tasks"
                  :key=task._id
                  :task=task>
    </backlog-task>
  </div>
</template>
<script>
import BacklogTask from './BacklogTask';

export default {
  name: "backlog-tasks",

  components: {
    BacklogTask,
  },

  props: {
    tasks: Array,
  },
}
</script>
<style lang="scss" scoped>
</style>
