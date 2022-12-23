<template>
  <div class="chatbox">
    <div class="chatbox__header">
      <nuxt-link :to="localePath('/')" class="title">User Name</nuxt-link>
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"></path></svg>
    </div>
    <div class="chatbox__footer">
      <p class="desc">
        Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been
      </p>
      <p class="time">20 Jun 2019</p>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>

</style>
