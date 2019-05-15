<template>
  <div id="backlogs-container">
    <div id="backlogs-list">
      <BacklogWindow v-for="bl in backlogs"
                     :key="bl._id"
                     :backlog=bl>
      </BacklogWindow>
      <NewBacklog>
      </NewBacklog>
    </div>
    <div class="filler">
    </div>
    <div class="filler">
    </div>
    <div id="main-backlog">
    </div>
  </div>
</template>

<script>
//import axios from 'axios';
import BacklogWindow from './Window';
import NewBacklog from './New';

//const apiRoot = process.env.VUE_APP_API_URL;

export default {
  name: "BacklogsView",
  components: {
    BacklogWindow,
    NewBacklog,
  },

  computed: {
    backlogs() {
      return this.$store.getters.BACKLOGS || [];
    }
  },

  mounted() {
    this.$store.dispatch('GET_BACKLOGS');
  },
}
</script>

<style lang="scss" scoped>

#backlogs-container {
  height: 95%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: $bg-color;
}

#backlogs-list {
  width: 60%;
  height: 95%;
  background-color: $second-color-lighter;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: space-around;
}

#main-backlog {
  width: 25%;
  height: 95%;
  background-color: $second-color;
}

</style>
