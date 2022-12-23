export default {
  data() {
    return {
      mobileScreen: false,
      toggle: false
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
  mounted() {
    this.$nextTick(() => {
        window.addEventListener('resize', this.onResize);
    })
  },
  created() {
    if (process.browser){
      this.onResize()
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
        if (window.innerWidth < 768) {
          this.mobileScreen = true
        } else {
          this.mobileScreen = false
        }
    },
    closeNav() {
      this.toggle = false
    },
    toggleNav(e) {
      this.toggle = e
    }
  }
}
