<template>
    <div class="content profile-info-content">
      <the-general-info :userData="userData" @editProfile="editProfile" />
    </div>
</template>


<script>
import TheGeneralInfo from '~/components/form/TheGeneralInfo.vue'
  export default {
    layout: 'userDash',
    components: { TheGeneralInfo  },
    data() {
      return {
        userData: {}
      }
    },mounted() {
      this.getUserData()
    },
    methods: {
      async getUserData() {
        await this.$Api.user.getUser().then((res) => {
          if (res?.data?.status ) {
            // this.user = res.data.userData
            this.userData = res.data.data
          }
        })
      },
      async editProfile(event) {

        await this.$Api.user.updateProfileUser(event).then((res)=> {
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
