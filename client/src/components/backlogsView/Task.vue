<template>
  <li id="backlogs-task"
      @mouseleave='deleteText = false'
      @mouseover='deleteText = true'>
    {{ task.title }}
    <span v-if="deleteText"
    @click='deleteTask'>
      Delete
    </span>
  </li>
</template>
<script>
export default {
  name: 'BacklogsTask',

  props: {
    task: Object,
  },

  data() {
    return {
      deleteText: Boolean,
    }
  },

  methods: {
    deleteTask() {
      this.$emit('deleteTask', this.task);
    }
  },

  mounted() {
    this.deleteText = false;
  }
}
</script>
<style lang="scss" scoped>

#backlogs-task {
  background-color: $second-color;
  color: $key-color;
  padding: 5px 0;
  text-align: center;
  font-size: 0.8em;
}

#backlogs-task:hover {
  cursor: pointer;
  background-color: $second-color-lighter;
}

span {
  float: right;
}

span:hover {
  text-decoration: underline;
}

</style>
