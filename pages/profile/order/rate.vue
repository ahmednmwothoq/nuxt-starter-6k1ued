<template>
  <div class="rate-order">
    <the-header-page :title="`Order #2015356`"/>
    <form @submit.prevent="rateOrder">
      <div class="rate-content">
        <div class="container">
          <div class="rate-box">
            <p class="rate-title">How Would You Rate This Product *</p>
            <div class="rate">
              <p class="title">Tap On The Stars To Choose</p>
              <the-star-rating value="0"/>
            </div>
          </div>

          <div class="rate-box">
            <p class="rate-title">Leave A Comment</p>
            <div class="rate">
              <textarea v-model="comment" cols="30" rows="10" placeholder="Tell Us More About Your Experience With The Product" class="rate-input"></textarea>
            </div>
          </div>
          <button class="rate-btn" type="submit">submit review</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import TheStarRating from '~/components/order/TheStarRating.vue';
import TheHeaderPage from '~/components/shared/TheHeaderPage.vue'
  export default {
    components: {
      TheHeaderPage,
        TheStarRating
    },
    data() {
      return {
        comment: ''
      }
    },
    methods: {
      rateOrder() {
        console.log(this.comment);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
