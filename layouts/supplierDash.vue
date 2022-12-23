<template>
  <div :class="this.$i18n.locale === 'ar' ? 'rtl' : ''">
    <the-nav :toggle="toggle" @toggleNav="toggleNav" :settingLinks="settingLinks"/>
    <div class="app-content" @click.passive="closeNav">
      <div class="profile">
        <the-header-page :title="`Supplier`"/>
        <div class="profile-wrapper">
          <div class="container">
            <div class="row">
              <div class="col-lg-4 col-md-3 col-12 mb-3 profile-sidebar" v-if="!mobileScreen">
                <the-side-bar/>
              </div>
              <div class="col-lg-8 col-md-9 col-12 mb-3 profile-content">
                <transition name="fade" mode="out-in">
                  <Nuxt />
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <the-footer :settingLinks="settingLinks"/>
  </div>
</template>
<script>
import TheSideBar from '~/components/supplier/TheSideBar.vue';
import TheHeaderPage from '~/components/shared/TheHeaderPage.vue';
import TheNav from "../components/shared/TheNav.vue"
import TheFooter from "../components/shared/TheFooter.vue"
import handelLayout from "~/mixins/handelLayout";
export default {
  name: 'supplierDash',
  components: {
    TheNav,
    TheFooter,
    TheHeaderPage,
    TheSideBar
  },
  data() {
    return {
        settingLinks: null
    }
  },
  mixins: [handelLayout],
  mounted() {
    // this.$store.dispatch("user/addSupplier", this.$auth.$storage.getUniversal("SupplierData"))
    this.$store.dispatch("user/addToken", this.$auth.$storage.getUniversal("token"))
    this.$store.dispatch("user/switchStatus", this.$auth.$storage.getUniversal("logged_In"))
    this.$store.dispatch("user/addRole", this.$auth.$storage.getUniversal("RoleData"))
    this.getSettings()
    this.getSupplierData()
  },
  methods: {
    async getSettings() {
      await this.$axios.get(`settings/socialLinks`).then((res)=> {
          if (res?.data?.status && res?.data?.data) {
            this.settingLinks = res.data.data
          }
        })
    },
    async getSupplierData() {
        await this.$Api.supplier.getSupplierProfile().then((res) => {
          if (res?.data?.status ) {
            this.$store.dispatch("user/addSupplier", res.data.data)
            this.$auth.$storage.setUniversal("SupplierData",res.data.data)
          }
        })
      },
  },
}
</script>
<style>
.app-content {
  padding: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 2s, transform 2s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

.moveUp-enter-active {
  animation: fadeIn 2s ease-in;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.moveUp-leave-active {
  animation: moveUp 0.3s ease-in;
}
@keyframes moveUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-400px);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
