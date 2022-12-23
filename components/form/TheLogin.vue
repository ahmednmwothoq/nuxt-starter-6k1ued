<template>
  <form @submit.prevent="login" class="mt-5">
    <div class="form-group" :class="{'errorBorder': formErrors.email}">
      <input type="email" :placeholder="$t('email')" v-model="form.email" class="custome-input">
      <span v-if="formErrors.email" class="error-msg">{{formErrors.email}}</span>
    </div>
    <div class="form-group mb-2" :class="{'errorBorder': formErrors.password}">
      <input :type="showPassword ? 'text' : 'password'" :placeholder="$t('password')" v-model="form.password" class="custome-input" autocomplete="off">
      <button class="show-pass-btn" type="button" @click.prevent="showPass">
        <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #A0AEC0;"><path d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z"></path><path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #A0AEC0;"><path d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 0 1 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 0 0 0 .633C2.073 12.383 4.367 19 12 19zm0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 0 0 0-.633C21.927 11.617 19.633 5 12 5zm4.972 10.558-2.28-2.28c.19-.39.308-.819.308-1.278 0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501A9.26 9.26 0 0 1 12 7c5.351 0 7.424 3.846 7.926 5-.302.692-1.166 2.342-2.954 3.558z"></path></svg>
      </button>
      <span v-if="formErrors.password" class="error-msg">{{formErrors.password}}</span>
    </div>
    <nuxt-link v-if="user == 'user'" :to="localePath('/auth/forget')" class="forget-pass mb-3">{{ $t('forget_password') }}</nuxt-link>
    <nuxt-link v-else :to="localePath('/auth/forgetSupplier')" class="forget-pass mb-3">{{ $t('forget_password') }}</nuxt-link>
    <template>
      <button class="auth-btn" type="submit"  v-if="!isloading">{{ $t('sign_in') }}</button>
      <button class="auth-btn" type="submit" disabled v-else>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
      </button>
    </template>
  </form>
</template>

<script>
import login from "~/mixins/login";
  export default {
    props:{
      user: {
        type: String,
        default: false
      }
    },
    data() {
      return {
        login_mode: true,
        isloading: false,
        formErrors: [],
        form: {
          email: '',
          password: ''
        },
        showPassword: false
      }
    },mounted() {
      console.log(Math.random().toString(36).slice(2))
    }
    ,
    mixins: [login],
    methods: {
      showPass() {
        this.showPassword = !this.showPassword;
      },
      async login() {
        this.isloading = true;
        // const formData = new FormData();
        // formData.append("email", this.form.email);
        // formData.append("password", this.form.password);

        const payload ={
          email_or_phone: this.form.email,
          password: this.form.password,
          firebase_token: Math.random().toString(36).slice(2),
          device_type: "0",
        }


        if (this.validForm) {
          this.$emit("signUp", payload)
          setTimeout(() => {
            this.isloading = false;
          }, 2000);
        } else {
          setTimeout(() => {
            this.isloading = false;
          }, 1500);
        }
      },

    }
  }
</script>

<style lang="scss" scoped>

</style>
