<template>
  <div class="orders" v-if="item">
    <nuxt-link v-if="user == `supplier`"
      :to="localePath({name: 'supplier-order-id', params: {id: item.id}})" class="orders__title">
      Order #{{item.order_num}}
    </nuxt-link>
    <nuxt-link v-else-if="user == `user`"
      :to="localePath({name: 'profile-order-id', params: {id: item.id}})" class="orders__title">
      Order #{{item.order_num}}
    </nuxt-link>

    <p class="orders__time">Date: {{item.created_at}}</p>
    <div v-if="user == `supplier`" v-for="(i, index) in stateOrder" :key="index">
      <p class="orders__status" v-if="item.status == i.id">
        {{ availableLocale ? i.name_ar : i.name_en }}
      </p>
    </div>

    <div v-if="user == `user`" v-for="(i, index) in stateOrder" :key="index">
      <p class="orders__status" v-if="orderStatus == i.id">
        {{ availableLocale ? i.name_ar : i.name_en }}
      </p>
    </div>


    <!-- <p class="orders__status" v-else-if="item.order_type == 1">Order Status 1</p>
    <p class="orders__status" v-else-if="item.order_type == 2">Order Status 2</p>
    <p class="orders__status" v-else-if="item.order_type == 3">Order Status 3</p> -->

    <div class="form-row" v-if="user == `supplier`">
      <div class="form-group col-lg-6 col-md-6 col-12">
        <v-select
        v-if="availableLocale == false"
        :options="stateOrder"
        :reduce="(stateOrder) => stateOrder.id "
        label="name_en"
        v-model="item.status"
        :dir="'ltr'"
        @input="changeStatusOfOrder"
        placeholder="Status Order"></v-select>

        <v-select
        v-if="availableLocale == true"
        :options="stateOrder"
        :reduce="(stateOrder) => stateOrder.id "
        label="name_ar"
        v-model="item.status"
        :dir="'ltr'"
        @input="changeStatusOfOrder"
        placeholder="حالة الطلب"></v-select>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        stateOrder: [
          {
            id: 0,
            name_ar: "حالة غير معروفة",
            name_en: "Unknown status",
          },
          {
            id: 1,
            name_ar: "الطلب قيد المعالجة",
            name_en: "Order Under Processing",
          },
          {
            id: 2,
            name_ar: "طلب خارج التسليم",
            name_en: "Order Out Of Delivery",
          },
          {
            id: 3,
            name_ar: "تم تسليم الطلب",
            name_en: "Order Delivered",
          },
          {
            id: 4,
            name_ar: "تم رفض الطلب",
            name_en: "Order Rejected",
          }
        ],
        form:{
          stateOrderValue:'',

        },
        orderStatus: this.item.products_order.stores[0].status,
      }
    },
    props: {
      item: {
        type: Object,
        required: true
      },
      user: {
        type: String,
        required: true
      }
    },
    computed: {
      availableLocale () {
        let local = this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
        if(local[0].code == 'en'){
          return true
        } else {
          return false
        }
      },
    },
    mounted() {
      console.log("item",this.item)
    },
    methods: {
      async changeStatusOfOrder(){
        if(this.user == `supplier`){
          const payload = {
            order_id: this.item.id,
            status: this.item.status,
          }
          console.log(payload)
          await this.$Api.supplier.changeOrderStatusBySupplier(payload).then((res) => {
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
