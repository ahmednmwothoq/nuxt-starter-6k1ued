<template>
  <div class="section-header">
    <p class="title">{{title}}</p>
    <div class="section-btns">
      <button class="arrow-btn" type="button" @click.prevent="slidePrev">
        <img src="~/assets/images/icons/arrow-dropleft-circle.svg" alt="arrow-dropleft-circle">
      </button>
      <button class="arrow-btn" type="button" @click.prevent="slideNext">
        <img src="~/assets/images/icons/arrow-dropright-circle.svg" alt="arrow-dropright-circle">
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      }
    },
    methods: {
      slidePrev() {
        this.$emit("slidePrev")
      },
      slideNext() {
        this.$emit("slideNext")
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
