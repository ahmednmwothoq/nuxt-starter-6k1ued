<template>
<div class="content orders-content">
  <!-- <the-orders v-for="order in orders" :key="order"/> -->
  <div v-for="(item, index) in orders" :key="index" >
    <the-customs :user="user" :item="item" />
  </div>
</div>
</template>


<script>
import TheCustoms from '~/components/order/TheCustoms.vue'
  export default {
    layout: 'userDash',
    components: { TheCustoms },
    data() {
      return {
        orders: [],
        user: "user"
      }
    },
    mounted() {
      this.getCustomOrdersData()
      // this.getOrdersDataa()
      // console.log(this.$auth.$storage.getUniversal("token"))
    },
    methods: {
      async getCustomOrdersData() {
        await this.$Api.user.getCustomRequestsUser().then((res) => {
          if (res?.data?.status ) {
            this.orders = res.data.data
          }
        })
      }
      // async editProfile(event) {
      //   await this.$Api.user.updateProfileUser(event).then((res)=> {
      //       this.isloading = false
      //       if (res?.data?.status) {
      //         this.$toast.fire({
      //           title: 'Edit Profile !',
      //           text: `${res.data.message}`,
      //           icon: 'success',
      //           confirmButtonText: 'Cool',
      //           width:'35em',
      //           // padding:'0 0 1.25em'
      //         })
      //       }
      //   })
      // }
    }
  }
</script>
<style lang="scss" scoped>

</style>
