<template>
  <div class="content">
    <div class="store-box address-box">
      <p class="box-title">
        <span class="box-num">1</span> Select Address
      </p>
      <ul class="list-style">
        <li class="list" v-for="add in allAddresses" :key="add.id">
            <input type="radio" v-model="address" name="address" :id="add.id" :value="add.id">
            <label :for="add.id">
              <p class="title">{{add.title}}</p>
              <p class="desc">
                {{add.full_address}}
              </p>
            </label>
        </li>
        <li class="list">
            <input type="radio" v-model="address" name="address" id="newAddress" value="newAddress">
            <label for="newAddress">
              <p class="title">NEW ADDRESS</p>
            </label>
        </li>
      </ul>
      <div class="add-new-address mt-4" v-if="address == 'newAddress'">
        <div class="form-row">
          <div class="form-group col-lg-6 col-md-6 col-12">
            <input type="text" placeholder="Label (Gym, School, Airport, Restaurant ....) *" v-model="form.name" class="custome-input" />
          </div>
          <div class="form-group col-lg-6 col-md-6 col-12">
            <input type="text" placeholder="Address *" v-model="form.address" class="custome-input" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6 col-md-6 col-12">
            <v-select
              v-if="availableLocales == false"
              :options="citiesAreas.cities"
              :reduce="(citiesAreas) => citiesAreas.id "
              label="name_en"
              v-model="form.city"
              :dir="'ltr'"
              :placeholder="$t('city')"></v-select>

              <v-select
              v-if="availableLocales == true"
              :options="citiesAreas.cities"
              :reduce="(citiesAreas) => citiesAreas.id "
              label="name_ar"
              v-model="form.city"
              :dir="'rtl'"
              :placeholder="$t('city')"></v-select>
          </div>
          <div class="form-group col-lg-6 col-md-6 col-12">
            <v-select
              v-if="availableLocales == false && form.city"
              :options="filteredData"
              :reduce="(citiesAreas) => citiesAreas.id"
              label="name_en"
              v-model="form.neighbourhood"
              :dir="'ltr'"
              :placeholder="$t('neighbourhood')"></v-select>

              <v-select
              v-if="availableLocales == true && form.city"
              :options="filteredData"
              :reduce="(citiesAreas) => citiesAreas.id"
              label="name_ar"
              v-model="form.neighbourhood"
              :dir="'rtl'"
              :placeholder="$t('neighbourhood')"></v-select>
          </div>
        </div>
        <button type="button" @click="addNewAddress" class="new-address-btn">ADD NEW ADDRESS</button>
      </div>
    </div>
    <div class="store-box payment-box">
      <p class="box-title">
        <span class="box-num">2</span> Select Payment Method
      </p>
      <ul class="list-style">
        <li class="list">
            <input type="radio" v-model="payment" name="payment" id="creditCard" value="credit">
            <label for="creditCard">
              <p class="title">Credit Card</p>
            </label>
            <div class="credit-content mt-3" v-if="payment == 'credit'">
              <div class="form-row">
                <div class="form-group col-12">
                  <input type="text" placeholder="Card number*" v-model="credit.cardNumber" class="custome-input" />
                </div>
                <div class="form-group col-lg-12 col-md-12 col-12">
                  <input type="text" placeholder="Card Name *" v-model="credit.cardName" class="custome-input" />
                </div>
                <div class="form-group col-lg-6 col-md-6 col-12">
                  <input type="number" placeholder="Card expiry date *" v-model="credit.carExpiry" class="custome-input" />
                </div>
                <div class="form-group col-lg-6 col-md-6 col-12">
                  <input type="number" placeholder="CVV *" v-model="credit.cardCode" class="custome-input" />
                </div>
              </div>
            </div>
        </li>
        <li class="list">
            <input type="radio" v-model="payment" name="payment" id="cashOnDelivery" value="cash" >
            <label for="cashOnDelivery">
              <p class="title">Cash On Delivery</p>
            </label>
        </li>
      </ul>
    </div>
    <button class="checkout-btn-style" type="button"  @click.prevent="clickToSubmitDataCheck">place order</button>

  </div>
</template>

