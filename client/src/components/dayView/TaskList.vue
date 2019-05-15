<template>
  <div id="tasks-container">
    <p id="date">{{ date }}</p>
    <ul>
      <TaskItem v-for="task in tasks"
                :task=task
                :key=task._id>
      </TaskItem>
    </ul>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue';

const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export default {
  name: 'task-list',

  components: {
    TaskItem
  },

  data() {
    return {
      date: "",
      goalEditable: false,
    }
  },

  computed: {
    day() {
      return this.$store.getters.TODAY;
    },
    tasks() {
      let today = this.$store.getters.TODAY;
      if (today) {
        return this.$store.getters.TODAY.tasks;
      } else {
        return null;
      }
    }
  },

  methods: {
    assignFullDate(date) {
      this.date = MONTHS[date.getMonth()] + " "
        + date.getDate() + " " 
        + date.getFullYear();
    },
  },

  mounted() {
    this.assignFullDate(new Date(this.day.date));
  }
}
</script>

<style lang="scss" scoped>
#tasks-container {
  border-right: 1px solid black;
  background-color: $bg-color;
  height: 100%;
  width: 20%;
  display: inline-block;
}

ul {
  width: 100%;
  list-style-type: none;
  padding: 0;
}

#date {
  @include header;
  font-size: 1.5em;
  margin: 25px 0 0 0;
  text-align: center;
}
</style>
