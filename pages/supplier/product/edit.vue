<template>
  <div class="add-product">
    <the-header-page :title="`Edit product (${productId})`"/>
    <div class="add-product-content">
      <div class="container">
        <div class="header">
          <p class="title">Determine The Specifications Carefully</p>
          <p class="sub-title">* Indicates A Required Field</p>
          <nuxt-link  :to="localePath('/supplier/manage-products')">
            <button class="btn btn-info mt-4">Back</button>
          </nuxt-link>
        </div>
        <form @submit.prevent="editProduct">
          <div class="form-row">
            <div class="form-group col-lg-6 col-md-6 col-12">
              <input type="text" placeholder="Product Name *" v-model="productData.name" class="custome-input">
            </div>
            <div class="form-group col-lg-6 col-md-6 col-12">
              <input type="text" placeholder="Product Brand *" v-model="productData.brand" class="custome-input">
            </div>
            <!-- <div class="form-group col-lg-6 col-md-6 col-12">
              <v-select :options="options"></v-select>
            </div> -->
          </div>
          <div class="form-row">
            <div class="form-group col-12">
              <textarea v-model="productData.desc" class="custome-input" cols="30" rows="5" placeholder="Description Your Product / Price / Quantity / Size / Gendar / Type ........ *"></textarea>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-lg-6 col-md-6 col-sm-12">
              <input type="number" placeholder="Sku *" v-model="productData.sku" class="custome-input">
            </div>
            <div class="form-group col-lg-6 col-md-6 col-sm-12">
              <input type="number" placeholder="Barcode Number *" v-model="productData.barcode_number" class="custome-input">
            </div>
            <div class="form-group col-lg-6 col-md-6 col-sm-12">
              <input type="number" placeholder="Stock *" v-model="productData.stock" class="custome-input">
            </div>
            <div class="form-group col-lg-6 col-md-6 col-sm-12">
              <input type="number" placeholder="Weight *" v-model="productData.weight" class="custome-input">
            </div>

          </div>

          <div class="form-row">
            <div class="form-group discount-content col-lg-4 col-md-4 col-12">
              <p class="discount-text">Is There A Sale Price?</p>
              <label class="switch" for="checkbox">
                <input type="checkbox" id="checkbox" v-model="isSalePrice" />
                <div class="slider round"></div>
              </label>
            </div>
            <div class="form-group col-lg-4 col-md-4 col-12">
              <input type="text" placeholder="Regular Price *" v-model="productData.regular_price" class="custome-input">
            </div>
            <div class="form-group col-lg-4 col-md-4 col-12" v-if="isSalePrice">
              <input type="text" placeholder="Sale Price *" v-model="productData.sale_price" class="custome-input">
            </div>
          </div>

          <div class="form-row">
            <div class="form-group discount-content col-lg-4 col-md-4 col-12">
              <p class="discount-text">Is There A Tax?</p>
              <label class="switch" for="checkboxTax">
                <input type="checkbox" id="checkboxTax" v-model="isTaxAmount"/>
                <div class="slider round"></div>
              </label>
            </div>
            <div class="form-group col-lg-4 col-md-4 col-12" v-if="isTaxAmount">
              <input type="text" placeholder="Merchant Tax Number *" v-model="productData.merchant_tax_number" class="custome-input">
            </div>
            <div class="form-group col-lg-4 col-md-4 col-12" v-if="isTaxAmount">
              <v-select
              :options="taxAmount"
              :reduce="(taxAmount) => taxAmount.id "
              label="tax_amount"
              v-model="productData.tax_amount_id"
              :dir="'ltr'"
              :placeholder="availableLocale ? `قيمة الضريبة` : `Tax Amount`"></v-select>
            </div>
          </div>

          <div class="upload-images mb-4">
            <div class="imgs-uploaded" v-if="preview_images.length > 0">
              <ul class="list-style">
                <li class="list" v-for="(item, index) in preview_images" :key="index">
                  <img :src="item" alt="alt_img">
                  <button class="delete-btn" type="button" @click.prevent="deleteImg(item)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 19.022 19.022"><defs><style>.a,.b,.c{fill:none;}.b,.c{stroke:#fff;stroke-linecap:round;stroke-linejoin:bevel;stroke-width:2px;}.c{fill-rule:evenodd;}</style></defs><rect class="a" width="19.022" height="19.022"/><g transform="translate(2.378 1.435)"><line class="b" x1="4.755" y1="4.755" transform="translate(4.755 7.442)"/><line class="b" x1="4.755" y2="4.755" transform="translate(4.755 7.442)"/><rect class="b" width="14.266" height="3.17" rx="1"/><path class="c" d="M16.1,5.81v11.4a1.585,1.585,0,0,1-1.585,1.585H6.585A1.585,1.585,0,0,1,5,17.207V5.81" transform="translate(-3.415 -2.64)"/></g></svg>
                  </button>
                </li>
              </ul>
            </div>
            <div class="imgs-uploaded" v-else>
              <ul class="list-style">
                <li class="list" v-for="(item, index) in this.productData.images" :key="index">
                  <img :src="item.img" alt="alt_img">
                  <button class="delete-btn" type="button" @click.prevent="deleteImg(item)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 19.022 19.022"><defs><style>.a,.b,.c{fill:none;}.b,.c{stroke:#fff;stroke-linecap:round;stroke-linejoin:bevel;stroke-width:2px;}.c{fill-rule:evenodd;}</style></defs><rect class="a" width="19.022" height="19.022"/><g transform="translate(2.378 1.435)"><line class="b" x1="4.755" y1="4.755" transform="translate(4.755 7.442)"/><line class="b" x1="4.755" y2="4.755" transform="translate(4.755 7.442)"/><rect class="b" width="14.266" height="3.17" rx="1"/><path class="c" d="M16.1,5.81v11.4a1.585,1.585,0,0,1-1.585,1.585H6.585A1.585,1.585,0,0,1,5,17.207V5.81" transform="translate(-3.415 -2.64)"/></g></svg>
                  </button>
                </li>
              </ul>
            </div>
            <label for="upload-label" :class="{'absolute_label': preview_images.length > 0}">
              Upload Images
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill: #A0AEC0;"><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5 0-2.711 2.29-5 5-5s5 2.289 5 5c0 2.71-2.29 5-5 5z"></path><path d="M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z"></path></svg>
              <input type="file" accept="image/*" multiple="multiple" @change="uploadImages" id="upload-label">
            </label>
          </div>
          <!-- <div class="form-row">
            <div class="form-group discount-content col-lg-4 col-md-4 col-12">
              <p class="discount-text">Is There A Discount?</p>
              <label class="switch" for="checkbox">
                <input type="checkbox" id="checkbox" v-model="isAddMore"/>
                <div class="slider round"></div>
              </label>
            </div>
            <div class="form-group col-lg-4 col-md-4 col-12" v-if="isAddMore">
              <input type="number" placeholder="Enter The Percentage*" v-model="form.additions.key" class="custome-input">
            </div>
            <div class="form-group col-lg-4 col-md-4 col-12" v-if="isAddMore">
              <input type="number" placeholder="Enter The Amount*" v-model="form.additions.value" class="custome-input">
            </div>
          </div> -->
          <button class="add-product-btn" type="submit">Edit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeaderPage from '~/components/shared/TheHeaderPage.vue'
  export default {
    components: { TheHeaderPage },
    data() {
      return {
        productId: this.$route.query.id,
        isSalePrice: "",
        isTaxAmount: "",
        options: [
          'Canada',
          'United States'
        ],
        gender: [
          'male',
          'female'
        ],
        preview_images: [],
        image_list: [],
        form: {
          additions: {
            x:{
              value: '',
              key: ''
            }
          },
        },
        taxAmount:[],
        productData:{},
      }
    },
    mounted() {
      this.getTaxAmountsFunction()
      this.getDataProduct()
      console.log("product",this.productData,this.productData.sale_price)
      // setTimeout(()=>{
      //   this.getDataOfTabs()
      // },2000)


      //  this.$route.query.id
    },
    computed: {
      availableLocale () {
        let local = this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
        if(local[0].code == 'en'){
          return true
        } else {
          return false
        }
      },
    },
    methods: {
      async getDataProduct(){
        await this.$Api.supplier.getToEditProduct(this.$route.query.id).then((res) => {
          if (res?.data?.status ) {
            this.productData = res.data.data
            if(this.productData.sale_price > 0){
              this.isSalePrice = true
            }
            if(this.productData.tax_amount_id || this.productData.merchant_tax_number){
              this.isTaxAmount = true
            }
          }

        })
      },
      async getTaxAmountsFunction(){
        await this.$Api.supplier.getAllTaxAmounts().then((res) => {
          if (res?.data?.status ) {
            this.taxAmount = res.data.data
          }
        })
      },
      async editProduct(){

        const formData = new FormData();
        formData.append("product_id", this.productId);
        formData.append("name", this.productData.name);
        formData.append("brand", this.productData.brand);
        formData.append("desc", this.productData.desc);
        formData.append("sku", this.productData.sku);
        formData.append("barcode_number", this.productData.barcode_number);
        formData.append("stock", this.productData.stock);
        formData.append("weight", this.productData.weight);
        formData.append("regular_price", this.productData.regular_price);
        if(this.productData.sale_price > 0){
          formData.append("sale_price", this.productData.sale_price);
        }
        if(this.isTaxAmount && this.productData.merchant_tax_number > 0){
          formData.append("merchant_tax_number", this.productData.merchant_tax_number);
          formData.append("tax_amount_id", this.productData.tax_amount_id);
        }
        if(this.image_list.length > 0){
          for (let index = 0; index < this.image_list.length; index++) {
          formData.append(`images[${index}]`, this.image_list[index]);
          }
        }else{
          formData.append("available_images", this.productData.images);
        }


        formData.append("additions", this.form.additions);

        await this.$Api.supplier.postUpdateNewProduct(formData).then((res) => {
          if (res?.data?.status ) {
            this.$router.push('../manage-products')
            this.$toast.fire({
              title: 'Success',
              text: `${res.data.message}`,
              icon: 'success',
              confirmButtonText: 'Cool',
              width:'40em'
            })
          }
        })
      },
      deleteImg(event) {
        for (let index = 0; index < this.preview_images.length; index++) {
          if (event == this.preview_images[index]) {
            this.preview_images.splice(index, 1)
            this.image_list.splice(index, 1)
          }
        }
      },
      uploadImages(event) {
        var input = event.target;
        var count = input.files.length;
        var index = 0;
        if (input.files) {
          while(count --) {
            var reader = new FileReader();
            reader.onload = (e) => {
              this.preview_images.push(e.target.result);
            }
            this.image_list.push(input.files[index]);
            reader.readAsDataURL(input.files[index]);
            index ++;
          }
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
