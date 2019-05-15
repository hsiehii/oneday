<template>
  <li class="task-item">
    <div>
      <p class="task-name">{{task.title}}</p>
      <p class="backlog-name">{{backlogTitle}}</p>
    </div>
    <button class="remove-btn"
            @click='removeTask'>
      -
    </button>
  </li>
</template>

<script>
export default {

  name: 'TaskItem',

  props: {
    task: Object
  },

  computed: {
    backlogTitle() {
      return this.task.backlog.title;
    }
  },
  
  methods: {
    removeTask() {
      this.$store.dispatch('REMOVE_TASK', this.task);
    }
  }

}
</script>

<style lang="scss" scoped>
.task-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
}

.backlog-name {
  font-size: 0.7em;
  margin-top: 0;
}

.task-name {
  font-size: 1em;
}

div {
  width: 100%;
  height: 10%;
  font-family: 'Quicksand';
  font-weight: normal;
  text-align: center;
}

button {
  width: 10%;
  height: 50%;
}

div, button {
  display: inline-block;
  margin: 5px 0;
}

.remove-btn {
  margin-left: 5px;
  padding: 2px 5px;
}
</style>
