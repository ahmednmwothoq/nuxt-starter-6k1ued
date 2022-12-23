<template>
  <div class="card" >
    <nuxt-link :to="localePath('/')">
      <img class="card-img-top" loading="lazy" :src="item.images[0].img" alt="Card image cap">
    </nuxt-link>
    <div class="card-body">
      <div class="card-stars">
        <StarsRatings :star-size="20" :read-only="true" :rating="item.rate" :rtl="availableLocale"/>
        <span class="stars-count">({{item.num_users_rate}})</span>
      </div>
      <h5 class="card-title">
        <nuxt-link :to="localePath('/')">
          {{item.name}}
        </nuxt-link>
      </h5>
      <div class="card-body-bottom cflex mt-2">
        <p class="card-price" v-if="item.sale_price">{{item.sale_price}} SAR <span v-if="item.discount" class="card-discount">{{item.regular_price}} SAR</span><span class="discount-percent">{{item.discount}}%</span></p>
        <p class="card-price" v-else>{{item.regular_price}} SAR<span v-if="item.discount" class="discount-percent">{{item.discount}}%</span></p>
      </div>
    </div>
    <nuxt-link :to="localePath({path: '/supplier/product/edit', query: {id: item.id}})">
      <button type="button" class="edit-card-btn">
        <img src="~/assets/images/icons/edit.svg" alt="edit">
      </button>
    </nuxt-link>


    <button type="button" class="delete-card-btn" @click.prevent="deleteProductSupplier()">
      <img src="~/assets/images/icons/delete_white.svg" alt="delete" />
    </button>


  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    }
    ,
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
      async deleteProductSupplier () {
        // console.log()

        await this.$Api.supplier.DeleteProductFromStore(this.item.id).then((res) => {
          if (res?.data?.status ) {
            this.$router.push('/supplier/manage-products')
            this.$toast.fire({
              title: 'Success',
              text: `${res.data.message}`,
              icon: 'success',
              confirmButtonText: 'Cool',
              width:'40em'
            })
            this.$emit("reloadPageData", true)
          }
        }).catch((err) => console.log(err))
      }
    }
  }
</script>

<style lang="scss" scoped>
.delete-card-btn{
  border-radius: 50%;
  border: none;
  width: 40px;
  height: 40px;
  background-color: #c33434;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
