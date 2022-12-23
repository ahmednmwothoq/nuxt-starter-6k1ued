<template>
  <div class="notitication">
    <p class="notitication__title" v-if="item">{{item.title}}</p>
    <p class="notitication__desc" v-if="item">
      {{ getLocales ? item.body_ar : item.body_en}}
    </p>
    <p class="notitication__time" v-if="item">{{item.created_at}}</p>
  </div>
</template>

<script>
  export default {
    props:{
      item: {
        type: Object,
        required: true
      }
    }
    ,
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

</style>
