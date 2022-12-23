<template>
  <div class="content notitication-content">
    <div v-for="(item, index) in notifications" :key="index">
      <the-notification  :item="item" />
    </div>
  </div>
</template>


<script>
import TheNotification from '~/components/shared/TheNotification.vue'
  export default {
    layout: 'userDash',
    components: { TheNotification },
    data() {
      return {
        notifications: null,
      }
    },
  mounted() {
    // console.log(this.topRatedProducts)
    this.getTheNotification()
  },
    methods: {
      async getTheNotification(){
        await this.$Api.user.notificationsHistoryEdit().then((res)=> {
            if (res?.data?.status) {
              this.notifications = res.data.data
            }

        })

      }
    }

  }
</script>
<style lang="scss" scoped>

</style>
