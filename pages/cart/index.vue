<template>
  <div class="cart">
    <the-header-page :title="`Shopping Cart`"/>
    <div class="cart-content">
      <form>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mb-4">
              <!-- <the-first-step @reloadToGetData="reloadToGetData" :container="container" v-if="!stepCheckout && !logged"/> -->
              <the-first-step @reloadToGetData="reloadToGetData" :containerCheck="containerCheck" v-if="!stepCheckout && logged && containerCheck"/>
              <the-second-step
                @reloadAddAddressForm="reloadAddAddressForm"
                :citiesAreas="citiesAreas"
                :allAddresses="allAddresses"
                :coupon_codeSend="coupon_codeSend"
                v-if="stepCheckout"
              />
            </div>

            <div class="col-lg-4 mb-4">
              <div class="cart-checkout">
                <div class="checkout-header">
                  <div class="header">
                    <p class="title">Invoice Summary</p>
                  </div>
                  <div class="discount-coupon" v-if="stepCheckout">
                    <p class="title">Have A Discount Coupon?</p>
                      <div class="coupon-content">
                        <input type="text" v-model="coupon_code" placeholder="Enter Discount Coupon" class="custome-input">
                        <button class="apply-coupon-btn" type="button" @click.prevent="getCheckCouponSubmit">Apply</button>
                      </div>
                  </div>
                  <ul class="list-style" v-if="checkCoupon_code">
                    <li class="list">
                      <p class="title">Sub Total</p>
                      <p class="price">{{checkCouponData.sub_total}} SAR</p>
                    </li>
                    <li class="list">
                      <p class="title">Discount Money</p>
                      <p class="price">{{checkCouponData.discount_money}} SAR</p>
                    </li>
                    <li class="list">
                      <p class="title">Total Shipping Charges</p>
                      <p class="price">{{checkCouponData.total_shipping_charges}} SAR</p>
                    </li>
                    <li class="list">
                      <p class="title total-price">Order Total</p>
                      <p class="price total-price">{{checkCouponData.total_order_price}} SAR</p>
                    </li>
                  </ul>
                  <ul class="list-style" v-else>
                    <li class="list">
                      <p class="title">Sub Total</p>
                      <p class="price">{{containerCheck.sub_total}} SAR</p>
                    </li>
                    <li class="list">
                      <p class="title">Delivery Charges</p>
                      <p class="price">{{containerCheck.total_shipping_charges}} SAR</p>
                    </li>
                    <li class="list">
                      <p class="title total-price">Order Total</p>
                      <p class="price total-price">{{containerCheck.total_cart_price}} SAR</p>
                    </li>
                  </ul>
                </div>
                <button class="checkout-btn" type="button" v-if="!stepCheckout" @click="stepCheckout = true">checkout</button>
                <!-- <button class="checkout-btn" type="button" v-else  @click.prevent="clickToSubmitDataCheck">place order</button> -->
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TheFirstStep from '~/components/cart/TheFirstStep.vue';
import TheSecondStep from '~/components/cart/TheSecondStep.vue';
import TheHeaderPage from '~/components/shared/TheHeaderPage.vue'
  export default {
    components: {
      TheHeaderPage,
      TheFirstStep,
      TheSecondStep
    },
    data() {
      return {
        stepCheckout: false,
        container: [],
        containerCheck: {},
        citiesAreas: {},
        checkCouponData: {},
        allAddresses: [],
        logged: false,
        coupon_code: '',
        coupon_codeSend: '',
        checkCoupon_code: false,
      }
    },
    mounted() {
      this.getCartProducts()
      this.getCartProductsCheckOut()
      this.getCitiesHaveAreas()
      this.getAllAddresses()
      if(this.$auth.$storage.getUniversal("logged_In")){
        this.logged = true
      }else{
        this.logged = false
      }


    },
    methods: {
      async getCartProducts(){
        this.$Api.user.getCartDetails().then((res)=> {
          if (res?.data?.status) {
            this.container = res.data.data
          }
        })
      },
      async getCartProductsCheckOut(){
        this.$Api.user.getCheckout().then((res)=> {
          if (res?.data?.status) {
            this.containerCheck = res.data.data
          }
        })
      },
      reloadToGetData(even){
        if(even){
          this.getCartProductsCheckOut()
          this.$router.push('/cart')
        }
      },
      async getCitiesHaveAreas(){
        await this.$Api.general.getCitiesHaveAreasEdit().then((res)=> {
            this.isloading = false
            if (res?.data?.status) {
              this.citiesAreas = res.data.data
            }
        })
      },
      async getAllAddresses() {
        await this.$Api.user.getAllAddresses().then((res)=> {
            this.isloading = false
            if (res?.data?.status) {
              this.allAddresses = res.data.data
              // console.log(this.allAddresses)
            }
        })

      },
      reloadAddAddressForm(even){
        if(even){
          this.getAllAddresses()
        }

      },
      async getCheckCouponSubmit(){
        const payload = `coupon_code=${this.coupon_code}`
        await this.$Api.user.getCheckCoupon(payload).then((res)=> {
          this.isloading = false
          if (res?.data?.status) {
            this.checkCouponData = res.data.data
            this.checkCoupon_code = true
            this.coupon_codeSend = this.coupon_code
            this.$toast.fire({
              title: 'Note!',
              text: 'This Coupon Code has been activated',
              icon: 'success',
              confirmButtonText: 'Cool'
            })
          }
          // else{
            // this.$toast.fire({
            //   title: 'Note!',
            //   text: 'This Coupon code does not exist',
            //   icon: 'warning',
            //   confirmButtonText: 'Cool'
            // })
          // }
        })
        // .catch(({ response }) => {
        //   if(response.status == 500){
        //     this.$toast.fire({
        //       title: 'Note!',
        //       text: 'This Coupon code does not exist',
        //       icon: 'warning',
        //       confirmButtonText: 'Cool'
        //     })
        //   }
        // })
      },

      // clickToSubmitDataCheck(){
      //   console.log("data")
      // }
    }
  }
</script>

<style lang="scss" scoped>

</style>
