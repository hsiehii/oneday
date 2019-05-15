<template>
  <div>
    <button class="btn"
      @click="newDay">
      Create
    </button>
  </div>
</template>

<script>
export default {
  name: "create-day",

  methods: {
    newDay() {
      this.$store.dispatch('CREATE_TODAY');
    }
  }
}
</script>

<style>
</style>
