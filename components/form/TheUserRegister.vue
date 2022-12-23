<template>
<div class="mt-5">
    <form @submit.prevent="register">
      <div class="form-group">
        <input type="text" :placeholder="$t('full_name')" v-model="form.fullName" class="custome-input">
      </div>

      <div class="form-group" :class="{'errorBorder': formErrors.email}">
        <input type="email" :placeholder="$t('email')" v-model="form.email" class="custome-input">
        <span v-if="formErrors.email" class="error-msg">{{formErrors.email}}</span>
        <span v-if="errors && errors.email" class="error-msg">{{errors.email[0]}}</span>
      </div>

      <div class="form-group" :class="{'errorBorder': formErrors.phone}">
        <input type="number" :placeholder="$t('phone')" v-model="form.phone" class="custome-input">
        <span v-if="formErrors.phone" class="error-msg">{{formErrors.phone}}</span>
        <span v-if="errors && errors.phone_number" class="error-msg">{{errors.phone_number[0]}}</span>
      </div>

      <div class="form-group" :class="{'errorBorder': formErrors.password}">
        <input type="password" id="password" :placeholder="$t('password')" v-model="form.password" class="custome-input" autocomplete="off">
        <span v-if="formErrors.password" class="error-msg">{{formErrors.password}}</span>
        <span v-if="errors && errors.password" class="error-msg">{{errors.password[0]}}</span>
      </div>

      <div class="form-group mb-2" :class="{'errorBorder': formErrors.confPass}">
        <input type="password" id="confirm-password" :placeholder="$t('confirm_password')" v-model="form.confPass" class="custome-input" autocomplete="off">
        <span v-if="formErrors.confPass" class="error-msg">{{formErrors.confPass}}</span>
      </div>

      <div class="mt-3 mb-3 accept-terms">
        <p>
          <input type="checkbox" class="custome-checkbox" id="aterms" v-model="accept" :checked="accept">
          <label for="aterms">{{ $t('accept_terms') }}</label>
        </p>
        <div class="popover__content">
          <nuxt-link :to="localePath('/terms')" class="popover__message">Terms & Conditions</nuxt-link>
        </div>
      </div>
      <button class="auth-btn" type="submit" v-if="!isloading" :disabled="!accept">{{ $t('sign_in') }}</button>
      <button class="auth-btn" type="submit" disabled v-else>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
    </form>
</div>
</template>

<script>
  import register from "~/mixins/register";
  export default {
    props: {
      errors: {
        type: Object,
        required: true
      }
    },
    mixins: [register],
    data() {
      return {
        isloading: false,
        formErrors: [],
        form: {
          fullName: '',
          email: '',
          phone: '',
          password: '',
          confPass: ''
        },
        accept: false
      }
    },
    methods: {
      async register() {
        this.isloading = true;

        // const formData = new FormData();
        // formData.append("name", this.form.fullName);
        // formData.append("email", this.form.email);
        // formData.append("phone", this.form.phone);
        // formData.append("password", this.form.password);
        // formData.append("password_confirmation", this.form.confPass);

        const payload = {
          name: this.form.fullName,
          email: this.form.email,
          phone: this.form.phone,
          password: this.form.password,
        }

        if (this.validForm) {
          this.$emit("register", payload)
          setTimeout(() => {
            this.isloading = false;
          }, 1000);
        } else {
          this.$emit("wrongData")
          this.isloading = false;
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
