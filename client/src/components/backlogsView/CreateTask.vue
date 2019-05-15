<template>
  <div id="create-task">
    <div class="create-btn"
          @click="editable = true"
          v-if="!editable">
      <div>New Task</div>
    </div>
    <input v-if="editable"
           @change="title = $event.target.value"
           placeholder="Task Title">
    <button v-if="editable"
            @click="createTask">
      Save
    </button>
  </div>
</template>

<script>

export default {
  name: 'create-task',

  data() {
    return {
      editable: false,
      title: "",
    }
  },

  methods: {
    createTask() {
      if (this.title) {
        this.$emit('createTask', this.title);
      }
      this.editable = false;
    }
  }

}

</script>

<style lang="scss" scoped>
#create-task {
  height: 20%;
  position: relative;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid $second-color-lighter;
}

.create-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
  cursor:pointer;
  color: $second-color-darker;
}

.create-btn div {
  text-align: center;
  height: 20px;
  padding: 0;
}

.create-btn:hover {
  background-color: $second-color-lighter;
}

input {
  -webkit-appearance: none;
  border: none;
  padding: 0 10px;
  outline: none;
  flex-grow: 1;
  background-color: $placeholder-color;
}
</style>
