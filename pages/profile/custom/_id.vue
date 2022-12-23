<template>
  <div class="single-order" v-if="customData">
    <the-header-page :title="`Order #${customData.order_num}`"/>
    <div class="order-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 col-md-10 col-12 mb-3 offset-lg-1 offset-md-1">
            <div class="order-details mb-5">
              <p class="order-name">Order #{{this.customData.order_num}}</p>
              <p class="place">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><defs><style>.a{fill:none;}.b{fill:#800000;}</style></defs><path class="a" d="M0,0H15V15H0Z"/><path class="b" d="M8.625,13.813l3.094-3.094a4.375,4.375,0,1,0-6.187,0Zm0,1.768L4.648,11.6a5.625,5.625,0,1,1,7.955,0Zm0-6.7a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,8.625,8.875Zm0,1.25a2.5,2.5,0,1,1,0-5A2.572,2.572,0,0,1,10.9,6.583a2.281,2.281,0,0,1,.227,1.042A2.5,2.5,0,0,1,8.625,10.125Z" transform="translate(-1.125 -1.063)"/></svg>
                {{customData.shipping_address}}
              </p>
              <p class="place">
                <img class="icon-custom mr-2" src="~/assets/images/icons/visa_card.svg" alt="edit" />
                {{customData.price}}
              </p>
              <!-- <p class="place">
                <img src="~/assets/images/icons/money.svg" alt="edit" />
                {{customData.price}}
              </p> -->
              <div class="footer-details">
                <p class="new">new</p>
                <p class="date">{{customData.created_at}}</p>
              </div>
            </div>

            <div class="order-details mb-2">
              <p class="order-name">{{customData.desc}}</p>

              <div class="form-row mb-3">
                <p class="col-4" v-for="(image, index) in customData.images" :key="index">
                  <img class="image-custom-order" :src="image.img" alt="image" />
                </p>
              </div>
            </div>
            <div class="mt-3 mb-3" v-if="customOfferData.length > 0">
              <p class="">You have ({{customOfferData.length}}) Price Offer from suppliers on your order,To accept a Price Offer,Please click on it</p>
            </div>

            <!-- <div class="order-details mb-5" v-if="customOfferData.length > 0 " v-for="(offer, index) in customOfferData" :key="index">
              <div class="footer-details mb-5">
                <p class="date">
                  <img class="logo-custom mr-2" :src="offer.logo" alt="edit" />
                  {{offer.name}}
                  {{offer.full_address}}
                </p>
                <p class="new">
                  <img class="icon-custom mr-2" src="~/assets/images/icons/visa_card.svg" alt="edit" />
                  {{offer.price}}
                </p>
              </div>
            </div> -->

            <div v-if="customOfferData.length > 0 " v-for="(offer, index) in customOfferData" :key="index">
              <div class="order-details mb-5">
                <img class="logo-custom mr-2 float-left" width="50" :src="offer.logo" alt="edit" />
                <p class="place mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><defs><style>.a{fill:none;}.b{fill:#800000;}</style></defs><path class="a" d="M0,0H15V15H0Z"/><path class="b" d="M8.625,13.813l3.094-3.094a4.375,4.375,0,1,0-6.187,0Zm0,1.768L4.648,11.6a5.625,5.625,0,1,1,7.955,0Zm0-6.7a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,8.625,8.875Zm0,1.25a2.5,2.5,0,1,1,0-5A2.572,2.572,0,0,1,10.9,6.583a2.281,2.281,0,0,1,.227,1.042A2.5,2.5,0,0,1,8.625,10.125Z" transform="translate(-1.125 -1.063)"/></svg>
                  {{offer.name}}<br>
                  {{offer.full_address}}
                </p>
                <!-- <p class="place">
                  <img src="~/assets/images/icons/money.svg" alt="edit" />
                  {{customData.price}}
                </p> -->
                <div class="footer-details">
                  <p class="new"></p>
                  <p class="date">{{offer.price}} SAR</p>
                </div>
              </div>
            </div>

            <div class="order-details mb-5 text-center">
              <button @click.prevent="cancelCustomOrderFunc" class="btn btn-danger btn-send-offer">cancel</button>
            </div>

            <!-- <div class="order-details mb-5 text-center" v-if="customData.store_sent_offer == false">
              <button v-if="!showAddSend" @click.prevent="showAddSendFunc" class="btn btn-primary btn-send-offer">Send</button>
              <button v-else-if="showAddSend" @click.prevent="showAddSendFunc" class="btn btn-primary btn-send-offer">Don't Send</button>
            </div> -->

            <!-- <div class="order-details mb-5" v-if="showAddSend">
              <p class="order-name">Send Offer</p>
              <div class="form-row">
                <div class="form-group col-12">
                  <textarea v-model="form.desc" class="custome-input" cols="30" rows="5" placeholder="Description Your Product / Price / Quantity / Size / Gendar / Type ........ *"></textarea>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-lg-6 col-md-6 col-sm-12">
                  <input type="number" placeholder="Price *" v-model="form.price" class="custome-input">
                </div>
                <div class="form-group col-lg-6 col-md-6 col-sm-12" v-if="this.delivery == 1">
                  <input type="number" placeholder="Shipping *" v-model="form.shipping" class="custome-input">
                </div>
                <div class="form-group col-lg-6 col-md-6 col-sm-12" v-else-if="this.delivery == 0">
                  <input type="number" placeholder="Weight *" v-model="form.weight" class="custome-input">
                </div>
                <button @click.prevent="sendOfferToUserCustom" class="btn btn-primary" type="submit">Send</button>
              </div>
            </div>

            <div class="order-details mb-5" v-if="showEditSend">
              <p class="order-name">Edit Offer</p>
              <div class="form-row">
                <div class="form-group col-12">
                  <textarea v-model="customData.offer.desc" class="custome-input" cols="30" rows="5" placeholder="Description Your Product / Price / Quantity / Size / Gendar / Type ........ *"></textarea>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-lg-6 col-md-6 col-sm-12">
                  <input type="number" placeholder="Price *" v-model="customData.offer.price" class="custome-input">
                </div>
                <div class="form-group col-lg-6 col-md-6 col-sm-12" v-if="this.delivery == 1">
                  <input type="number" placeholder="Shipping *" v-model="customData.offer.shipping_expenses" class="custome-input">
                </div>
                <div class="form-group col-lg-6 col-md-6 col-sm-12" v-else-if="this.delivery == 0">
                  <input type="number" placeholder="Weight *" v-model="customData.offer.weight" class="custome-input">
                </div>
                <button @click.prevent="sendEditOfferToUserCustom" class="btn btn-primary" type="submit">Send</button>
              </div>
            </div> -->

            <!-- <div class="order-details mb-5" v-if="customData.store_sent_offer == true">
              <div class="footer-details mb-5">
                <p class="new">
                  <img class="icon-custom mr-2" src="~/assets/images/icons/visa_card.svg" alt="edit" />
                  {{customData.offer.price}}
                </p>
                <p class="date">{{customData.offer.created_at}}</p>
              </div>
              <div class="footer-details mb-4">
                <p class="date">Send Message</p>
                <p class="date" @click.prevent="showEditSendFunc">Update Offer</p>
                <p class="date" @click.prevent="deleteSendOfferFunc">Withdrawal</p>
              </div>

            </div> -->


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
        customData: null,
        customOfferData: null,
        showAddSend: false,
        showEditSend: false,
        // delivery: this.$auth.$storage.getUniversal("SupplierData").delivery_method,
        delivery: '',
        productscustomData: [],
        form: {
          desc: '',
          price: '',
          shipping: '',
          weight: '',
        },
      }
    },mounted() {
      this.getCustomData()
      // console.log(this.$auth.$storage.getUniversal("SupplierData"))
    },
    methods: {
      async getCustomData() {
        const payload = this.idOrder
        await this.$Api.user.getCustomRequestsDetailsUser(payload).then((res) => {
          if (res?.data?.status ) {
            this.customData = res.data.data
            this.customOfferData = res.data.data.offers
          }
        })
      },
      async cancelCustomOrderFunc(){
        await this.$Api.user.cancelDCustomRequest(this.idOrder).then((res) => {
          if (res?.data?.status ) {
            this.$toast.fire({
              title: 'Success',
              text: `${res.data.message}`,
              icon: 'success',
              confirmButtonText: 'Cool',
              width:'40em'
            })
          }
        })
        this.$router.push('/profile/custom-order')

      }


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
.image-custom-order{
  width: 250px;
  height: 200px;
}
.icon-custom{
  width: 20px;
  height: 25px;
}
.btn-send-offer{
  background-color: #800000;
  border: none;
  width: 200px;
  height: 50px;
  font-size: 20px;
  text-transform: uppercase;
}
.btn-send-offer:focus{
  border: none;
}
</style>
