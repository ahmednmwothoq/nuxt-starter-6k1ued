<template>
<div class="content statistics-content">
  <div class="statistics-filter">
    <p class="title">Filter Your Statistics</p>
    <form @submit.prevent="filterStatistics">
      <div class="form-row">
        <div class="col-lg-8 col-md-8 col-12 mb-3">
          <client-only>
            <VueDatePicker
              v-model="date"
              placeholder="From date - To date"
              :color="color"
              :locale="locale"
              fullscreen-mobile
              range
              validate/>
          </client-only>
        </div>
        <div class="col-lg-4 col-md-4 col-12 mb-3">
          <button type="submit" class="filter-btn">filter</button>
        </div>
      </div>
    </form>
  </div>
  <div class="statistics">
    <div class="box">
        <p class="box__title">Merchandise Count</p>
        <p class="box__count">{{statistics.total_merchandise}} merchandise</p>
    </div>
    <div class="box">
        <p class="box__title">Products Almost Out Stock</p>
        <p class="box__count">{{statistics.products_almost_out_stock}} product</p>
    </div>
    <div class="box">
        <p class="box__title">Pending Requests</p>
        <p class="box__count">{{statistics.pending_requests}} request</p>
    </div>
    <div class="box">
        <p class="box__title">Confirmed Requests</p>
        <p class="box__count">{{statistics.confirmed_requests}} request</p>
    </div>
  </div>
</div>
</template>


<script>
  export default {
    layout: 'supplierDash',
    data() {
      return {
        date: new Date(),
        color: '#800000',
        locale: { lang: 'en' },
        statistics: {},
        /* locale: {
          lang: {
            name: 'ar',
            weekdays: 'الاحد_الاتنين_الثلاثاء_الاربعاء_الخميس_الجمعة_السبت'.split('_'),
            weekdaysShort: 'الاحد_الاتنين_الثلاثاء_الاربعاء_الخميس_الجمعة_السبت'.split('_'),
            weekStart: 1,
            months: 'يناير_فبراير_مارس_ابريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_اكتوير_نوفمير_ديسمبر'.split('_'),
            monthsShort: 'يناير_فبراير_مارس_ابريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_اكتوير_نوفمير_ديسمبر'.split('_'),
            formats: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm',
              },
            ordinal: n => `${n}º`,
            buttonCancel: 'الغاء',
            buttonValidate: 'موافق',
            rangeHeaderText: 'من %d الى 13', getSupplierStatistics
          }
        }, */
      }
    },
    mounted() {
      this.getSupplierStatisticsData()
    },
    methods: {
      async getSupplierStatisticsData() {
        await this.$Api.supplier.getSupplierStatistics().then((res) => {
          if (res?.data?.status ) {
            this.statistics = res.data.data
          }
        })
      },
      filterStatistics() {
        console.log("sss",this.date);
      }
    },
  }
</script>
<style lang="scss" scoped>

</style>
