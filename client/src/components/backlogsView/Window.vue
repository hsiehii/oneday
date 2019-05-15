<template>
  <div class="backlog-window">
    <h1 class="title-bar">{{ backlog.title }}</h1>
    <div class="tasks">
      <ul>
        <backlogs-task v-for="task in tasks"
                      :key=task._id
                      :task=task
                      @deleteTask='deleteTask(task)'>
        </backlogs-task>
      </ul>
    </div>
    <create-task @createTask="createTask">
    </create-task>
  </div>
</template>
<script>
import BacklogsTask from './Task';
import CreateTask from './CreateTask';

export default {
  name: 'BacklogsWindow',

  components: {
    'backlogs-task': BacklogsTask,
    'create-task': CreateTask,
  },

  props: {
    backlog: Object
  },

  computed: {
    tasks() {
      return this.backlog.tasks || [];
    }
  },

  methods: {
    deleteTask(task) {
      let p = {
        backlog: this.backlog,
        task,
      }
      this.$store.dispatch('REMOVE_TASK', p);
    },
    createTask(title) {
      let p = {
        backlog: this.backlog._id,
        task: { title }
      };
      this.$store.dispatch('ADD_TASK', p);
    },
  }
}
</script>
<style lang="scss" scoped>
.backlog-window {
  @include showborder;
  width: 30%;
  height: 30%;
  overflow-y: auto;
}

.title-bar {
  text-align: center;
  font-size: 1em;
  background-color: $key-color;
  margin: 0 auto;
  height: 20%;
}

ul {
  height: 100%;
  display: block;
  margin: 0 auto;
  padding: 0;
  list-style-type: none;
}

.tasks {
  height: 60%;
}
</style>
