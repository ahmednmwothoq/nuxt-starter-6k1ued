<template>
  <div class="auth-page">
    <template v-if="step == 1">
      <the-header-page :title="$t('sign_up')"/>
      <div class="container">
        <div class="tabs-header">
          <button type="button" class="auth-reg-btn" :class="{ active: regType == 'user' }" @click="changeType('user')">{{ $t("user") }}</button>
          <button type="button" class="auth-reg-btn" :class="{ active: regType == 'supplier' }" @click="changeType('supplier')">{{ $t("supplier") }}</button>
        </div>
        <div class="row">
          <div class="col-lg-7 col-md-6 col-12 mb-5">
            <div class="auth-content">
              <div class="auth-header">
                <p class="title">{{ $t('auth_welcome') }}!</p>
                <p class="sub-title">{{ $t('sub_auth_welcome') }}</p>
              </div>
              <the-user-register v-if="regType == 'user'" @register="register" @wrongData="wrongData" :errors="errors"/>
              <the-supplier-register v-if="regType == 'supplier'" @supplierRegister="supplierRegister" @wrongData="wrongData" :supplierErrors="supplierErrors" :citiesAreas="citiesAreas" :categories="categories" />
              <p class="content-bottom mt-4">{{$t('have_account')}}<nuxt-link :to="localePath('/auth/login')">{{ $t('sign_in') }}</nuxt-link></p>
            </div>
          </div>
          <div class="col-lg-5 col-md-6 col-12 mb-5">
            <div class="auth-img">
              <img src="~/assets/images/icons/img1.svg" alt="img1">
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="step == 2">
      <the-header-page :title="`Verification Code`"/>
      <div class="container pt-5 pb-5">
        <div class="row">
          <div class="col-lg-6">
            <div class="auth-content">
              <div class="auth-header">
                <p class="sub-title">Please Enter Your Verification code To Activate Account</p>
              </div>
              <div class="mt-5">
                  <div class="form-content verify-content mb-4">
                      <input type="text" class="input-foucs" :placeholder="$t('input_code')" v-model="verifyUserForm.codeUser"/>
                  </div>

                <div class="email-address mb-4">
                  <p class="title">{{ $t('email') }}</p>
                  <p class="sub-title">{{verifyUserForm.email}}</p>
                </div>
                <button class="auth-btn" type="button" @click.prevent="verifyEmailUser" v-if="!isloading">{{ $t('verify') }}</button>
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


    <template v-if="stepSupplier == 2">
      <the-header-page :title="`Verification Code`"/>
      <div class="container pt-5 pb-5">
        <div class="row">
          <div class="col-lg-6">
            <div class="auth-content">
              <div class="auth-header">
                <p class="sub-title">Please Enter Your Verification code To Activate Account</p>
              </div>
              <div class="mt-5">
                  <div class="form-content verify-content mb-4">
                      <input type="text" class="input-foucs" :placeholder="$t('input_code')" v-model="verifySupplierForm.codeUser"/>
                  </div>

                <div class="email-address mb-4">
                  <p class="title">{{ $t('email') }}</p>
                  <p class="sub-title">{{verifySupplierForm.email}}</p>
                </div>
                <button class="auth-btn" type="button" @click.prevent="verifyEmailSupplier" v-if="!isloading">{{ $t('verify') }}</button>
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


    <transition appear name="slide-fade">
      <the-alert :text="errorMsg.text" :msg="errorMsg.msg" v-if="showModel" @close="showModel = false"/>
    </transition>
  </div>
</template>

