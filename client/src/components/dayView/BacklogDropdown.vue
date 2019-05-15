<template>
  <div class="backlog-dropdown">
    <ul>
      <li class="menu-item active-item"
          :key=first._id
          @click="hidden = !hidden">
        {{first.title}}
      </li>
      <div class="options inactive-items">
        <li class="menu-item inactive-item"
            :class="{ hidden : hidden }"
            v-for="backlog in rest"
            :key=backlog._id
            @click="selectBacklog(backlog)">
          {{backlog.title}}
        </li>
      </div>
    </ul>
  </div>
</template>
<script>

export default {
  name: "backlog-dropdown",

  props: {
    backlogs: Array
  },

  data() {
    return {
      hidden: true,
    }
  },

  computed: {
    first() {
      if (this.backlogs) {
        return this.backlogs[0];
      }
      return [];
    },
    rest() {
      let b = [];
      if (this.backlogs) {
        for (let i = 1; i < this.backlogs.length; i++) {
          b[i-1] = this.backlogs[i];
        }
      }
      return b;
    }
  },

  methods: {
    selectBacklog(backlog) {
      this.$store.dispatch('SELECT_BACKLOG', backlog);
      this.hidden = true;
    }
  }

}
</script>
<style scoped lang="scss">

.backlog-dropdown {
  position: relative;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  width: 100%;
  height: 100%;
  text-align: center;
  display: relative;
}

.menu-item {
  height: 50px;
  padding: 12px 0;
  width: 100%;
}

.active-item {
  background-color: $key-color;
  color: $second-color-darker;
}

.inactive-items {
  position: absolute;
  width: 100%;
  background-color: $key-color;
  color: $second-color-darker;
}

.menu-item:hover {
  cursor: pointer;
}

.hidden {
  display: none;
}

</style>
