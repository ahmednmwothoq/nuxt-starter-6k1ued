<template>
  <div class="custome-page terms">
    <the-header-page :title="`Terms & Conditions`"/>
    <div class="container">
      <div class="custome-content">
        <p class="title">Terms & Conditions</p>
        <div class="content">
          <p class="desc">{{ getLocales ? terms.terms_ar : terms.terms_en}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeaderPage from '~/components/shared/TheHeaderPage.vue'
  export default {
  components: { TheHeaderPage },
  data() {
    return {
      terms : {}
    }
  },
  mounted() {
    this.getTerms()

    // console.log(this.$route.fullPath.split('store?')[1])
  },
  computed: {
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
    async getTerms(){
      await this.$axios.get(`settings/terms`).then((res)=> {

        if (res?.data?.status && res?.data?.data) {
          this.terms = res.data.data
        }
        // console.log(res.data.data)
      }).catch(({ response }) => {
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
              icon: 'error',
              confirmButtonText: 'Cool'
            })
        }
      })
    }
  },

  }
</script>

<style lang="scss" scoped>

</style>
