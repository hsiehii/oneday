<template>
  <div id="day-container">
    <create-day v-if="!dayExists">
    </create-day>
    <backlog-bar v-if="dayExists"
      :dayTasks=tasks>
    </backlog-bar>
    <task-list v-if="dayExists">
    </task-list>
    <day-details v-if="dayExists">
    </day-details>
  </div>
</template>

<script>
import BacklogBar from './BacklogBar.vue';
import TaskList from './TaskList.vue';
import CreateDay from './CreateDay.vue';
import DayDetails from './DayDetails.vue';


export default {
  name: 'DayView',

  computed: {
    day: function() {
      return this.$store.getters.TODAY;
    },
    tasks: function() {
      const today = this.day;
      if (today) {
        return today.tasks;
      } else {
        return null;
      }
    },
    dayExists: function() {
      if (this.$store.getters.TODAY) {
        return true;
      }
      return false;
    }
  },

  mounted() {
    this.$store.dispatch('GET_TODAY');
    this.$store.dispatch('GET_BACKLOGS');
  },

  components: {
    BacklogBar,
    TaskList,
    CreateDay,
    DayDetails,
  },

}
</script>

<style lang="scss" scoped>

#day-container {
  height: 95%;
  background-color: $bg-color;
  display: flex;
}

</style>

