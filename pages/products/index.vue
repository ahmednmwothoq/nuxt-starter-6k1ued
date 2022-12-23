<template>
  <div class="single-product">
    <the-header-page :category="category"/>
    <div class="container">
      <div class="single-product-header">
        <div class="row">
          <div class="col-lg-5 mb-3">
            <div class="left-content">
              <the-gallery :photos="photos"></the-gallery>
            </div>
          </div>
          <div class="col-lg-7 mb-3">
            <div class="right-content">
              <div class="header-content">
                <p class="title">{{productDetails.name}}</p>
                <div class="header-middle-content">
                  <p class="price" v-if="productDetails.sale_price">{{productDetails.sale_price}} SAR <span v-if="productDetails.discount" class="price-discount">{{productDetails.regular_price}} SAR</span><span class="discount-percent">{{productDetails.discount}}%</span></p>
                  <p class="price" v-else>{{productDetails.regular_price}} SAR<span v-if="productDetails.discount" class="discount-percent">{{productDetails.discount}}%</span></p>
                  <div class="content-rates">
                      <!-- <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                      <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                      <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                      <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                      <img src="~/assets/images/icons/star_lg_outline.svg" alt="star_lg_outline"> -->
                      <StarsRatings :star-size="20" :read-only="true" :rating="productDetails.rate" :rtl="getLocales"/>
                      <span class="rate-num">({{productDetails.num_users_rate}})</span>
                  </div>
                </div>
              </div>
              <div class="middle-content">
                <div class="content-quantity">
                  <span class="text">QTY</span>
                  <div class="counter">
                    <button class="count-btn" type="button" @click.prevent="decreaseCounter()">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M5 11h14v2H5z"></path></svg>
                    </button>
                    <span class="counter-text">{{counter}}</span>
                    <button class="count-btn" type="button" @click.prevent="increaseCounter()">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
                    </button>
                    <button class="add-btn" type="button" @click.prevent="addProductToCart()">ADD TO CART</button>
                  </div>
                </div>
                <div class="content-share">
                  <ul class="list-style">
                    <li class="list">
                      <button class="list-btn">
                        <img src="~/assets/images/icons/share.svg" alt="share">
                        Share Product
                      </button>
                    </li>
                    <li class="list">
                      <button class="list-btn" @click.prevent="addRemoveFavourite(productDetails.id)">
                        <img src="~/assets/images/icons/favorite.svg" alt="share">
                        Add To Wishalist
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="bottom-content">
                <div class="content-info">
                  <div class="profile-img">
                    <img :src="productStore.logo" alt="profile">
                  </div>
                  <div class="profile-info">
                    <nuxt-link :to="localePath({path: '../store', query: {store_id: productStore.id , page: 1}})" class="name">{{productStore.name}}</nuxt-link>
                    <p class="location">
                      <img src="~/assets/images/icons/pin.svg" alt="pin">
                      {{productStore.full_address}} &nbsp&nbsp&nbsp ( {{productStore.address}} , {{productStore.city}} )
                    </p>

                  </div>
                </div>
                <!-- <div class="social">
                  <ul class="list-style">
                    <li class="list">
                      <a href="#">
                        <img src="~/assets/images/icons/store_insta.svg" alt="store_insta">
                      </a>
                    </li>
                    <li class="list">
                      <a href="#">
                        <img src="~/assets/images/icons/store_facebook.svg" alt="store_facebook">
                      </a>
                    </li>
                    <li class="list">
                      <a href="#">
                        <img src="~/assets/images/icons/store_twitter.svg" alt="store_twitter">
                      </a>
                    </li>
                    <li class="list">
                      <a href="#">
                        <img src="~/assets/images/icons/store_whatsapp.svg" alt="store_whatsapp">
                      </a>
                    </li>
                  </ul>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="single-product-bottom">
        <tabs>
          <tab name="Descriptions" :selected="true">
            <div class="product-description">
              <p class="product-desc">
                {{productDetails.desc}}
              </p>
              <ul class="list-style">
                <li class="list">
                  <p class="list-title">Product Number</p>
                  <p class="list-sub-title">{{productDetails.id}}</p>
                </li>
                <!-- <li class="list">
                  <p class="list-title">Size</p>
                  <p class="list-sub-title">Large</p>
                </li> -->
                <li class="list">
                  <p class="list-title">Weight</p>
                  <p class="list-sub-title">{{productDetails.weight}} Cm</p>
                </li>
                <!-- <li class="list">
                  <p class="list-title">Height</p>
                  <p class="list-sub-title">24 Cm</p>
                </li>
                <li class="list">
                  <p class="list-title">Weight</p>
                  <p class="list-sub-title">0.5 Kilogram</p>
                </li> -->
              </ul>
            </div>
          </tab>
          <tab name="Ratings & Review">
            <div class="product-rating">
              <ul class="list-style" v-for="item in productReview" :key="item.id">
                <li class="list">
                  <div class="list-header">
                    <p class="header-title">{{item.user_name}}</p>
                    <div class="header-rating">
                      <StarsRatings :star-size="20" :read-only="true" :rating="item.rate" :rtl="getLocales"/>
                      <!-- <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                      <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                      <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                      <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                      <img src="~/assets/images/icons/star_lg_outline.svg" alt="star_lg_outline"> -->
                    </div>
                  </div>
                  <p class="list-desc">{{item.review}}</p>
                  <p class="list-time">{{CreateAtDate(item.created_at)}} &nbsp {{CreateAtTime(item.created_at)}}</p>
                </li>

              </ul>
            </div>
          </tab>
        </tabs>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeaderPage from '~/components/shared/TheHeaderPage.vue'
