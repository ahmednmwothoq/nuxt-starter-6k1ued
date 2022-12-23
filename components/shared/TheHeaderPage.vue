<template>
  <div class="page-header">
    <div class="container">
    <div v-if="category">
      <nuxt-link :to="localePath('/')" class="header-link">{{$t("home")}}</nuxt-link>  <span class="sub-link" ><img src="~/assets/images/icons/next.svg" alt="next"> {{getLocales ? category.name_ar : category.name_en}}</span>
    </div>
    <div v-else-if="title">
      <nuxt-link :to="localePath('/')" class="header-link">{{$t("home")}}</nuxt-link>  <span class="sub-link" ><img src="~/assets/images/icons/next.svg" alt="next">  {{title}}</span>
    </div>
    <div v-else>
      <nuxt-link :to="localePath('/')" class="header-link">{{$t("home")}}</nuxt-link>  <span class="sub-link" ><img src="~/assets/images/icons/next.svg" alt="next"></span>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      category: {
        type: Object,
        required: false
      },
      title: {
        type: String,
        required: false
      }
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
  }
</script>

<style lang="scss" scoped>
.page-header {
  background-color: #F6F6F7;
  padding: 10px 0;
  .header-link {
    font-weight: bold;
    color: #800000;
    margin-right: 5px;
  }
  .sub-link {
    color: #333333;
    text-transform: capitalize;
    img {
      width: 6px;
      margin-right: 5px;
    }
  }
}
</style>
