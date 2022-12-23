<template>
  <div class="single-order">
    <the-header-page :title="`Order #${orderData.order_num}`"/>
    <div class="order-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-7 col-12 mb-3">
              <div class="order-details mb-5">
                <p class="order-name">Order #{{orderData.order_num}}</p>
                <p class="name">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" style="fill: #800000;"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></svg>
                  {{orderData.order_user_name}}
                </p>
                <p class="number">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" style="fill: #800000;"><path d="m20.487 17.14-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z"></path></svg>
                  {{orderData.order_user_phone}}
                </p>
                <p class="place">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><defs><style>.a{fill:none;}.b{fill:#800000;}</style></defs><path class="a" d="M0,0H15V15H0Z"/><path class="b" d="M8.625,13.813l3.094-3.094a4.375,4.375,0,1,0-6.187,0Zm0,1.768L4.648,11.6a5.625,5.625,0,1,1,7.955,0Zm0-6.7a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,8.625,8.875Zm0,1.25a2.5,2.5,0,1,1,0-5A2.572,2.572,0,0,1,10.9,6.583a2.281,2.281,0,0,1,.227,1.042A2.5,2.5,0,0,1,8.625,10.125Z" transform="translate(-1.125 -1.063)"/></svg>
                  {{orderData.shipping_address}}
                </p>
                <div class="footer-details">
                  <p class="new">new</p>
                  <p class="date">{{orderData.created_at}}</p>
                </div>
              </div>
              <div class="store-box" v-for="(itemStore, index) in productsOrderData.stores" :key="index">
                <div class="orders-content">
                  <p class="store_title">{{itemStore.store_name}} ( {{itemStore.count_products}} Items)</p>
                  <div class="table-responsive">
                    <table class="table table-borderless">
                      <thead>
                        <tr>
                          <th scope="col">Product</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Price</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, id) in itemStore.products" :key="id">
                          <td class="product-info">
                            <img :src="item.img" :alt="item.name">
                            <p class="product-title">{{item.name}}</p>
                          </td>
                          <td class="product-quntity">
                            <div class="count">
                              <span class="counter-text">{{item.qty}}</span>
                            </div>
                          </td>
                          <td class="product-price">
                            <p class="price">{{item.price}} SAR</p>
                            <!-- <p class="price-discount">
                              <span class="discount">10000 SAR</span>
                              <span class="percent">33%</span>
                            </p> -->
                          </td>
                          <td class="product-rate">
                            <nuxt-link :to="localePath('/profile/order/rate')" class="rate-link">Rate And Review</nuxt-link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
          </div>
          <div class="col-lg-4 col-md-5 col-12 mb-3">
            <div class="order-invoice mb-4">
                <div class="header">
                  <p class="title">Invoice Summary</p>
                </div>
                <ul class="list-style">
                  <li class="list">
                    <p class="title">Sub Total</p>
                    <p class="price">{{orderData.sub_total}} SAR</p>
                  </li>
                  <li class="list">
                    <p class="title">Delivery Charges</p>
                    <p class="price">{{orderData.total_shipping_charges}} SAR</p>
                  </li>
                  <li class="list">
                    <p class="title total-price">Order Total</p>
                    <p class="price total-price">{{orderData.total_order_price}} SAR</p>
                  </li>
                </ul>
            </div>
            <div  v-for="(itemStoreState, index) in productsOrderData.stores" :key="index">
              <div class="order-status">
                <div class="header">
                  <p class="title">Order Status For {{itemStoreState.store_name}}</p>
                </div>
                <ul class="list-style">
                  <li class="list" v-if="itemStoreState.status >= 0">
                    <div class="list-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45"><defs><style>.a{fill:#800000;}.b{fill:none;}.c{fill:#fff;}</style></defs><circle class="a" cx="22.5" cy="22.5" r="22.5"/><g transform="translate(11 11)"><path class="b" d="M0,0H23V23H0Z"/><path class="c" d="M2,11.178a9.1,9.1,0,0,1,.292-2.291A2.774,2.774,0,0,0,4.834,7.52a2.724,2.724,0,0,0-.075-2.867,9.238,9.238,0,0,1,4-2.291,2.779,2.779,0,0,0,4.935,0,9.238,9.238,0,0,1,4,2.291,2.724,2.724,0,0,0-.075,2.868,2.774,2.774,0,0,0,2.544,1.368,9.1,9.1,0,0,1,0,4.58,2.774,2.774,0,0,0-2.543,1.367,2.724,2.724,0,0,0,.075,2.867,9.238,9.238,0,0,1-4,2.291,2.779,2.779,0,0,0-4.935,0,9.238,9.238,0,0,1-4-2.291,2.724,2.724,0,0,0,.075-2.868,2.774,2.774,0,0,0-2.544-1.368A9.123,9.123,0,0,1,2,11.178Zm4.433,2.744a4.536,4.536,0,0,1,.52,3.224,7.405,7.405,0,0,0,1.2.686,4.646,4.646,0,0,1,6.155,0,7.405,7.405,0,0,0,1.2-.686,4.533,4.533,0,0,1,.52-3.224,4.6,4.6,0,0,1,2.556-2.058,7.369,7.369,0,0,0,0-1.372,4.6,4.6,0,0,1-2.557-2.058,4.533,4.533,0,0,1-.52-3.224,7.388,7.388,0,0,0-1.2-.686,4.645,4.645,0,0,1-6.154,0,7.389,7.389,0,0,0-1.2.686,4.533,4.533,0,0,1-.52,3.224,4.6,4.6,0,0,1-2.556,2.058,7.369,7.369,0,0,0,0,1.372,4.6,4.6,0,0,1,2.557,2.058Zm4.795,0A2.744,2.744,0,1,1,14,11.178,2.756,2.756,0,0,1,11.228,13.923Zm0-1.83a.915.915,0,1,0-.923-.915A.919.919,0,0,0,11.228,12.093Z" transform="translate(0.272 0.322)"/></g></svg>
                    </div>
                    <div class="list-content">
                      <p class="title">Pending</p>
                      <p class="sub-title">Your Order Is In The First Stage, And We Are Waiting For The Sellers To Prepare It For You</p>
                    </div>
                  </li>
                  <li class="list" v-if="itemStoreState.status >= 1">
                    <div class="list-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45"><defs><style>.a{fill:#800000;}.b{fill:#fff;}</style></defs><circle class="a" cx="22.5" cy="22.5" r="22.5"/><g transform="translate(8.1 13)"><g transform="translate(4.9)"><g transform="translate(0)"><path class="b" d="M24.38,5.069a.272.272,0,0,0-.061-.1.187.187,0,0,0-.122-.082L19.525,2.458,14.793.031a.3.3,0,0,0-.265,0L9.775,2.458,5.084,4.885a.246.246,0,0,0-.143.143c-.02.041-.02.061-.041.1v9.73a.318.318,0,0,0,.163.265l9.444,4.834a.075.075,0,0,0,.061.02h.02c.02,0,.041.02.082.02a.184.184,0,0,0,.1-.02,617,617,0,0,1,.041-.041l9.424-4.814a.318.318,0,0,0,.163-.265V5.15C24.4,5.11,24.4,5.089,24.38,5.069ZM14.65.622,19.24,2.988,23.462,5.15l-4.08,2.1L10.571,2.723Zm-.286,18.623L5.492,14.676V5.64l4.3,2.2,4.569,2.346Zm.286-9.567L10.061,7.313,5.838,5.15l4.08-2.1L18.73,7.578ZM23.809,14.7l-8.873,4.528V10.189L19.5,7.843l4.3-2.2Z" transform="translate(-4.9)"/></g></g><g transform="translate(17.477 8.284)"><path class="b" d="M255.668,162.978c.02,0,0-.02,0-.041a.783.783,0,0,0-.469-.449.934.934,0,0,0-.734.061l-2.244,1.081a1.354,1.354,0,0,0-.571.551.88.88,0,0,0-.061.714.818.818,0,0,0,.469.469.934.934,0,0,0,.734-.061l2.244-1.081a1.354,1.354,0,0,0,.571-.551A.918.918,0,0,0,255.668,162.978Zm-.592.53a.492.492,0,0,1-.2.2l-2.244,1.081a.355.355,0,0,1-.286.02.289.289,0,0,1-.184-.163v-.02a.4.4,0,0,1,.02-.265.492.492,0,0,1,.2-.2l2.244-1.081a.355.355,0,0,1,.286-.02.274.274,0,0,1,.184.184A.3.3,0,0,1,255.077,163.509Z" transform="translate(-251.54 -162.44)"/></g></g></svg>
                    </div>
                    <div class="list-content">
                      <p class="title">Prepare</p>
                      <p class="sub-title">Your Order Is Being Processed By The Seller, And Then It Will Be On The Way To You</p>
                    </div>
                  </li>
                  <li class="list" v-if="itemStoreState.status >= 2">
                    <div class="list-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45"><defs><style>.a{fill:#800000;}.b{fill:#fff;}</style></defs><g transform="translate(0)"><circle class="a" cx="22.5" cy="22.5" r="22.5" transform="translate(0)"/><g transform="translate(-7.336 13)"><g transform="translate(21.336)"><path class="b" d="M153.5,93.666a4.167,4.167,0,1,0-4.167-4.167A4.172,4.172,0,0,0,153.5,93.666Zm0-7.5a3.333,3.333,0,1,1-3.333,3.333A3.337,3.337,0,0,1,153.5,86.166Z" transform="translate(-144.333 -82)"/><path class="b" d="M39.636,19.419l-2.5-5.833a.417.417,0,0,0-.383-.253h-1.48l.511-.509a7.5,7.5,0,1,0-10.563,0l.512.51h-1.48a.417.417,0,0,0-.383.253l-2.5,5.833a.417.417,0,0,0,.383.581h17.5a.417.417,0,0,0,.383-.581ZM23.836,7.5A6.667,6.667,0,1,1,35.2,12.233L30.5,16.912l-4.694-4.679A6.622,6.622,0,0,1,23.836,7.5ZM22.384,19.167l2.144-5h2.041l3.64,3.628a.416.416,0,0,0,.588,0l3.641-3.628h2.041l2.144,5Z" transform="translate(-21.336)"/></g></g></g></svg>
                    </div>
                    <div class="list-content">
                      <p class="title">In The Way</p>
                      <p class="sub-title">There Isn't Much Left For You To Get Your Order, It Is On Its Way To You Now</p>
                    </div>
                  </li>
                  <li class="list" v-if="itemStoreState.status >= 3">
                    <div class="list-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45"><defs><style>.a{fill:#800000;}.b{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;}</style></defs><circle class="a" cx="22.5" cy="22.5" r="22.5" transform="translate(0 0)"/><g transform="translate(10 9.009)"><path class="b" d="M23,12.077V13a10,10,0,1,1-5.93-9.14" transform="translate(0 0)"/><path class="b" d="M26.5,6l-10,10.01-3-3" transform="translate(-3.5 -1.003)"/></g></svg>
                    </div>
                    <div class="list-content">
                      <p class="title">Delivered</p>
                      <p class="sub-title">Finally, Your Order Has Been Successfully Delivered, You Can Return The Order If It Has Any Problem</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeaderPage from '~/components/shared/TheHeaderPage.vue'
  export default {
    components: {
      TheHeaderPage
    },
    data() {
      return {
        idOrder: this.$route.params.id,
        orderData: {},
        productsOrderData: [],
      }
    },mounted() {
      this.getOrderData()
    },
    methods: {
      async getOrderData() {
        const payload = this.idOrder
        await this.$Api.user.getUserOrderDetails(payload).then((res) => {
          if (res?.data?.status ) {
            this.orderData = res.data.data
            this.productsOrderData = res.data.data.products_order
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
.store_title{
  color: #333333;
  font-weight: 600;
  font-size: 16px;
  padding-top: 10px;
  padding-left: 10px;
}
</style>
