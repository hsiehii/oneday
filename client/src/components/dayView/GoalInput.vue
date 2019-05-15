<template>
  <div id="goal-input">
    <div class="goal-div"
         v-if='!goalEditable'>
      <p id="goal"
         class="goal-text">
         {{ day.goal }}
      </p>
      <button class="edit-goal"
        @click='showInput'>
        Edit
      </button>
    </div>
    <div class="goal-div"
         v-else>
      <input class="goal-text"
             :maxlength=maxChars
             ref='editgoal'
             @keyup.enter='saveGoal'
             v-model='goal'/>
      <p id="charcount">{{count}}/{{maxChars}}</p>
      <p id="enter-key">Enter</p>
    </div>
  </div>
</template>

<script>

export default {

  name: "goal-input",

  props: {
    currentDay: Object
  },

  data() {
    return {
      maxChars: 50,
      day: {},
      goal: "",
      goalEditable: false,
    }
  },

  mounted() {
    this.day = this.currentDay;
    this.goal = this.day.goal;
  },

  computed: {
    count() {
      return this.goal.length;
    }
  },

  watch: {
    currentDay(val) {
      this.day = val;
      this.goal = val.goal;
    }
  },

  methods: {
    saveGoal () {
      if (this.goalEditable) {
        let d = this.day;
        d.goal = this.goal;
        this.$store.dispatch('EDIT_TODAY', d);
        this.goalEditable = false;
      }
    },

    showInput () {
      this.goalEditable = true;
      this.$nextTick(() => {
        this.$refs["editgoal"].focus()
      });
    }
  }

}
</script>

<style lang='scss' scoped>

#goal-input {
  width: 100%;
}

.goal-div {
  position: relative;
  width: 90%;
  display: flex;
  
}

#goal, input {
  @include header;
  font-size: 1.5em;
  width: 100%;
  border: none;
  margin: 25px 0 0 5%;
  padding: 0 15px;
  display: inline-block;
}

.edit-goal {
  width: 10%;
  height: 90%;
  font-size: 1em;
  align-self: center;
}

#charcount {
  right: 50px;
}
#enter-key {
  right: 0;
}
#enter-key, #charcount {
  position: absolute;
  top: 18px;
  color: grey;
  opacity: 0.5;
}

input:focus {
  outline-width: 0;
}

</style>
