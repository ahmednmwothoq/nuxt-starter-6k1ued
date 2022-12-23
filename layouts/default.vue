<template>
  <div :class="this.$i18n.locale === 'ar' ? 'rtl' : ''">
    <the-loader v-if="showHideSpinner"/>
    <the-nav :toggle="toggle" @toggleNav="toggleNav" v-if="!showHideSpinner" :settingLinks="settingLinks"/>
    <div class="app-content" @click.passive="closeNav" v-if="!showHideSpinner">
      <transition name="fade" mode="out-in">
        <Nuxt />
      </transition>
    </div>
    <the-footer v-if="!showHideSpinner" :settingLinks="settingLinks"/>
  </div>
</template>
<script>
import TheNav from "../components/shared/TheNav.vue"
import TheFooter from "../components/shared/TheFooter.vue"
import TheLoader from "../components/shared/TheLoader.vue"
export default {
  components: {
    TheLoader,
    TheNav,
    TheFooter
  },
  data() {
    return {
        toggle: false,
        showHideSpinner: true,
        settingLinks: null
    }
  },
  watch: {
    '$route' () {
      this.toggle = false;
      if (process.client) {
        window.scrollTo(0,0);
      }
    }
  },
  beforeCreate() {
    this.showHideSpinner = true;
  },
  mounted() {
    this.showHideSpinner = false;
    this.$store.dispatch("user/addUser", this.$auth.$storage.getUniversal("userData"))
    this.$store.dispatch("user/addToken", this.$auth.$storage.getUniversal("token"))
    this.$store.dispatch("user/switchStatus", this.$auth.$storage.getUniversal("logged_In"))
    this.$store.dispatch("user/addRole", this.$auth.$storage.getUniversal("RoleData"))
    this.getSettings()
  },
  methods: {
    closeNav() {
      this.toggle = false
    },
    toggleNav(e) {
      this.toggle = e
    },
    async getSettings() {
      await this.$axios.get(`settings/socialLinks`).then((res)=> {
          if (res?.data?.status && res?.data?.data) {
            this.settingLinks = res.data.data
          }

          // console.log("sitting",res.data)
        })
    },
  }
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
