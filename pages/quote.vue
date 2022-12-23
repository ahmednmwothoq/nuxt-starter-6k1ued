<template>
  <div class="app-quote">
    <the-header-page :title="`Quote`"/>
    <div class="container">
      <div class="quote-header">
        <p class="title">Order Anything From Anywhere</p>
        <p class="sub-title">* Indicates A Required Field</p>
      </div>
      <div class="quote-content">
        <form @submit.prevent="quote">
          <div class="form-row">
            <div class="form-group col-lg-6 col-md-6 col-12">
                <input type="text" class="custome-input" placeholder="Full Name *" v-model="form.name">
            </div>
            <div class="form-group col-lg-6 col-md-6 col-12">
              <v-select
                :options="category"
                v-model="form.category"
                placeholder="Choose Category *"></v-select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-lg-6 col-md-6 col-6">
                <input type="text" class="custome-input" placeholder="Min Price *" v-model="form.min">
            </div>
            <div class="form-group col-lg-6 col-md-6 col-6">
                <input type="text" class="custome-input" placeholder="Max Price *" v-model="form.max">
            </div>
            <div class="form-group col-12">
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
                <label for="upload-label" :class="{'absolute_label': preview_images.length > 0}">
                  Upload Images
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill: #A0AEC0;"><path d="M20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-8 12c-2.71 0-5-2.29-5-5 0-2.711 2.29-5 5-5s5 2.289 5 5c0 2.71-2.29 5-5 5z"></path><path d="M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z"></path></svg>
                  <input type="file" accept="image/*" multiple="multiple" @change="uploadImages" id="upload-label">
                </label>
              </div>
            </div>
            <div class="form-group col-lg-6 col-md-6 col-12">
                <textarea class="custome-input" cols="30" rows="8" v-model="form.msg" placeholder="Tell Us What You Want ?! *"></textarea>
            </div>
            <div class="form-group col-lg-6 col-md-6 col-12">
              <div class="address-box">
                  <p class="box-title">Select Address </p>
                  <ul class="list-style">
                    <li class="list">
                        <input type="radio" v-model="form.address" name="address" id="address1" value="home">
                        <label for="address1">
                          <p class="title">home</p>
                          <p class="desc">
                            18658 Tillman Plain, North Glennatown, Nevada, Peru
                          </p>
                        </label>
                    </li>
                    <li class="list">
                        <input type="radio" v-model="form.address" name="address" id="address2" value="work">
                        <label for="address2">
                          <p class="title">work</p>
                          <p class="desc">
                            18658 Tillman Plain, North Glennatown, Nevada, Peru
                          </p>
                        </label>
                    </li>
                  </ul>
              </div>
            </div>
            <div class="form-group col-lg-6 col-md-6 col-12">
              <button class="quote-btn" type="submit">SUBMIT</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeaderPage from '~/components/shared/TheHeaderPage.vue'
  export default {
    components: {
      TheHeaderPage
    },
    data() {
      return {
        form: {
          name: '',
          category: '',
          min: '',
          max: '',
          msg: '',
          address: ''
        },
        preview_images: [],
        image_list: [],
        category: [
          "category1",
          "category2",
          "category3",
          "category4",
        ]
      }
    },
    methods: {
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
      },
      quote() {
        console.log(this.form);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