import tabs from "~/components/products/tabs.vue"
import tab from "~/components/products/tab.vue"
import TheGallery from "~/components/products/TheGallery.vue"
  export default {
    components: { TheHeaderPage, tabs, tab, TheGallery },
    data() {
      return {
        id: this.$route.params.id,
        productId: this.$route.query.id,
        productDetails: {},
        productStore: {},
        category: {},
        productReview: [],
        counter: 0,
        again: true,
        // photos: [
        //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/lordea-home-01-min.jpg',
        //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/lordea-home-02-min.jpg',
        //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/lordea-home-03-min.jpg',
        //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/lordea-home-04-min.jpg',
        //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/lordea-home-05-min.jpg',
        //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/lordea-home-06-min.jpg'
        // ]
        photos:[]
      }
    },
    mounted() {
      this.getProductDetails()

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
      priceCal(price , dis){
        const xPrice = price/100;
        const priceAfter = price - (dis * xPrice);
        return priceAfter.toFixed(2)
      },
      CreateAtDate(create_at){
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const date = create_at.split('.')[0].split('T')[0]

        const d = new Date(`${date}`);
        const month = months[d.getMonth()];
        const last = `${d.getDate()}, ${month}, ${d.getFullYear()}`
        return last
      },
      CreateAtTime(create_at){

        const time = create_at.split('.')[0].split('T')[1]

        const timeHour = time.slice(0, 2);
        const timeMinSec = time.slice(2);
        // const last = "";
        if(timeHour > 12){
          const last = `${timeHour - 12}${timeMinSec} PM`
          return last
        }else{
          const last = `${timeHour}${timeMinSec} AM`
          return last
        }
      },
      increaseCounter() {
        this.counter++;
      },
      decreaseCounter() {
        if (this.counter > 0) {
          this.counter--;
        } else {
          return false
        }
      },
      async getProductDetails(){
        await this.$axios.get(`home/getProductDetails?product_id=${this.productId}`).then((res)=> {

          if (res?.data?.status && res?.data?.data) {
            console.log(res.data.data)
            // console.log(res.data)

            this.productDetails = res.data.data
            this.productStore = res.data.data.store
            this.productReview = res.data.data.reviews
            this.photos = res.data.data.images
            console.log(res.data.data.images[0].img)

            this.$axios.get(`categories/getCategory/${res.data.data.store.category_id}`).then((res)=> {

              if (res?.data?.status && res?.data?.data[0]) {
                this.category = res.data.data[0]
                // console.log("category",res.data.data[0])
              }
            })
          }
        })
      },
      addRemoveFavourite(id){
        console.log(id)
        const isLoggedIn = this.$auth.$storage.getUniversal("logged_In")
        if(isLoggedIn){
          // console.log(isLoggedIn)
        this.$Api.user.addRemoveProductFavourite(id).then((res)=> {
            this.isloading = false
            if (res?.data?.status) {
              if(res.data.data.user_liked){
              this.$toast.fire({
                title: 'Add Product!',
                text: `${res.data.message}`,
                icon: 'success',
                confirmButtonText: 'Cool',
                width:'32em',
                // padding:'0 0 1.25em'
              })
              }else{
                this.$toast.fire({
                title: 'remove Product!',
                text: `${res.data.message}`,
                icon: 'info',
                confirmButtonText: 'Cool',
                width:'30em',
                // padding:'0 0 1.25em'
              })
              }
            }
        })
        }
      },
      addProductToCart(){
        // console.log(this.counter)
        if(this.counter == 0){
          this.$toast.fire({
            title: 'Note',
            text: `Please add Qty`,
            icon: 'info',
            confirmButtonText: 'Cool',
            width:'30em',
            // padding:'0 0 1.25em'
          })
        }else{

          if(this.again){
            const payload = `product_id=${this.productDetails.id}&qty=${this.counter}`
            this.$Api.user.addProductToCart(payload).then((res)=> {
              this.isloading = false
              if (res?.data?.status) {
                this.$toast.fire({
                  title: 'Add In Cart!',
                  text: `${res.data.message}`,
                  icon: 'success',
                  confirmButtonText: 'Cool',
                  width:'32em',
                  // padding:'0 0 1.25em'
                })
              }
            })
            this.again = false
          }else{
            this.$toast.fire({
              title: 'Note',
              text: `Added in Cart`,
              icon: 'info',
              confirmButtonText: 'Cool',
              width:'30em',
              // padding:'0 0 1.25em'
            })
          }



        }
        // console.log(this.productDetails.id)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