<script>
import TheUserRegister from '~/components/form/TheUserRegister.vue'
import TheSupplierRegister from '~/components/form/TheSupplierRegister.vue'
import TheHeaderPage from '~/components/shared/TheHeaderPage.vue'
import TheAlert from '~/components/alert/TheAlert.vue';
  export default {
    middleware: 'loggedInUser',
    components: {
      TheHeaderPage,
      TheUserRegister,
      TheSupplierRegister,
      TheAlert
    },
    data() {
      return {
        regType: 'user',
        showModel: false,
        step: 1,
        stepSupplier: 1,
        TokenUser: null,
        TokenUserBearer: null,

        TokenSupplier: null,
        TokenSupplierBearer: null,

        verifyUserForm: {
          email: '' ,
          codeUser: ''
        },

        verifySupplierForm: {
          email: '' ,
          codeUser: ''
        },
        errorMsg: {
          text: '',
          msg: ''
        },
        errors: {},
        citiesAreas: {},
        categories: [],
        supplierErrors: {}
      }
    },
    watch: {
      showModel: function (val) {
        if (val) {
          setTimeout(() => {
            this.showModel = false
          }, 4000);
        }
      },
      errors: function (val) {
        if (val) {
          setTimeout(() => {
            this.errors = {}
          }, 4000);
        }
      },
      supplierErrors: function (val) {
        if (val) {
          setTimeout(() => {
            this.supplierErrors = {}
          }, 4000);
        }
      },
    },
    mounted() {
      // this.$axios.$get("/sanctum/csrf-cookie");
      // const url = this.$axios.defaults.baseURL.replace("/api", "");
      // this.$axios.get(`${url}/sanctum/csrf-cookie`)
      // console.log(this.$axios.defaults.baseURL ,url)
      this.getCitiesHaveAreas()
      this.getAllCategoriesFun()
    },
    methods: {
      changeType(e) {
        this.regType = e
      },
      async getCitiesHaveAreas(){
        await this.$Api.general.getCitiesHaveAreasEdit().then((res)=> {
            this.isloading = false
            if (res?.data?.status) {
              this.citiesAreas = res.data.data
            }
        })
      },
      async getAllCategoriesFun(){
        await this.$Api.general.getAllCategories().then((res)=> {
            this.isloading = false
            if (res?.data?.status) {
              this.categories = res.data.data
            }
        })
      },
      wrongData() {
          this.errorMsg.text = "your data is wrong"
          this.errorMsg.msg = "error"
          this.showModel = true
      },
      async supplierRegister(event) {
        console.log(event);
        try {
          await this.$Api.authSupplier.registerSupplier(event).then((res)=> {
            this.isloading = false
            if (res?.data?.status) {
              // this.$router.push(this.localePath("/auth/login"));
              const token = res.data.data.token.split('|')[1]
              this.TokenSupplier = token
              this.TokenSupplierBearer = res.data.data.token
              this.verifySupplierForm.email = event.get("email")

              console.log("TokenSupplier",this.TokenSupplier)
              console.log("TokenSupplierBearer",this.TokenSupplierBearer)

              this.$toast.fire({
                title: 'Register !',
                text: `${res.data.message}`,
                icon: 'success',
                confirmButtonText: 'Cool',
                width:'40em'
              })

              this.stepSupplier = 2
              this.step = 0
            }
            console.log("response step 1",res.data)
          })
        }
        catch (err) {
          this.isloading = false;
        }
      },
      async register(event) {
        console.log(event);
        // await this.$Api.user.getUserOrderDetails(payload)
        try {
          await this.$Api.authUser.registerUser(event).then((res)=> {
            this.isloading = false
            if (res?.data?.status) {
              // this.$router.push(this.localePath("/auth/login"));
              const token = res.data.data.token.split('|')[1]
              this.TokenUser = token
              this.TokenUserBearer = res.data.data.token
              this.verifyUserForm.email = event.email

              console.log("TokenUser",this.TokenUser)
              console.log("TokenUserBearer",this.TokenUserBearer)

              this.$toast.fire({
                title: 'Register !',
                text: `${res.data.message}`,
                icon: 'success',
                confirmButtonText: 'Cool',
                width:'40em'
              })

              this.step = 2
            }
            console.log("response step 1",res.data)
          })
        }
        catch (err) {
          this.isloading = false;
        }
        // console.log(event);

      },
      async verifyEmailUser(){
        try {

          const payload = {
            code : this.verifyUserForm.codeUser,
            device_type : "0",
            firebase_token : this.TokenUser,
          }
          const headers = {
            // withCredentials: true,
            headers: {
              "Authorization": `${this.TokenUserBearer}`
            }
          }

          await this.$Api.authUser.activeAccount(payload , headers).then((res)=> {
            this.isloading = false
            if (res?.data?.status) {
              this.$store.dispatch("user/addToken", this.TokenUserBearer)
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
                window.location.href = this.localePath("/profile/general-info");
              }, 1000);

            }
            console.log("response step 2",res.data)
          })
        }
        catch (err) {
          this.isloading = false;
          this.step = 2
        }

      },
      async verifyEmailSupplier(){
        try {

          const payload = {
            code : this.verifySupplierForm.codeUser,
            device_type : "0",
            firebase_token : this.TokenSupplier,
          }
          // const url = this.$axios.defaults.baseURL.replace("/api", "");
          // this.$axios.get(`${url}/sanctum/csrf-cookie`)
          const headers = {
            // withCredentials: true,
            headers: {
              "Authorization": `${this.TokenSupplierBearer}`
            }
          }

          // this.$auth.loginWith('laravelSanctum', {
          //     data: event
          // })
          // .then((res) => {})
          // this.$store.dispatch("user/addToken", this.TokenSupplierBearer)
          // this.$store.dispatch("user/switchStatus", true)

          await this.$Api.authSupplier.activeAccount(payload , headers).then((res)=> {
            this.isloading = false
            if (res?.data?.status) {
              this.$store.dispatch("user/addToken", this.TokenSupplierBearer)
              this.$store.dispatch("user/switchStatus", true)
              this.$store.dispatch("user/addSupplier", res.data.data)
              this.$store.dispatch("user/addRole", 2)

              setTimeout(() => {
                this.$toast.fire({
                  title: 'Success',
                  text: `${res.data.message}`,
                  icon: 'success',
                  confirmButtonText: 'Cool',
                  width:'40em'
                })
                window.location.href = this.localePath("/supplier/general-info");
              }, 1000);

            }
            console.log("response step 2",res.data)
          })
        }
        catch (err) {
          this.isloading = false;
          this.stepSupplier = 2
        }

      }
    }
  }

</script>

<style lang="scss" scoped>

</style>
