<template>
<div class="mt-5">
    <form @submit.prevent="supplierRegister" enctype="multipart/form-data">
      <div class="supplier-header">
        <div class="supplier-cover" :style="cover_file ? `background-image: url('${cover_file}')` : 'background-color: #F6F6F7'">
          <label for="cover-img">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style="fill: #A0AEC0;"><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5 0-2.711 2.29-5 5-5s5 2.289 5 5c0 2.71-2.29 5-5 5z"></path><path d="M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z"></path></svg>
            <input type="file" accept="image/*" @change="uploadCover" id="cover-img">
          </label>
        </div>

        <div class="supplier-profile">
          <div class="profile-img">
            <img :src="profile_file" alt="avatar" v-if="profile_file"/>
            <img src="~/assets/images/icons/avatar.svg" alt="avatar" v-else/>

            <label for="profile-img">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill: #A0AEC0;"><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5 0-2.711 2.29-5 5-5s5 2.289 5 5c0 2.71-2.29 5-5 5z"></path><path d="M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z"></path></svg>
              <input type="file" accept="image/*" @change="uploadProfile" id="profile-img">
            </label>
          </div>
        </div>
        <span v-if="supplierErrors && supplierErrors.image" class="error-msg">{{supplierErrors.image[0]}}</span>
      </div>

      <div class="form-group mt-3">
        <input type="text" :placeholder="$t('store_name')" v-model="form.storeName" class="custome-input">
      </div>

      <div class="form-group">
        <input type="text" :placeholder="$t('owner_name')" v-model="form.ownerName" class="custome-input">
      </div>

      <div class="form-group" :class="{'errorBorder': formErrors.email}">
        <input type="email" :placeholder="$t('email')" v-model="form.email" class="custome-input">
        <span v-if="formErrors.email" class="error-msg">{{formErrors.email}}</span>
        <span v-if="supplierErrors && supplierErrors.email" class="error-msg">{{supplierErrors.email[0]}}</span>
      </div>

      <div class="form-group" :class="{'errorBorder': formErrors.phone}">
        <input type="number" :placeholder="$t('phone')" v-model="form.phone" class="custome-input">
        <span v-if="formErrors.phone" class="error-msg">{{formErrors.phone}}</span>
          <span v-if="supplierErrors && supplierErrors.phone_number" class="error-msg">{{supplierErrors.phone_number[0]}}</span>
      </div>

      <div class="form-group" :class="{'errorBorder': formErrors.address}">
        <input type="text" :placeholder="$t('address')" v-model="form.address" class="custome-input">
        <span v-if="formErrors.address" class="error-msg">{{formErrors.address}}</span>
      </div>
      <div class="form-row">
          <div class="form-group col-lg-6 col-md-6 col-12">
              <v-select
              v-if="availableLocales == false "
              :options="citiesAreas.cities"
              :reduce="(citiesAreas) => citiesAreas.id "
              label="name_en"
              v-model="form.city"
              :dir="'ltr'"
              :placeholder="$t('city')"></v-select>

              <v-select
              v-if="availableLocales == true "
              :options="citiesAreas.cities"
              :reduce="(citiesAreas) => citiesAreas.id "
              label="name_ar"
              v-model="form.city"
              :dir="'rtl'"
              :placeholder="$t('city')"></v-select>
            <!-- <span v-if="formErrors && formErrors.city" class="error-msg">{{formErrors.city[0]}}</span> -->
          </div>
          <div class="form-group col-lg-6 col-md-6 col-12">
              <v-select
              v-if="availableLocales == false && form.city "
              :options="filteredData"
              :reduce="(citiesAreas) => citiesAreas.id"
              label="name_en"
              v-model="form.neighborhood"
              :dir="'ltr'"
              :placeholder="$t('neighbourhood')"></v-select>

              <v-select
              v-if="availableLocales == true && form.city "
              :options="filteredData"
              :reduce="(citiesAreas) => citiesAreas.id"
              label="name_ar"
              v-model="form.neighborhood"
              :dir="'rtl'"
              :placeholder="$t('neighbourhood')"></v-select>
            <!-- <span v-if="formErrors && formErrors.neighbourhood" class="error-msg">{{formErrors.neighbourhood[0]}}</span> -->
          </div>
        </div>

      <div class="form-row">
        <div class="form-group col-lg-6 col-md-6 col-12">
          <v-select
              v-if="availableLocales == false"
              :options="categories"
              :reduce="(categories) => categories.id "
              label="name_en"
              v-model="form.category"
              :dir="'ltr'"
              placeholder="categories"></v-select>

              <v-select
              v-if="availableLocales == true"
              :options="categories"
              :reduce="(categories) => categories.id "
              label="name_ar"
              v-model="form.category"
              :dir="'rtl'"
              placeholder="التصنيفات"></v-select>
        </div>
        <div class="form-group col-lg-6 col-md-6 col-sm-12">
          <v-select
            :options="shopType"
            v-model="form.shop_type"
            placeholder="Shop type"></v-select>
          <span v-if="supplierErrors && supplierErrors.shop_type" class="error-msg">{{supplierErrors.shop_type[0]}}</span>
        </div>
      </div>
      <!-- <div class="form-group">
        <input type="number" :placeholder="$t('id_num')" v-model="form.idNum" class="custome-input">
        <span v-if="formErrors.idNumber" class="error-msg">{{formErrors.idNumber}}</span>
        <span v-if="supplierErrors && supplierErrors.id_number" class="error-msg">{{supplierErrors.id_number[0]}}</span>
      </div> -->

      <div class="form-group" :class="{'errorBorder': formErrors.commercial}">
        <input type="number" :placeholder="$t('crn')" v-model="form.commercial" class="custome-input" v-if="form.shop_type == 'commercial'">
        <span v-if="formErrors.commercial" class="error-msg">{{formErrors.commercial}}</span>
          <span v-if="supplierErrors && supplierErrors.CRN" class="error-msg">{{supplierErrors.CRN[0]}}</span>
      </div>
      <div class="form-group">
        <input type="number" :placeholder="availableLocales ? `رقم معروف` : `Maroof Number`" v-model="form.known_number" class="custome-input" v-if="form.shop_type == 'commercial'">
        <span v-if="formErrors.knownNumber" class="error-msg">{{formErrors.knownNumber}}</span>
        <span v-if="supplierErrors && supplierErrors.known_number" class="error-msg">{{supplierErrors.known_number[0]}}</span>
      </div>

      <div class="form-group">
        <input
          class="custome-input"
          :placeholder="availableLocales ? `صورة السجل التجاري` : `Commercial Registration Image*`"
          type="file" accept="image/*"
          @change="uploadComImg"
          id="crn_img-img"
          v-if="form.shop_type == 'commercial'"
        >
      </div>


      <div class="form-group">
        <input
          type="number"
          :placeholder="availableLocales ? `رقم السجل المدني` : `Civil Registry Number`"
          v-model="form.civilrn"
          class="custome-input"
          v-if="form.shop_type == 'individually'"
        >
      </div>

      <div class="form-group">
        <input
          type="number"
          :placeholder="availableLocales ? `رقم مستند العمل المستقل` : `Freelance Document Number`"
          v-model="form.free_num"
          class="custome-input"
          v-if="form.shop_type == 'individually'"
        >
      </div>

      <div class="form-group">
        <input
          class="custome-input"
          :placeholder="availableLocales ? `صورة وثيقة لحساب خاص` : `Freelance Document Image*`"
          type="file"
          accept="image/*"
          @change="uploadFreeImg"
          id="free_img-img"
          v-if="form.shop_type == 'individually'"
        >
      </div>


      <div class="form-group" :class="{'errorBorder': formErrors.password}">
        <input type="password" id="password" :placeholder="$t('password')" v-model="form.password" class="custome-input" autocomplete="off">
        <span v-if="formErrors.password" class="error-msg">{{formErrors.password}}</span>
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

      <button class="auth-btn" type="submit" v-if="!isloading" :disabled="!accept">{{ $t('sign_up') }}</button>
      <button class="auth-btn" type="submit" disabled v-else>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
      </button>
    </form>
