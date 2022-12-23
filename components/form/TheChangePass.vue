<template>
<div class="content change-pass-content">
  <form @submit.prevent="changePass">
    <div class="form-row">
      <div class="form-group col-lg-6 col-md-6 col-12">
        <input type="password" placeholder="Old Password *" v-model="form.oldPass" class="custome-input" autocomplete="off">
        <span v-if="formErrors && formErrors.new_password" class="error-msg">{{formErrors.new_password[0]}}</span>
      </div>
      <div class="form-group col-lg-6 col-md-6 col-12">
        <input type="password" placeholder="New Password *" v-model="form.newPass" class="custome-input" autocomplete="off">
        <span v-if="(formErrors && formErrors.newPass)" class="error-msg">{{formErrors.newPass}}</span>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-lg-6 col-md-6 col-12">
        <input type="password" placeholder="Confirm New Password *" v-model="form.confPass" class="custome-input" autocomplete="off">
        <span v-if="(formErrors && formErrors.confPass)" class="error-msg">{{formErrors.confPass}}</span>
      </div>
      <div class="form-group col-lg-6 col-md-6 col-12">
        <button class="contact-btn" type="submit">SAVE</button>
      </div>
    </div>
  </form>
</div>
</template>


<script>
import editUserProfile from "~/mixins/editUserProfile";
  export default {
  props: {
    formErrors: {
      type: Object,
      required: true
    }
  },
    mixins: [editUserProfile],
  layout: 'userDash',
    data() {
      return {
        form: {
          oldPass: '',
          newPass: '',
          confPass: ''
        }
      }
    },
    methods: {
      changePass() {
        // const formData = new FormData();
        // formData.append("old_password", this.form.oldPass);
        // formData.append("new_password", this.form.newPass);
        // formData.append("new_password_confirmation", this.form.confPass);

        const payload = {
          old_password : this.form.oldPass,
          new_password : this.form.newPass,
          new_password_confirmation : this.form.confPass,
        }
        this.$emit("updatePassword", payload)
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