<script>
  export default {
    props: {
      citiesAreas: {
        type: Object,
        required: true
      },
      allAddresses: {
        type: Array,
        required: true
      },
      coupon_codeSend: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        options: [
          'Canada',
          'United States'
        ],
        form: {
          name: '',
          address: '',
          city: '',
          neighbourhood: ''
        },
        credit: {
          cardNumber: '',
          cardName: '',
          carExpiry: '',
          cardCode: ''
        },
        address: '',
        payment: ''
      }
    },
    computed: {
      availableLocales () {
        let local = this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
        if(local[0].code == 'en'){
          return true
        } else {
          return false
        }
      },
      filteredData(){
          return this.citiesAreas.areas.filter(item => item.city_id == this.form.city)
      }
    },
    mounted(){
      // this.submitDataFormCheckOut()
    },
    methods: {
      async addNewAddress() {
        // console.log(this.address);getDataFormCheckOut

        const payload ={
          title :  this.form.name,
          address :  this.form.address,
          // user_address_id :  this.address,
          lat :  '0.0',
          lng :  '0.0',
          city_id :  this.form.city,
          area_id :  this.form.neighbourhood,

          // cardNumber: this.credit.cardNumber,
          // cardName: this.credit.cardName,
          // carExpiry: this.credit.carExpiry,
          // cardCode: this.credit.cardCode,

          // payment_method
          // coupon_code
          // payment: this.payment,
        }

        // this.$emit("getDataFormCheckOut", id)

        await this.$Api.user.addNewAddress(payload).then((res)=> {
            this.isloading = false
            if (res?.data?.status) {
              this.$toast.fire({
                title: 'Add Address !',
                text: `${res.data.message}`,
                icon: 'success',
                confirmButtonText: 'Cool',
                width:'35em',
                // padding:'0 0 1.25em'
              })
              this.$emit("reloadAddAddressForm", true)
            }
        })
      },

      async clickToSubmitDataCheck(){
        if(this.address == "newAddress"){
          this.$toast.fire({
            title: 'Not found',
            text: 'Please Add New Address or Select Address',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }else{
          if(this.address && this.payment){
            if(this.payment == "cash"){
              if(this.coupon_codeSend){
                const payload ={
                  user_address_id :  this.address,
                  coupon_code: this.coupon_codeSend,
                  payment_method : "0",
                }
                await this.$Api.user.checkout(payload).then((res)=> {
                  if (res?.data?.status) {
                    this.$toast.fire({
                      title: 'Checkout!',
                      text: `${res.data.message}`,
                      icon: 'success',
                      confirmButtonText: 'Cool'
                    })
                    this.$router.push(`/profile/order/${res.data.data.order_id}`)
                  }
                })
                console.log("cash , coupon_codeSend",payload)

              }else{
                const payload ={
                  user_address_id :  this.address,
                  payment_method : "0",
                }
                await this.$Api.user.checkout(payload).then((res)=> {
                  if (res?.data?.status) {
                    this.$toast.fire({
                      title: 'Checkout!',
                      text: `${res.data.message}`,
                      icon: 'success',
                      confirmButtonText: 'Cool'
                    })
                    this.$router.push(`/profile/order/${res.data.data.order_id}`)
                  }
                })
                console.log("cash , .. ",payload)
              }
            }else if(this.payment == "credit"){
              const payload ={
                title :  this.form.name,
                address :  this.form.address,
                user_address_id :  this.address,
                city_id :  this.form.city,
                area_id :  this.form.neighbourhood,
                coupon_code: this.coupon_codeSend,
                cardNumber: this.credit.cardNumber,
                cardName: this.credit.cardName,
                carExpiry: this.credit.carExpiry,
                cardCode: this.credit.cardCode,
                payment: this.payment,
              }
              console.log("credit , .. ",payload)
              // console.log(this.$router.push('/profile/order', params: { userId }))
            }
          }else{
            if(!this.payment && !this.address){
              this.$toast.fire({
                title: 'Not found',
                text: 'Please Select a Address and Payment',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
            }else if(!this.payment){
              this.$toast.fire({
                title: 'Not found',
                text: 'Please Select a Payment',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
            }else{
              this.$toast.fire({
                title: 'Not found',
                text: 'Please Select a Address',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
            }
          }
        }
      }

    }
  }
</script>

<style lang="scss" scoped>
.checkout-btn-style{
  background-color: #800000;
    border-radius: 65px;
    border: 1px solid #800000;
    color: #fff;
    text-transform: uppercase;
    width: 100%;
    height: 50px;
    transition: 0.3s ease-in-out;
    position: absolute;
}
</style>
