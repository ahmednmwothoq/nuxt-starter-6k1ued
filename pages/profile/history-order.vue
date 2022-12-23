<template>
<div class="content orders-content">
  <div v-for="(item, index) in orders" :key="index" >
    <the-orders :user="user" :item="item" />
  </div>
</div>
</template>


<script>
import TheOrders from '~/components/order/TheOrders.vue'
  export default {
    components: { TheOrders },
    data() {
      return {
        orders: [],
        user: "user"
      }
    },
    layout: 'userDash',
    mounted() {
      this.getOrdersData()
      console.log(this.$auth.$storage.getUniversal("token"))
    },
    methods: {
      async getOrdersData() {
        await this.$Api.user.getOrdersUser().then((res) => {
          if (res?.data?.status ) {
            this.orders = res.data.data
          }
        })
      },
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
