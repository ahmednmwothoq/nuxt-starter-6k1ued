<template>
  <nav class="app-nav">
    <!--Top nav-->
    <div class="top-nav">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-9 col-7">
            <div class="top-left">
              <ul class="list-style cflex">
                <li class="list">
                  <nuxt-link :to="localePath('/auth/login')" class="list-link">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"></path></svg>
                    </span>
                    Continue As Supplier
                  </nuxt-link>
                </li>
                <li class="list" v-if="settingLinks">
                  <a
                    :href="'tel:' + settingLinks.phone"
                    class="list-link"
                    aria-label="whatsup link"
                    rel="noopener noreferrer"
                  >
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="m20.487 17.14-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z"></path></svg>
                    </span>
                    {{settingLinks.phone}}
                  </a>
                </li>
                <li class="list" v-if="settingLinks">
                  <a
                    :href="'mailto:' + settingLinks.gmail"
                    aria-label="email link"
                    rel="noopener noreferrer"
                    class="list-link"
                  >
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"></path></svg>
                    </span>
                    {{settingLinks.gmail}}
                  </a>
                </li>
                <li class="list list-lang">
                  <nuxt-link
                    class="lang-btn"
                    v-for="locale in availableLocales"
                    :key="locale.code"
                    :to="switchLocalePath(locale.code)">
                      {{ locale.name }}
                    </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4 col-md-3 col-5">
            <div class="top-right">
              <ul class="list-style cflex" v-if="settingLinks">
                <li class="list">
                  <a
                    :href="settingLinks.instagram"
                    aria-label="instagram link"
                    class="list-link"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path><circle cx="16.806" cy="7.207" r="1.078"></circle><path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path></svg>
                  </a>
                </li>
                <li class="list">
                  <a
                    :href="settingLinks.facebook"
                    aria-label="facebook link"
                    class="list-link"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path></svg>
                  </a>
                </li>
                <li class="list">
                  <a
                    :href="settingLinks.twitter"
                    aria-label="twitter link"
                    class="list-link"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path></svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--middle nav-->
    <div class="middle-nav">
      <div class="container">
        <div class="row">
          <div class="col-lg-2 col-md-2 col-12">
            <div class="logo-nav">
              <nuxt-link :to="localePath('/')">
                <img src="~/assets/images/logo.svg" alt="logo">
              </nuxt-link>
              <div class="middle-dropdown-nav"
                  :class="{ open: toggle }" @click.prevent="toggleIcon">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-12 middle-search-nav">
            <div class="search-nav">
              <form @submit.prevent="navSearch" class="search-form">
                <input type="text" v-model="search" :placeholder="$t('looking_for')" class="input-search">
                <button type="submit" class="button-search">
                  <span class="desktop-search">
                    {{ $t('search') }}
                    <img src="~/assets/images/icons/arrow_right_long.svg" alt="arrow_right_long">
                  </span>
                  <span  class="mobile-search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="fill: #fff;"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-12 middle-actions-nav">
            <div class="actions-nav cflex">
              <nuxt-link :to="localePath('/cart')" class="actions-link" v-if="isUser">
                <span class="cart-count">5</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill: #800000;"><path d="M21 4H2v2h2.3l3.521 9.683A2.004 2.004 0 0 0 9.7 17H18v-2H9.7l-.728-2H18c.4 0 .762-.238.919-.606l3-7A.998.998 0 0 0 21 4z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="16.5" cy="19.5" r="1.5"></circle></svg>
              </nuxt-link>
              <template >
                <nuxt-link v-if="isRoleSupplier" :to="localePath('/supplier/statistics')" class="actions-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill:#800000;"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></svg>
                  {{ $t('myAccount') }}
                </nuxt-link>
                <nuxt-link v-else-if="isRoleUser" :to="localePath('/profile/general-info')" class="actions-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill:#800000;"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></svg>
                  {{ $t('myAccount') }}
                </nuxt-link>
              </template>
              <nuxt-link :to="localePath('/auth/login')" class="actions-link" v-if="!isUser">
                {{$t("sign_in")}}
              </nuxt-link>
              <nuxt-link :to="localePath('/quote')" class="actions-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #800000;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
                {{$t("quote")}}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--bottom nav-->
    <div class="bottom-nav-mobile">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12">
            <ul class="list-style cflex">
              <li class="list">
                <button class="list-btn" @click.prevent="dropDownBottomNav">
                  <img src="~/assets/images/icons/menu.svg" alt="">
                  {{$t("all_categories")}}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!--bottom nav-->
    <div class="bottom-nav-desktop" :class="{showBottomNav: showBottomNav}">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12">
            <ul class="list-style cflex">
              <li class="list">
                <button class="list-btn">
                  <img src="~/assets/images/icons/menu.svg" alt="">

                  {{$t("all_categories")}}
                </button>
              </li>
              <!-- <li class="list">
                <button class="list-btn">
                  Category Name 1
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path></svg>
                </button>
                <div class="dropdown">
                  <nuxt-link :to="localePath({name: 'categories-id', params: {id: 10}})">Link one</nuxt-link>
                  <nuxt-link :to="localePath({name: 'categories-id', params: {id: 10}})">Link two</nuxt-link>
                  <nuxt-link :to="localePath({name: 'categories-id', params: {id: 10}})">Link three</nuxt-link>
                  <nuxt-link :to="localePath({name: 'categories-id', params: {id: 10}})">Link four</nuxt-link>
                </div>
              </li> -->
              <div  v-for="cate in categories" :key="cate.id">
                <li class="list">
                  <img class="image_category" :src="cate.logo" :alt="cate.name">
                  <nuxt-link style="background:none !important;color:black !important; padding-right: 5px !important;padding-left: 0px !important;"  :to="localePath({name: 'categories-id', params: {id: cate.id}})" class="list-btn">
                    {{getLocales ? cate.name_ar : cate.name_en}}
                  <!-- {{cate.name}} -->
                  </nuxt-link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--resposnive dropdown navbar-->
    <div class="mobile-nav" :class="{openNavClass: toggle}">
      <div class="wrapper">
        <div class="wrapper-header">
          <nuxt-link :to="localePath('/auth/login')" class="header-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" style="fill: #fff;"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg>
            Login
          </nuxt-link>
          <button class="close-nav" @click.prevent="toggleIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #fff;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
          </button>
        </div>
        <div class="wrapper-content">
          <p class="title">
            <img src="../../assets/images/icons/menu.svg" alt="menu">
            {{$t("all_categories")}}
          </p>

          <ul class="list-style" v-for="cate in categories" :key="cate.id">
            <!-- <li class="list">
              <button class="text-btn" type="button">
                <span>Category Name 1 </span>
                <svg width="17" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.270466 0.316062C0.648196 -0.0868501 1.28103 -0.107264 1.68394 0.270466L9.68394 7.77047C9.88559 7.95951 10 8.22359 10 8.5C10 8.77641 9.88559 9.04049 9.68394 9.22954L1.68394 16.7295C1.28103 17.1073 0.648196 17.0869 0.270466 16.6839C-0.107264 16.281 -0.0868501 15.6482 0.316062 15.2705L7.53789 8.5L0.316062 1.72954C-0.0868501 1.35181 -0.107264 0.718974 0.270466 0.316062Z" fill="white"/>
                </svg>
              </button>
              <div class="dropdown-list">
                <nuxt-link :to="localePath('/')" class="dropdown-list-link">sub link 1</nuxt-link>
                <nuxt-link :to="localePath('/')" class="dropdown-list-link">sub link 2</nuxt-link>
                <nuxt-link :to="localePath('/')" class="dropdown-list-link">sub link 3</nuxt-link>
                <nuxt-link :to="localePath('/')" class="dropdown-list-link">sub link 4</nuxt-link>
                <nuxt-link :to="localePath('/')" class="dropdown-list-link">sub link 5</nuxt-link>
              </div>
            </li> -->

            <li class="list">
              <img class="image_category" :src="cate.logo" :alt="cate.name">
              <nuxt-link :to="localePath({name: 'categories-id', params: {id: cate.id}})" class="list-btn">
                {{getLocales ? cate.name_ar : cate.name_en}}
              </nuxt-link>
            </li>
          </ul>

          <ul class="list-links list-style" v-if="user == 'supplier'">
            <li class="list">
              <nuxt-link :to="localePath('/supplier/statistics')" class="list-link">
                <span class="text">Store Statistics</span>
              </nuxt-link>
            </li>
            <li class="list">
              <nuxt-link :to="localePath('/supplier/general-info')" class="list-link">
                <span class="text">Edit My Profile Info</span>
              </nuxt-link>
            </li>
            <li class="list">
              <nuxt-link :to="localePath('/supplier/change-password')" class="list-link">
                <span class="text">Change Password</span>
              </nuxt-link>
            </li>
            <li class="list">
              <nuxt-link :to="localePath('/supplier/history-order')" class="list-link">
                <span class="text">My Orders History</span>
              </nuxt-link>
            </li>
            <li class="list">
              <nuxt-link :to="localePath('/supplier/manage-products')" class="list-link">
                <span class="text">Manage Products</span>
              </nuxt-link>
            </li>
            <li class="list">
              <nuxt-link :to="localePath('/supplier/notification')" class="list-link">
                <span class="text">Notification</span>
              </nuxt-link>
            </li>
            <li class="list">
              <nuxt-link :to="localePath('/supplier/delivery')" class="list-link">
                <span class="text">Delivery Methods</span>
              </nuxt-link>
            </li>
            <li class="list">
              <nuxt-link :to="localePath('/supplier/chat')" class="list-link">
                <span class="text">Chat</span>
              </nuxt-link>
            </li>
            <li class="list">
              <nuxt-link :to="localePath('/supplier/subscription')" class="list-link">
                <span class="text">Subscription Packages</span>
              </nuxt-link>
            </li>
          </ul>

          <ul class="list-links list-style" v-if="user == 'profile'">
            <li class="list">
              <nuxt-link :to="localePath('/profile/general-info')" class="list-link">
                <span class="text">Edit My Profile Info</span>
              </nuxt-link>
            </li>

            <li class="list">
              <nuxt-link :to="localePath('/profile/change-password')" class="list-link">
                <span class="text">Change Password</span>
              </nuxt-link>
            </li>

            <li class="list">
              <nuxt-link :to="localePath('/profile/addresses')" class="list-link">
                <span class="text">Manage Addresses</span>
              </nuxt-link>
            </li>

            <li class="list">
              <nuxt-link :to="localePath('/profile/history-order')" class="list-link">
                <span class="text">My Orders History</span>
              </nuxt-link>
            </li>

            <li class="list">
              <nuxt-link :to="localePath('/profile/favorite')" class="list-link">
                <span class="text">My Favorite</span>
              </nuxt-link>
            </li>

            <li class="list">
              <nuxt-link :to="localePath('/profile/notification')" class="list-link">
                <span class="text">Notification</span>
              </nuxt-link>
            </li>

            <li class="list">
              <nuxt-link :to="localePath('/profile/chat')" class="list-link">
                <span class="text">Chat</span>
              </nuxt-link>
            </li>

          </ul>

        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    props: {
      toggle: {
        type: Boolean,
        require: true
      },
      settingLinks: {
        type: Object,
        require: true,
      },
    },
    data() {
      return {
        search: "",
        showBottomNav: false,
        user: null,
        categories: []
      }
    },
    created() {
      this.checkUser();
    },
    computed: {
      availableLocales () {
        return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
      },
      getLocales () {
        let local = this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
        if(local[0].code == 'en'){
          return true
        } else {
          return false
        }
      },
      isUser() {
        if (this.$auth.$storage.getUniversal("token")) {
          return true
        } else {
          return false
        }
      },
      isRoleUser() {
        if (this.$auth.$storage.getUniversal("RoleData") == 1) {
          return true
        } else {
          return false
        }
      },
      isRoleSupplier() {
        if (this.$auth.$storage.getUniversal("RoleData") == 2) {
          return true
        } else {
          return false
        }
      },
      userData() {
        if (this.$auth.$storage.getUniversal("userData")) {
          return this.$auth.$storage.getUniversal("userData")
        } else {
          return false
        }
      }
    },
    mounted() {
      this.getCategories()
    },
    methods: {
      checkUser() {
        let str = this.$router.currentRoute.path;
        if (str.includes("supplier")) {
          this.user = "supplier"
        }
        if (str.includes("profile")) {
          this.user = "profile"
        }
      },
      navSearch() {
        console.log(this.search);
      },
      dropDownBottomNav() {
        this.showBottomNav = !this.showBottomNav
      },
      toggleIcon() {
        this.$emit("toggleNav", !this.toggle)
      },
      async getCategories(){
          await this.$axios.get(`categories/getAllEdit`).then((res)=> {
          if (res?.data?.status && res?.data?.data) {
            this.categories = res.data.data
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.image_category{
  width: 30px;
}
</style>
