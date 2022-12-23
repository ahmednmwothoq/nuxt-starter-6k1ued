<template>
<div class="content orders-content">
  <!-- <the-orders v-for="order in orders" :key="order"/> -->
  <div v-for="(item, index) in orders" :key="index" >
    <the-orders :user="user" :item="item" />
  </div>
</div>
</template>


<script>
import TheOrders from '~/components/order/TheOrders.vue'
  export default {
    layout: 'supplierDash',
    components: { TheOrders },
    data() {
      return {
        orders: [],
        user: "supplier"
      }
    },
    mounted() {
      this.getOrdersData()
      // this.getOrdersDataa()
      // console.log(this.$auth.$storage.getUniversal("token"))
    },
    methods: {
      async getOrdersData() {
        await this.$Api.supplier.getAllOrderSupplier().then((res) => {
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
