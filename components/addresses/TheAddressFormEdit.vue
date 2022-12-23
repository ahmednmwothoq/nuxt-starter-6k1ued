<template>
  <div class="add-address-box">
      <div class="box-header d-flex justify-content-between">
        <p class="title">Edit Address</p>
        <button
              @click.prevent="closeEditAddress"
              class="btn"
            >
              <img width="30" src="~/assets/images/icons/close.svg" alt="edit" />
            </button>
      </div>
      <form @submit.prevent="editThisAddress">
        <div class="form-group">
          <input type="text" placeholder="Label (Gym, School, Airport, Restaurant ....) *" v-model="singleAddress.title" class="custome-input" />
        <span v-if="formErrors && formErrors.label" class="error-msg">{{formErrors.label[0]}}</span>
        </div>
        <div class="form-group">
          <input type="text" placeholder="Address *" v-model="singleAddress.address" class="custome-input" />
        <span v-if="formErrors && formErrors.address" class="error-msg">{{formErrors.address[0]}}</span>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6 col-md-6 col-12">
              <v-select
              v-if="availableLocales == false"
              :options="citiesAreas.cities"
              :reduce="(citiesAreas) => citiesAreas.id "
              label="name_en"
              v-model="singleAddress.city_id"
              :dir="'ltr'"
              :placeholder="$t('city')"></v-select>

              <v-select
              v-if="availableLocales == true"
              :options="citiesAreas.cities"
              :reduce="(citiesAreas) => citiesAreas.id"
              label="name_ar"

              v-model="singleAddress.city_id"
              :dir="'rtl'"
              :placeholder="$t('city')"></v-select>
            <span v-if="formErrors && formErrors.city" class="error-msg">{{formErrors.city[0]}}</span>
          </div>
          <div class="form-group col-lg-6 col-md-6 col-12">
              <v-select
              v-if="(availableLocales == false && singleAddress.city_id)"
              :options="filteredData"
              :reduce="(citiesAreas) => citiesAreas.id"
              label="name_en"
              v-model="singleAddress.area_id"
              :dir="'ltr'"
              :placeholder="$t('neighbourhood')"></v-select>

              <v-select
              v-if="(availableLocales == true && singleAddress.city_id)"
              :options="filteredData"
              :reduce="(citiesAreas) => citiesAreas.id"
              label="name_ar"
              v-model="singleAddress.area_id"
              :dir="'rtl'"
              :placeholder="$t('neighbourhood')"></v-select>
            <span v-if="formErrors && formErrors.neighbourhood" class="error-msg">{{formErrors.neighbourhood[0]}}</span>
          </div>
        </div>
        <button type="submit" class="new-address-btn" v-if="!isLoading">EDIT ADDRESS</button>
        <button class="new-address-btn" type="submit" disabled v-else>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
      </form>
  </div>
</template>

<script>
  export default {
    props: {
      citiesAreas: {
        type: Object,
        required: true
      },
      singleAddress:{
        type: Object,
        required: true
      }
    },
    data() {
      return {
        isLoading: false,
        formErrors: [],
      }
    },
    computed: {
      availableLocales () {
        let local = this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
        if(local[0].code == 'en'){
          return true
        } else {
          return false
        }
      },
      filteredData(){
          return this.citiesAreas.areas.filter(item => item.city_id == this.singleAddress.city_id)
      }
    },
    methods: {
      async editThisAddress() {
        const payload ={
          address_id : this.singleAddress.id,
          title :  this.singleAddress.title,
          address :  this.singleAddress.address,
          lat :  '0.0',
          lng :  '0.0',
          city_id :  this.singleAddress.city_id,
          area_id :  this.singleAddress.area_id,
        }
        console.log(payload);

        await this.$Api.user.putEditAddress(payload).then((res)=> {
            this.isloading = false
            if (res?.data?.status) {
              this.$toast.fire({
                title: 'Edit Address !',
                text: `${res.data.message}`,
                icon: 'success',
                confirmButtonText: 'Cool',
                width:'35em',
                // padding:'0 0 1.25em'
              })
              this.$emit("closeEditAddressForm", true)
            }
        })

      },
      closeEditAddress(){
        this.$emit("closeEditAddressForm", true)

      }

    }
  }
</script>

<style lang="scss" scoped>

</style>
