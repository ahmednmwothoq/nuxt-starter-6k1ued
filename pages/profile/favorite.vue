<template>
  <div class="content favorite-content">
    <div class="row">
      <div class="col-lg-6 col-md-12 col-12 mb-3"  v-for="item in favourites" :key="item.id">
        <div class="card">
          <nuxt-link :to="localePath({name: 'products', query: {id: item.id}})">
            <img class="card-img-top" :src="item.images[0].img" :alt="item.name">
          </nuxt-link>
          <div class="card-body">
            <div class="card-stars">
              <StarsRatings :star-size="20" :read-only="true" :rating="item.rate" :rtl="availableLocale"/>
              <span class="stars-count">({{item.num_users_rate}})</span>
            </div>
            <h5 class="card-title"><nuxt-link :to="localePath({name: 'products', query: {id: item.id}})">{{item.name}}</nuxt-link></h5>
            <div class="card-body-bottom cflex mt-2">
              <p class="card-price" v-if="item.sale_price">{{item.sale_price}} SAR <span v-if="item.discount" class="price-discount">{{item.regular_price}} SAR</span><span class="discount-percent">{{item.discount}}%</span></p>
              <p class="card-price" v-else>{{item.regular_price}} SAR<span v-if="item.discount" class="discount-percent">{{item.discount}}%</span></p>
              <button type="button" class="action-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill: #fff;"><path d="M21 4H2v2h2.3l3.521 9.683A2.004 2.004 0 0 0 9.7 17H18v-2H9.7l-.728-2H18c.4 0 .762-.238.919-.606l3-7A.998.998 0 0 0 21 4z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="16.5" cy="19.5" r="1.5"></circle></svg>
              </button>
            </div>
          </div>
          <button type="button" class="like-card-btn" @click.prevent="addRemoveFavourite(item.id)">
            <img v-if="item.is_favourite" src="~/assets/images/icons/heart.svg"  alt="heart">
            <img v-else src="~/assets/images/icons/heart_outline.svg"  alt="heart_outline">
          </button>
        </div>
      </div>
    </div>

    <vs-pagination
      :total-pages="this.total"
      :page-padding="1"
      :current-page="this.pageNo"
      @change="changePage"
    ></vs-pagination>
  </div>
</template>


<script>
  export default {
    layout: 'userDash',
    data() {
      return {
        favourites: null,
        container: null,
        pageNo: 1,
        total: 1,
      }
    },
  mounted() {
    // console.log(this.topRatedProducts)
    this.getProductsFavourites()
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
      async getProductsFavourites(){
        const payload = `page=${this.pageNo}`

        await this.$Api.user.getAllProductFavourite(payload).then((res)=> {
            this.isloading = false
            if (res?.data?.status) {
              this.container = res.data.data
              this.favourites = res.data.data.products
            }
            if(res.data.data.has_more){
              this.increaseTotal()
            }
        })
      },
      changePage(p) {
        // console.log(p);
        this.pageNo = p;
        this.getProductsFavourites()
      },
      increaseTotal(){
        this.total = this.total + 1
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
              this.getProductsFavourites()
              }
              else{
                this.$toast.fire({
                  title: 'remove Product!',
                  text: `${res.data.message}`,
                  icon: 'info',
                  confirmButtonText: 'Cool',
                  width:'30em',
                  // padding:'0 0 1.25em'
                })
                this.getProductsFavourites()
              }
            }
        })
        }
      }
    },
  }
</script>
<style lang="scss" scoped>

</style>
