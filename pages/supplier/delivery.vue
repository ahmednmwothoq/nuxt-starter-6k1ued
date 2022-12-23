<template>
  <div class="content delivery-content">
    <p class="title">Please, Choose The Delivery Methods That Suit Your Store, As Well As Your Products And Your Business</p>
      <form @submit.prevent="deliveryMethod">
        <div class="delivery-box">
          <p class="box-title">Select Delivery Method</p>
          <div class="form-group">
            <input type="radio"  v-model="delivery" name="delivery1" id="aramex" value="aramex">
            <label for="aramex">By Aramex</label>
          </div>
          <div class="form-group">
            <input type="radio"  v-model="delivery" name="delivery1" id="customer" value="customer">
            <label for="customer">I'll Deliver The Products To The Customer's</label>
          </div>
          <div class="delivery-cost" v-if="delivery == 'customer'">
            <div class="form-row">
              <div class="form-group col-lg-6 col-md-6 col-12">
                <input type="number" placeholder="Delivery Cost Within City *" v-model="form.within" class="custome-input">
              </div>
              <div class="form-group col-lg-6 col-md-6 col-12">
                <input type="number" placeholder="Delivery Cost Without City *" v-model="form.without" class="custome-input">
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="delivery-btn">SAVE</button>
      </form>
  </div>
</template>


<script>
  export default {
  layout: 'supplierDash',
  components: {  },
  data() {
    return {
      delivery: "",
      form: {
        within: '',
        without: ''
      },
      deliverySupplier: this.$auth.$storage.getUniversal("SupplierData").delivery_method,
    }
  },
  mounted() {
    this.saveDelivery()
    // console.log(this.$auth.$storage.getUniversal("SupplierData"))
  },
  methods: {
    saveDelivery() {
      if(this.deliverySupplier == 1){
        this.form.within = this.$auth.$storage.getUniversal("SupplierData").inside_city_cost
        this.form.without = this.$auth.$storage.getUniversal("SupplierData").outside_city_cost
        this.delivery = 'customer'
      }else{
        this.delivery = 'aramex'
      }
    },
    async deliveryMethod() {
      if(this.delivery == "aramex"){
        const payload= {
          delivery_method: 0,
        }
        await this.$Api.supplier.changeDeliveryMethod(payload).then((res) => {
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
      }else{
        const payload= {
          delivery_method: 1,
          inside_city_cost: this.form.within,
          outside_city_cost: this.form.without
        }
        await this.$Api.supplier.changeDeliveryMethod(payload).then((res) => {
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
      }
    }
  },
  }
</script>
<style lang="scss" scoped>

</style>
