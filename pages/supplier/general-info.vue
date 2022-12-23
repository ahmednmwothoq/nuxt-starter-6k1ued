<template>
    <div class="content profile-info-content">
      <form @submit.prevent="editProfile">
        <div class="supplier-header">
          <div class="supplier-cover" :style="cover_file ? `background-image: url('${cover_file}')` : `background-image: url('${dataProfile.cover}')`">
            <label for="cover-img">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style="fill: #A0AEC0;"><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5 0-2.711 2.29-5 5-5s5 2.289 5 5c0 2.71-2.29 5-5 5z"></path><path d="M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z"></path></svg>
              <input type="file" accept="image/*" @change="uploadCover" id="cover-img">
            </label>
          </div>

          <div class="supplier-profile">
            <div class="profile-img">
              <img :src="profile_file" alt="avatar" v-if="profile_file"/>
              <img :src="dataProfile.logo" alt="avatar" v-else/>

              <label for="profile-img">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill: #A0AEC0;"><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5 0-2.711 2.29-5 5-5s5 2.289 5 5c0 2.71-2.29 5-5 5z"></path><path d="M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z"></path></svg>
                <input type="file" accept="image/*" @change="uploadProfile" id="profile-img">
              </label>
            </div>
          </div>
        </div>
        <div class="form-row mt-3">
          <div class="form-group col-lg-6 col-md-6 col-12">
            <input type="text" placeholder="Store Name" v-model="dataProfile.name" class="custome-input">
          </div>
          <div class="form-group col-lg-6 col-md-6 col-12">
            <input type="text" placeholder="Owner Name" v-model="dataProfile.owner_name" class="custome-input">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6 col-md-6 col-12">
            <input type="email" placeholder="Email Address" v-model="dataProfile.email" class="custome-input">
          </div>
          <div class="form-group col-lg-6 col-md-6 col-12">
            <input type="number" placeholder="Phone Number" v-model="dataProfile.phone" class="custome-input">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-12">
            <input type="text" placeholder="Address" v-model="dataProfile.address" class="custome-input">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6 col-md-6 col-12">
            <v-select
              v-if="availableLocales == false"
              :options="citiesAreas.cities"
              :reduce="(citiesAreas) => citiesAreas.id "
              label="name_en"
              v-model="dataProfile.city_id"
              :dir="'ltr'"
              :placeholder="$t('city')"></v-select>

              <v-select
              v-if="availableLocales == true"
              :options="citiesAreas.cities"
              :reduce="(citiesAreas) => citiesAreas.id "
              label="name_ar"
              v-model="dataProfile.city_id"
              :dir="'rtl'"
              :placeholder="$t('city')"></v-select>
          </div>
          <div class="form-group col-lg-6 col-md-6 col-12">
            <v-select
              v-if="availableLocales == false && form.city"
              :options="filteredData"
              :reduce="(citiesAreas) => citiesAreas.id"
              label="name_en"
              v-model="dataProfile.area_id"
              :dir="'ltr'"
              :placeholder="$t('neighbourhood')"></v-select>

              <v-select
              v-if="availableLocales == true && form.city"
              :options="filteredData"
              :reduce="(citiesAreas) => citiesAreas.id"
              label="name_ar"
              v-model="dataProfile.area_id"
              :dir="'rtl'"
              :placeholder="$t('neighbourhood')"></v-select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-lg-12 col-md-12 col-sm-12">
            <v-select
              :options="form.shopType"
              v-model="form.type"
              placeholder="Shop type"></v-select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6 col-md-6 col-sm-12">
            <input type="number"
            :placeholder="$t('crn')"
            v-model="dataProfile.commercial_register"
            class="custome-input"
            v-if="form.type == 'commercial'">
          </div>

          <div class="form-group col-lg-6 col-md-6 col-sm-12">
          <input type="number"
          :placeholder="availableLocales ? `رقم معروف` : `Maroof Number`"
          v-model="dataProfile.maroof_number"
          class="custome-input"
          v-if="form.type == 'commercial'">
        </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6 col-md-6 col-sm-12">
            <input
              type="number"
              :placeholder="availableLocales ? `رقم السجل المدني` : `Civil Registry Number`"
              v-model="dataProfile.civil_registry_number"
              class="custome-input"
              v-if="form.type == 'individually'"
            >
          </div>
          <div class="form-group">
            <input
              type="number"
              :placeholder="availableLocales ? `رقم مستند العمل المستقل` : `Freelance Document Number`"
              v-model="dataProfile.freelance_document_number"
              class="custome-input"
              v-if="form.type == 'individually'"
            >
          </div>
        </div>
      <!-- <div class="form-group">
        <input
          class="custome-input"
          :placeholder="availableLocales ? `صورة السجل التجاري` : `Commercial Registration Image*`"
          type="file" accept="image/*"
          @change="uploadComImg"
          id="crn_img-img"
          v-if="form.shop_type == 'commercial'"
        >
      </div> -->
      <!-- <div class="form-group">
        <input
          class="custome-input"
          :placeholder="availableLocales ? `صورة وثيقة لحساب خاص` : `Freelance Document Image*`"
          type="file"
          accept="image/*"
          @change="uploadFreeImg"
          id="free_img-img"
          v-if="form.shop_type == 'individually'"
        >
      </div> -->
        <!-- <div class="form-row">
          <div class="form-group col-lg-6 col-md-6 col-12" >
            <input v-if="dataProfile.type == 1" value="commercial" type="text" placeholder="Shop Type" v-model="form.type[1]" class="custome-input">
            <input v-else-if="dataProfile.type == 0" value="commercial" type="text" placeholder="Shop Type" v-model="form.type[0]" class="custome-input">
          </div>
          <div class="form-group col-lg-6 col-md-6 col-12">
            <input type="number" placeholder="Id Number" v-model="form.numId" class="custome-input">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-lg-6 col-md-6 col-12">
            <input type="number" placeholder="Facebook Id" v-model="form.faceId" class="custome-input">
          </div>
          <div class="form-group col-lg-6 col-md-6 col-12">
            <input type="number" placeholder="Twitter Id" v-model="form.twiterId" class="custome-input">
          </div>
        </div> -->
        <button type="submit" class="info-btn">SAVE</button>
      </form>
    </div>
