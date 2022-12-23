<template>
    <div class="custome-alert" :class="msg">
      <div class="content">
        <button class="close-alert" type="button" @click.prevent="close">X</button>
        <p class="text">{{text}}</p>
      </div>
    </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        required: true
      },
      msg: {
        type: String,
        required: true
      }
    },
    methods: {
      close() {
        this.$emit("close")
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
