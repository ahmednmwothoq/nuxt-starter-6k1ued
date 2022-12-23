<template>
  <div class="auth-page">
    <the-header-page :title="availableLocales ? `تسجيل الدخول كمستخدم` : `Login As User`"/>
    <div class="container pt-5 pb-5">
      <div class="row">
        <div class="col-lg-6 pt-5 mb-3">
          <div class="auth-content">
            <div class="auth-header">
              <p class="title">{{ $t('auth_welcome') }}!</p>
              <p class="sub-title">{{ $t('sub_auth_welcome') }}</p>
            </div>
            <the-login :user="user" @signUp="signUp"/>
            <p class="content-bottom mt-4">{{$t('havent_account')}}<nuxt-link :to="localePath('/auth/register')">{{ $t('sign_up') }}</nuxt-link></p>
            <p class="content-bottom mt-1">
            <nuxt-link :to="localePath('/auth/loginSupplier')">{{availableLocales ? `تسجيل الدخول كمورد` : `Login As Supplier`}}</nuxt-link>
            </p>
          </div>
        </div>
        <div class="col-lg-6 pt-5 mb-3">
          <div class="auth-img">
            <img src="~/assets/images/icons/img2.svg" alt="img2">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeaderPage from '~/components/shared/TheHeaderPage.vue'
import TheLogin from '~/components/form/TheLogin.vue'
import login from "~/mixins/login";
  export default {
    middleware: 'loggedInUser',
    components: {
      TheHeaderPage,
      TheLogin
    },
    data() {
      return {
        user:'user'
      }
    },
    mounted() {
      // this.console.log("asdsadsa",this.$api)
      this.gets()
    },
    computed: {
      availableLocales () {
        let local = this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
        if(local[0].code == 'en'){
          return true
        } else {
          return false
        }
      }
    }
    ,
    mixins: [login],
    methods: {
      gets(){
        // console.log("asdsadsa",this.$axios.defaults.baseURL)
      },
      async signUp(event) {
        console.log("login",event);
          this.$auth.loginWith('laravelSanctum', {
              data: event
          })
          .then((res) => {
            if(res?.data?.status){
              this.$store.dispatch("user/addToken", res.data.data.token)
              this.$store.dispatch("user/switchStatus", true)
              this.$store.dispatch("user/addUser", res.data.data)
              this.$store.dispatch("user/addRole", 1)

              setTimeout(() => {
                this.$toast.fire({
                  title: 'Success',
                  text: `${res.data.message}`,
                  icon: 'success',
                  confirmButtonText: 'Cool',
                  width:'40em'
                })
              }, 1000);
              window.location.href = this.localePath("/");
            }else{
              for(var i = 0; i < res.data.errors.length; i++){
                this.$toast.fire({
                  title: `${res.data.message}`,
                  text: `${res.data.errors[i]}`,
                  icon: 'error',
                  confirmButtonText: 'Cool',
                  width:'40em'
                })
              }

            }
          })
          .catch(error => console.log(error))

      },

      getUserData(event) {
        console.log(event);
      },
    }
  }
</script>

<style lang="scss" scoped>
.slide-fade-enter-from {
  transform: translateY(50px);
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 1s ease 5s;
}
.slide-fade-enter-to {
  transform: translateY(0px);
  opacity: 1;
}
.slide-fade-leave-active {
  transition: opacity 1s;
}
.slide-fade-leave-to {
  opacity: 0;
}
</style>
