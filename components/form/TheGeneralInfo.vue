<template>
  <form @submit.prevent="editProfile" v-if="userData">
    <div class="form-row">
      <div class="form-group col-lg-6 col-md-6 col-12">
        <input type="text" placeholder="Full Name *" v-model="userData.name" class="custome-input">
      </div>
      <div class="form-group col-lg-6 col-md-6 col-12">
        <input type="email" placeholder="Email Address" v-model="userData.email" class="custome-input">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-lg-6 col-md-6 col-12">
        <input type="number" placeholder="Phone Number" v-model="userData.phone" class="custome-input" disabled>
      </div>
      <div class="form-group col-lg-6 col-md-6 col-12">
        <button type="submit" class="info-btn" v-if="!isLoading">SAVE</button>
        <button class="info-btn" type="submit" disabled v-else>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    props: {
      userData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        isLoading:false
      }
    },
    mounted() {
      // const userGetter = this.$store.getters["user/getUser"]
      // this.user.username = userGetter.name
      // this.user.email = userGetter.email
      // this.user.phone_number = userGetter.phone
      // console.log(this.$store.getters["user/getToken"])
      // console.log(this.userData)
    },
    methods: {
      async editProfile() {
        console.log(this.user);

        const payload = {
          name: this.userData.name ,
          email: this.userData.email ,
          phone: this.userData.phone
        }
        // const headers = {
        //   headers: {
        //     "Authorization": `${this.$store.getters["user/getToken"]}`
        //   }
        // }

        this.$emit("editProfile", payload)

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
