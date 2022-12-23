<template>
  <div class="content chat-content">
    <the-chat v-for="(i, index) in 10" :key="index" />
  </div>
</template>


<script>
import TheChat from '~/components/shared/TheChat.vue'
  export default {
    layout: 'userDash',
    components: { TheChat },
  }
</script>
<style lang="scss" scoped>

</style>
