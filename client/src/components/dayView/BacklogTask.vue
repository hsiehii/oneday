<template>
  <div class="backlog-task"
       @click="addTask(task)"
       :class="{ added: added }">
    <h3>{{task.title}}</h3>
  </div>
</template>
<script>
export default {
  name: "backlog-task",

  props: {
    task: Object,
  },

  computed: {
    added() {
      let todayTasks = this.$store.getters.TODAY.tasks;
      for (let i = 0; i < todayTasks.length; i++) {
        if (todayTasks[i]._id == this.task._id) {
          return true;
        }
      }
      return false;
    }
  },

  methods: {
    addTask() {
      this.$store.dispatch('ADD_TODAY_TASK', this.task);
    }
  },
}
</script>
<style lang="scss" scoped>
.added {
  color: white;
}
</style>
