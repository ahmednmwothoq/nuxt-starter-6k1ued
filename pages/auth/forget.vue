<template>
  <div class="auth-page">
    <template v-if="step == 1">
      <the-header-page :title="`Forget Password (Step 1 Of 3) User`"/>
      <div class="container pt-5 pb-5">
        <div class="row">
          <div class="col-lg-6">
            <div class="auth-content">
              <div class="auth-header">
                <p class="sub-title">{{ $t('have_account') }}</p>
              </div>
              <div class="mt-5">
                <div class="form-group" :class="{errorBorder: validMsg}">
                  <input type="number" :placeholder="$t('phone')" v-model="form.phone" class="custome-input">
                  <span v-if="validMsg" class="error-msg">Please, Enter Valid phone</span>
                </div>
                <button class="auth-btn" type="button" @click.prevent="addEmail" v-if="!isloading">{{ $t('next') }}</button>
                <button class="auth-btn" type="button" disabled v-else>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="auth-img">
              <img src="~/assets/images/icons/img3.svg" alt="img3">
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="step == 2">
      <the-header-page :title="`Verification Code (Step 2 Of 3)`"/>
      <div class="container pt-5 pb-5">
        <div class="row">
          <div class="col-lg-6">
            <div class="auth-content">
              <div class="auth-header">
                <p class="sub-title">Please Enter Your code To Reset Password</p>
              </div>
              <div class="mt-5">
                  <div class="form-content verify-content mb-4">
                      <input type="text" class="input-foucs" :placeholder="$t('input_code')" v-model="code"/>
                  </div>

                <div class="email-address mb-4">
                  <p class="title">{{ $t('phone') }}</p>
                  <p class="sub-title">{{form.phone}}</p>
                </div>
                <button class="auth-btn" type="button" @click.prevent="verify" v-if="!isloading">{{ $t('verify') }}</button>
                <button class="auth-btn" type="button" disabled v-else>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </button>
                <div class="resend-code mt-4">
                  <p class="text">Did Not Receive The Code?</p>
                  <p class="counter">00:59</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="auth-img">
              <img src="~/assets/images/icons/img3.svg" alt="img3">
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="step == 3">
      <the-header-page :title="`Reset Password (Step 3Of 3)`"/>
      <div class="container pt-5 pb-5">
        <div class="row">
          <div class="col-lg-6">
            <div class="auth-content">
              <div class="auth-header">
                <p class="sub-title">Please Enter Your Registered Email Address To Reset Password</p>
              </div>
              <div class="mt-5">
                <div class="form-group">
                  <input type="password" :placeholder="$t('password')" v-model="password" class="custome-input" autocomplete="off">
                </div>
                <div class="form-group">
                  <input type="password" :placeholder="$t('confirm_password')" v-model="password_confirmation" class="custome-input" autocomplete="off">
                </div>
                <button class="auth-btn mt-4" type="submit" v-if="!isloading" @click="resetPass">{{ $t('reset_password') }}</button>
                <button class="auth-btn mt-4" type="button" disabled v-else>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="auth-img">
              <img src="~/assets/images/icons/img3.svg" alt="img3">
            </div>
          </div>
        </div>
      </div>
    </template>

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
        code: '',
        password: '',
        password_confirmation: '',
        isloading: false,
        countDown : 10,
        step: 1,
        token: '',
        form: {
          email: '',
        },
        validMsg: false,
      }
    },
    computed: {
        validEmail() {
          let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          if (emailRegex.test(this.form.email)) {
              return true;
          } else {
            return false
          }
        },
        validPhone() {
          let mobileRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
          if (mobileRegex.test(this.form.phone)) {
              return true;
          } else {
            return false
          }
        },
    },
    watch: {
        showModel: function (val) {
          if (val) {
            setTimeout(() => {
              this.showModel = false
            }, 2000);
          }
        },
    },
    methods: {
      async addEmail() {
        console.log(this.form.phone);
        const formData = new FormData();
        formData.append("phone", this.form.phone);
        await this.$Api.authUser.requestPasswordReset(formData).then((res) => {
          if (res?.data?.status ) {
            this.$toast.fire({
               title: 'Success',
               text: `${res.data.message}`,
               icon: 'success',
               confirmButtonText: 'Cool',
               width:'40em'
            })
          }
        })

        this.step = 2
      },
      async verify() {
        console.log(this.code);

        const formData = new FormData();
        formData.append("phone", this.form.phone);
        formData.append("reset_code", this.code);
        await this.$Api.authUser.createTokenResetPassword(formData).then((res) => {
          if (res?.data?.status ) {
            this.$toast.fire({
               title: 'Success',
               text: `${res.data.message}`,
               icon: 'success',
               confirmButtonText: 'Cool',
               width:'40em'
            })
          }
        })
        this.step = 3
      },
      async resetPass() {
        console.log(this.password);
        console.log(this.password_confirmation);

        const formData = new FormData();
        formData.append("new_password", this.password);
        await this.$Api.authUser.resetPassword(formData).then((res) => {
          if (res?.data?.status ) {
            this.$toast.fire({
               title: 'Success',
               text: `${res.data.message}`,
               icon: 'success',
               confirmButtonText: 'Cool',
               width:'40em'
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
