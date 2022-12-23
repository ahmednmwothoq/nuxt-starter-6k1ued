<template>
  <div class="orders">
    <nuxt-link v-if="this.user == 'supplier'"
      :to="localePath({name: 'supplier-custom-id', params: {id: item.id}})" class="orders__title">
      Custom Order #{{item.order_num}}
    </nuxt-link>
    <nuxt-link v-else
      :to="localePath({name: 'profile-custom-id', params: {id: item.id}})" class="orders__title">
      Custom Order #{{item.order_num}}
    </nuxt-link>

    <p class="orders__time">Date: {{item.created_at}}</p>
    <p class="orders__status" v-if="item.store_sent_offer">
      <img class="icon-custom mr-2" src="~/assets/images/icons/us-dollar.png" alt="edit" />
    </p>
    <div v-if="this.user == 'user'">
      <p class="orders__status" v-if="item.offers.length > 0">
        {{item.offers.length}} Offer
      </p>
    </div>


    <!-- <p class="orders__status" v-else-if="item.order_type == 1">Order Status 1</p>
    <p class="orders__status" v-else-if="item.order_type == 2">Order Status 2</p>
    <p class="orders__status" v-else-if="item.order_type == 3">Order Status 3</p> -->
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
        }
      }
    },
    props: {
      item: {
        type: Object,
        required: true
      },user: {
        type: String,
        required: true
      }
    },
    mounted() {
      console.log(this.item)
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
    methods: {

    },
  }
</script>

<style lang="scss" scoped>
.icon-custom{
  width: 50px;
}
</style>
