<template>
  <div class="single-store">
    <the-header-page :title="`Store Name`"/>
    <div class="sotre-header" v-if="storeData">
      <div class="overlay">
        <div class="container">
          <div class="header-content">
            <div class="profile-img">
              <img :src="storeLogo" alt="profile">
            </div>
            <p class="profile-name">{{storeData.name}}</p>
            <!-- <ul class="list-style">
              <li class="list">
                <a href="https://facebook.com/" target="_blank">
                  <img src="~/assets/images/icons/store_insta.svg" alt="store_insta">
                </a>
              </li>
              <li class="list">
                <a href="https://facebook.com/" target="_blank">
                  <img src="~/assets/images/icons/store_facebook.svg" alt="store_facebook">
                </a>
              </li>
              <li class="list">
                <a href="https://facebook.com/" target="_blank">
                  <img src="~/assets/images/icons/store_twitter.svg" alt="store_twitter">
                </a>
              </li>
              <li class="list">
                <a href="https://facebook.com/" target="_blank">
                  <img src="~/assets/images/icons/store_whatsapp.svg" alt="store_whatsapp">
                </a>
              </li>
            </ul> -->
            <p class="profile-location">
              <img src="~/assets/images/icons/pin_gray.svg" alt="pin_gray">
              {{storeData.address}} , {{getLocales ? addressAR : addressEN}}
            </p>
            <nuxt-link :to="localePath('/')" class="profile-btn">Send a message</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="store-products">
      <div class="container">
        <div class="row">
          <div v-if="products.length > 0" class="col-lg-3 col-md-6 col-12 mb-3" v-for="(item, index) in products" :key="index">
            <the-card :item="item"/>
          </div>
        </div>
      </div>
    </div>

    <vs-pagination
      :total-pages="this.totalPages"
      :page-padding="1"
      :current-page="Number(this.pageNo)"
      @change="changePage"
    ></vs-pagination>
  </div>
</template>

<script>
import TheHeaderPage from '~/components/shared/TheHeaderPage.vue'
import TheCard from '~/components/shared/TheCard.vue'
  export default {
    components: {
      TheHeaderPage,
      TheCard,
    },
    data() {
      return {
        storeId: this.$route.query.store_id,
        pageNo: this.$route.query.page,
        totalPages : null,
        // fetch : false,
        storeLogo : '',
        storeCover : '',
        addressAR : '',
        addressEN : '',
        storeCover : '',
        products: [],
        storeData: {}
      }
    },
    mounted() {
      this.getStoreProducts()

      // console.log(this.$route.fullPath.split('store?')[1])
    },
    computed: {
      availableLocales () {
        return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
      },
      getLocales () {
        let local = this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
        if(local[0].code == 'en'){
          return true
        } else {
          return false
        }
      },
    },
    methods: {
      async getStoreProducts(){
        await this.$axios.get(`home/getStoreProducts?store_id=${this.storeId}&page=${this.pageNo}`).then((res)=> {
          // const badResponse = res.find((response) => !response.status)
          // if(badResponse) return error({ statusCode: badResponse.status, message: badResponse.msg})
          if (res?.data?.status && res?.data?.data) {


            this.storeData = res.data.data.store
            const imgs = res.data.data.store.media
            const area = res.data.data.store.area
            const city = res.data.data.store.city
            if(imgs){
              for(let i=0;imgs.length > i ; i++){
                if(imgs[i].collection_name == 'logos'){
                  this.storeLogo = imgs[i].original_url
                }else if(imgs[i].collection_name == 'covers'){
                  this.storeCover = imgs[i].original_url
                }
              }
            }
            if(area && city){
              this.addressAR = `${area.name_ar} , ${city.name_ar}`
              this.addressEN = `${area.name_en} , ${city.name_en}`
            }
            // console.log(res.data.data.store)

            // if(res?.data?.data?.has_more == true && this.fetch == true){
            //   // console.log(res.data.data.pagination_num)
            //   this.products = res.data.data.products
            //   this.totalPages = res.data.data.pagination_num
            // }else if(res?.data?.data?.has_more == false && this.fetch == true){
            //   this.products = this.products
            //   this.totalPages = this.totalPages
            //   this.fetch == false
            // }else{
            //   this.products = res.data.data.products
            //   this.totalPages = res.data.data.pagination_num
            //   this.fetch == true
            // }

            if(res?.data?.data?.has_more == true){
              this.products = res.data.data.products
              this.totalPages = res.data.data.pagination_num
            }else{
              if(this.products && this.totalPages){
                this.totalPages =this.totalPages
                this.products = this.products
              }else{
                this.products = res.data.data.products
                this.totalPages = res.data.data.pagination_num
              }
            }

          }else{}
          // console.log(res.data.data)
        }).catch(({ response }) => {
          // console.log('fail',response);
          if(response.status == 500){
              this.$toast.fire({
              title: 'Note!',
              text: 'There are no products on the selected page',
              icon: 'warning',
              confirmButtonText: 'Cool'
            })
          }else{
            this.$toast.fire({
                title: 'Note!',
                text: `${response.data.message}`,
                icon: 'warning',
                confirmButtonText: 'Cool'
              })
          }

          // return error({ statusCode: response.status, message: response.data.message})
        })
      },
      changePage(p) {
        // console.log(p);
        this.pageNo = p;
        this.getStoreProducts()
      },
    },

  }
</script>

<style lang="scss" scoped>

</style>
