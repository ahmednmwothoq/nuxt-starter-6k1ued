<template>
<div class="content manage-product-content">
  <div class="row">
    <div class="col-lg-6 col-md-12 col-12 mb-3"  v-for="(item, index) in container" :key="index">
      <the-profile-card @reloadPageData="reloadPageData" :item="item" />
    </div>
  </div>
  <nuxt-link :to="localePath('/supplier/product/add')" class="add-product-btn">add new</nuxt-link>
</div>
</template>


<script>
import TheProfileCard from '~/components/profile/TheProfileCard.vue';
  export default {
  layout: 'supplierDash',
  components: { TheProfileCard },
  data() {
      return {
        container: null,
      }
    },
  mounted() {
    // console.log(this.topRatedProducts)
    this.getProductsSupplier()
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
      async getProductsSupplier(){
        await this.$Api.supplier.GetAllProductsSupplier().then((res)=> {
            if (res?.data?.status && res?.data?.data) {
              this.container = res.data.data
            }
        })
      },
      reloadPageData(even){
        if(even){
          this.getProductsSupplier()
        }
      }
    },
  }
</script>
<style lang="scss" scoped>

</style>