</div>
</template>

<script>
import supplierReg from "~/mixins/supplierReg";
  export default {
    props: {
      supplierErrors: {
        type: Object,
        required: true
      },
      citiesAreas: {
        type: Object,
        required: true
      },
      categories: {
        type: Array,
        required: true
      }
    },
    mixins: [supplierReg],
    data() {
      return {
        isloading: false,
        formErrors: [],

        profile_file: null,
        profile_img: null,

        cover_file: null,
        cover_img: null,

        commercial_file: null,
        commercial_img: null,

        free_file: null,
        free_img: null,

        shopType: [
          "commercial",
          "individually"
        ],
        form: {
          storeName: '',
          ownerName: '',
          email: '',
          phone: '',
          city: '',
          neighborhood: '',
          address: '',
          category: '',


          commercial: '',
          // commercial_img: '',
          known_number: '',

          civilrn: '',
          // free_img: '',
          free_num: '',

          shop_type: '',
          // idNum: '',
          password: '',
          confPass: '',
          // role_id: '2'
        },
        accept: false
      }
    },
    mounted() {
      // this.getCitiesHaveAreas()
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
          const filter = this.citiesAreas.areas.filter(item => item.city_id == this.form.city)
          return filter
      }
    },
    methods: {

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
      uploadComImg(event) {
        var input = event.target;
        if (input?.files) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.commercial_file = e.target.result;
          }
          this.commercial_img = input.files[0];
          reader.readAsDataURL(input.files[0]);
        }
      },
      uploadFreeImg(event) {
        var input = event.target;
        if (input?.files) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.free_file = e.target.result;
          }
          this.free_img = input.files[0];
          reader.readAsDataURL(input.files[0]);
        }
      },
      supplierRegister() {
        const formData = new FormData();
        formData.append("name", this.form.storeName);
        formData.append("owner_name", this.form.ownerName);
        formData.append("email", this.form.email);
        formData.append("phone", this.form.phone);
        formData.append("address", this.form.address);
        formData.append("category_id", this.form.category);
        if (this.form.shop_type == 'commercial') {
          formData.append("commercial_register", this.form.commercial);
          formData.append("commercial_register_image", this.commercial_img);
          formData.append("maroof_number", this.form.known_number);
          formData.append("type", 1);
        }else if(this.form.shop_type == 'individually'){
          formData.append("civil_registry_number", this.form.civilrn);
          formData.append("freelance_document_image", this.free_img);
          formData.append("freelance_document_number", this.form.free_num);
          formData.append("type", 0);
        }
        formData.append("logo", this.profile_img);
        formData.append("cover", this.cover_img);
        formData.append("lat", '0.0');
        formData.append("lng", '0.0');
        formData.append("city_id", this.form.city);
        formData.append("area_id", this.form.neighborhood);
        formData.append("password", this.form.password);
        formData.append("password_confirmation", this.form.confPass);

        // console.log(formData.values());

        this.$emit("supplierRegister" ,formData)

      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
