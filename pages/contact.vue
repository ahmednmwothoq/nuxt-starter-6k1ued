<template>
  <div class="contact">
    <the-header-page :title="`Contact Us`"/>
    <div class="container">
      <div class="contact-content">
        <form @submit.prevent="contact">
          <div class="form-row">
            <div class="form-group col-lg-6 col-md-6 col-12">
              <input type="text" placeholder="Full Name *" v-model="form.fullName" class="custome-input">
            </div>
            <div class="form-group col-lg-6 col-md-6 col-12">
              <input type="email" placeholder="Email Address *" v-model="form.email" class="custome-input">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-lg-6 col-md-6 col-12">
              <input type="number" placeholder="Phone Number *" v-model="form.phone" class="custome-input">
            </div>
            <div class="form-group col-lg-6 col-md-6 col-12">
              <input type="text" placeholder="Subject *" v-model="form.subject" class="custome-input">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-lg-12">
              <textarea cols="30" rows="5" class="custome-input" v-model="form.message" placeholder="Message"></textarea>
            </div>
          </div>
          <button class="contact-btn" type="submit">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeaderPage from '~/components/shared/TheHeaderPage.vue'
  export default {
    components: {
      TheHeaderPage
    },
    data() {
      return {
        form: {
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        }
      }
    },
    methods: {
      contact() {
        console.log(this.form);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
