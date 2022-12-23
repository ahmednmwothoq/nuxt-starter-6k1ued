<template>
<div class="content change-pass-content">
  <the-change-pass @updatePassword="updatePassword" :formErrors="formErrors"/>
  <transition appear name="slide-fade">
    <the-alert :text="errorMsg.text" :msg="errorMsg.msg" v-if="showModel" @close="showModel = false"/>
  </transition>
</div>
</template>


<script>
import TheChangePass from '~/components/form/TheChangePass.vue';
import TheAlert from '~/components/alert/TheAlert.vue';
  export default {
    layout: 'userDash',
    components: { TheChangePass,TheAlert },
    data() {
      return {
        showModel: false,
        errorMsg: {
          text: '',
          msg: ''
        },
        formErrors: {}
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
      formErrors: function (val) {
        if (val) {
          setTimeout(() => {
            this.formErrors = {}
          }, 4000);
        }
      },
    },
    methods: {
      async updatePassword(event) {
        console.log(event);

        await this.$Api.user.changePassword(event).then((res)=> {
            this.isloading = false
            if (res?.data?.status) {
              this.$toast.fire({
                title: 'Edit Profile !',
                text: `${res.data.message}`,
                icon: 'success',
                confirmButtonText: 'Cool',
                width:'35em',
                // padding:'0 0 1.25em'
              })
            }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
