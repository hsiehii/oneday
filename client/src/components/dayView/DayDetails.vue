<template>
  <div id="day-details">
    <goal-input :currentDay=day>
    </goal-input>
  </div>
</template>
<script>
import GoalInput from './GoalInput.vue';

export default {
  name: 'day-details',
  components: {
    GoalInput
  },

  computed: {
    day() {
      if (this.$store.getters.TODAY) {
        return this.$store.getters.TODAY;
      } else {
        return null
      }
    }
  },

}
</script>

<style lang="scss" scoped>
#day-details {
  width: 60%;
}
</style>
