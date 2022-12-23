<template>
  <div class="content addresses-content">
    <the-addresses @reloadAddAddressForm="reloadAddAddressForm" @editAddress="editAddress" :allAddresses="allAddresses" />
    <the-address-form @reloadAddAddressForm="reloadAddAddressForm" v-if="addAddressShow" :citiesAreas="citiesAreas" />
    <the-address-form-edit @closeEditAddressForm="closeEditAddressForm" v-if="editAddressShow" :citiesAreas="citiesAreas" :singleAddress="singleAddress" />
  </div>
</template>


<script>
import TheAddressForm from '~/components/addresses/TheAddressForm.vue'
import TheAddressFormEdit from '~/components/addresses/TheAddressFormEdit.vue'
import TheAddresses from '~/components/addresses/TheAddresses.vue'
  export default {
    components: { TheAddressForm,TheAddresses,TheAddressFormEdit },
    layout: 'userDash',
    data() {
      return {
        isLoading: false,
        addresses: null,
        citiesAreas: {},
        allAddresses: [],
        singleAddress: {},
        editAddressShow: false,
        addAddressShow: true,
        updated: null,
        en_city: [
          'Canada',
          'United States'
        ],
        ar_city: [
          'كندا',
          'امريكا'
        ],
        en_neighbourhood: [
          'Canada',
          'United States'
        ],
        ar_neighbourhood : [
          'كندا',
          'امريكا'
        ],
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
    },
    mounted() {
      this.getCitiesHaveAreas()
      this.getAllAddresses()
    },
    methods: {
      async getCitiesHaveAreas(){
        await this.$Api.general.getCitiesHaveAreasEdit().then((res)=> {
            this.isloading = false
            if (res?.data?.status) {
              this.citiesAreas = res.data.data
            }
        })
      },
      async getAllAddresses() {
        await this.$Api.user.getAllAddresses().then((res)=> {
            this.isloading = false
            if (res?.data?.status) {
              this.allAddresses = res.data.data
              // console.log(this.allAddresses)
            }
        })

      },
      async editAddress(even) {
        console.log('Editing address', even)
        this.editAddressShow = true
        this.addAddressShow = false
        await this.$Api.user.getDetailsAddress(even).then((res)=> {
            this.isloading = false
            if (res?.data?.status) {
              this.singleAddress = res.data.data
              // console.log(this.singleAddress)
            }
        })
      },
      closeEditAddressForm(even){
        if(even){
          this.editAddressShow = false
          this.addAddressShow = true
          // setTimeout(() => {
          //   window.location.href = this.localePath("/profile/addresses");
          // }, 1500);
          this.getAllAddresses()
        }
      },
      reloadAddAddressForm(even){
        if(even){
          this.getAllAddresses()
        }

      },

    },
  }
</script>
<style lang="scss" scoped>

</style>