</template>


<script>
  export default {
    layout: 'supplierDash',
    components: {  },
    data() {
      return {
        options: [
          'Canada',
          'United States'
        ],
        profile_file: null,
        profile_img: null,
        cover_file: null,
        cover_img: null,
        form: {
          storeName: '',
          shopType: [
            "commercial",
            "individually"
          ],
          ownerName: '',
          email: '',
          phone: '',
          address: '',
          type: '',
          numId: '',
          faceId: '',
          twiterId: ''
        },
        dataProfile: {},
        citiesAreas: {}
      }
    },mounted() {
      console.log(this.$auth.$storage.getUniversal("SupplierData"))
      this.getCitiesHaveAreas()
      this.getSupplierData()

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
          return this.citiesAreas.areas.filter(item => item.city_id == this.form.city)
      }
    }
    ,
    methods: {
      async getCitiesHaveAreas(){
        await this.$Api.general.getCitiesHaveAreasEdit().then((res)=> {
            this.isloading = false
            if (res?.data?.status) {
              this.citiesAreas = res.data.data
            }
        })
      },
      async getSupplierData() {
        await this.$Api.supplier.getSupplierProfile().then((res) => {
          if (res?.data?.status ) {
            this.dataProfile = res.data.data
            if(this.dataProfile.type == 1){
              this.form.type = 'commercial'
            }else{
              this.form.type = 'individually'
            }
          }
        })
      },
      uploadCover(event) {
        var input = event.target;
        if (input?.files) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.cover_file = e.target.result;
          }
          this.cover_img = input.files[0];
          reader.readAsDataURL(input.files[0]);
        }
      },
      uploadProfile(event) {
        var input = event.target;
        if (input?.files) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.profile_file = e.target.result;
          }
          this.profile_img = input.files[0];
          reader.readAsDataURL(input.files[0]);
        }
      },
      editProfile() {
        console.log("sss");
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
