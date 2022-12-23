<template>
  <div class="single-order" v-if="customData">
    <the-header-page :title="`Order #${customData.order_num}`"/>
    <div class="order-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 col-md-10 col-12 mb-3 offset-lg-1 offset-md-1">
            <div class="order-details mb-5">
              <p class="order-name">Order #{{this.customData.order_num}}</p>
              <p class="name">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" style="fill: #800000;"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></svg>
                {{customData.user.name}}
              </p>
              <p class="number">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" style="fill: #800000;"><path d="m20.487 17.14-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z"></path></svg>
                {{customData.user.phone}}
              </p>
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
            <div class="mt-3 mb-3" v-if="customData.store_sent_offer == true">
              <p class="">You have submitted a quote on this order, you can Update or withdraw this offer</p>
            </div>
            <div class="order-details mb-5 text-center" v-if="customData.store_sent_offer == false">
              <button v-if="!showAddSend" @click.prevent="showAddSendFunc" class="btn btn-primary btn-send-offer">Send</button>
              <button v-else-if="showAddSend" @click.prevent="showAddSendFunc" class="btn btn-primary btn-send-offer">Don't Send</button>
            </div>

            <div class="order-details mb-5" v-if="showAddSend">
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
            </div>

            <div class="order-details mb-5" v-if="customData.store_sent_offer == true">
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
        customData: null,
        showAddSend: false,
        showEditSend: false,
        delivery: this.$auth.$storage.getUniversal("SupplierData").delivery_method,
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
        await this.$Api.supplier.getCustomRequestsDetailsSupplier(payload).then((res) => {
          if (res?.data?.status ) {
            this.customData = res.data.data
          }
        })
      },
      showAddSendFunc(){
        this.showAddSend = !this.showAddSend
      },
      showEditSendFunc(){
        this.showEditSend = !this.showEditSend
      },
      async sendOfferToUserCustom(){
        const formData = new FormData();
        formData.append("custom_request_id", this.customData.id);
        formData.append("desc", this.form.desc);
        formData.append("price", this.form.price);
        if(this.delivery == 1){
          formData.append("shipping_expenses", this.form.shipping);
        }else if(this.delivery == 0){
          formData.append("weight", this.form.weight);
        }

        await this.$Api.supplier.sendOrUpdateOfferSupplier(formData).then((res) => {
          if (res?.data?.status ) {
            this.$toast.fire({
              title: 'Success',
              text: `${res.data.message}`,
              icon: 'success',
              confirmButtonText: 'Cool',
              width:'40em'
            })
            this.getCustomData()
          }
        })
        this.showAddSend = !this.showAddSend
      },
      async sendEditOfferToUserCustom(){
        const formData = new FormData();
        formData.append("custom_request_id", this.customData.id);
        formData.append("desc", this.customData.offer.desc);
        formData.append("price", this.customData.offer.price);
        if(this.delivery == 1){
          formData.append("shipping_expenses", this.customData.offer.shipping_expenses);
        }else if(this.delivery == 0){
          formData.append("weight", this.customData.offer.weight);
        }

        await this.$Api.supplier.sendOrUpdateOfferSupplier(formData).then((res) => {
          if (res?.data?.status ) {
            this.$toast.fire({
              title: 'Success',
              text: `${res.data.message}`,
              icon: 'success',
              confirmButtonText: 'Cool',
              width:'40em'
            })
            this.getCustomData()
          }
        })
        this.showEditSend = !this.showEditSend
      },
      async deleteSendOfferFunc(){
        console.log(this.customData.offer.id)
        const formData = new FormData();
        formData.append("store_offer_id", this.customData.offer.id);

        await this.$Api.supplier.withdrawalOfferSupplier(this.customData.offer.id).then((res) => {
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
        this.getCustomData()
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
