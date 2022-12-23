<template>
  <div class="custome-page about">
    <the-header-page :title="`About Us`"/>
    <div class="container">
      <div class="custome-content">
        <p class="title">
        <!-- {{ $t("about_us") }} -->
        About Us
        </p>
        <div class="content">
          <p class="desc">{{ getLocales ? about.about_us_ar : about.about_us_en}}</p>
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
      about : {}
    }
  },
  mounted() {
    this.getAboutUs()

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
    async getAboutUs(){
      await this.$axios.get(`settings/aboutUs`).then((res)=> {

        if (res?.data?.status && res?.data?.data) {
          this.about = res.data.data

        }else{}
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
              icon: 'warning',
              confirmButtonText: 'Cool'
            })
        }

        // return error({ statusCode: response.status, message: response.data.message})
      })
    }
  },

  }
</script>

<style lang="scss" scoped>

</style>
