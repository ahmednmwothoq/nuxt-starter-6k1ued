export default function({ $auth, store, $axios , i18n ,app }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      "Content-Language": i18n.locale,

    }
  });

  // $axios.defaults.headers.common = {
  //   'X-Requested-With': 'XMLHttpRequest',
  //   'X-CSRF-TOKEN': `${csrf_token()}`
  // };

  // "Access-Control-Allow-Origin": '*',
  //     "Access-Control-Allow-Credentials": true,
  //     "Access-Control-Allow-Methods": 'GET,PUT,POST,DELETE,OPTIONS',
  //     "Access-Control-Allow-Headers": 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json',
  // $axios.defaults.xsrfHeaderName = "x-csrf-token";
  // $axios.defaults.xsrfCookieName = "csrf_refresh_token";

  // Set baseURL
  api.setBaseURL("https://klm.cdy.mybluehost.me/ecomaster/api");
  api.setToken(store?.getters["user/getToken"]);

  // $axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

  // handle errors
  api.onError((error) => {
    $nuxt.$loading.finish();
  });

  api.onRequest((config) => {
    $nuxt.$loading.start();
    // console.log($auth.$storage.getUniversal("token"),$auth.$storage.getUniversal("logged_In"))

    if(store.getters["user/getSwitchStatus"] && store.getters["user/getToken"]){
      config.headers = {
        "Authorization": `${store.getters["user/getToken"]}`
      }
    }
    // if ((
    //   config.method == 'post' ||
    //   config.method == 'put' ||
    //   config.method == 'delete'
    // ) &&
      // !Cookies.get('XSRF-TOKEN')) {
    //   return setCSRFToken()
    //       .then(response => config);
    // }
    // return config;
    // console.log("asd",config)
    // if (config.method == "post") {
    //   const url = config.baseURL.replace("/api", "");
    //   $axios.get(`${url}/sanctum/csrf-cookie`).then((res)=> {
    //     console.log("asd",res)
    //   })
    //   config.headers = {}

    // }

    // const token = app.$csrfToken()
    // config.headers = {
    //   'X-Requested-With': 'XMLHttpRequest',
    //   "Access-Control-Allow-Origin": '*',
    // };
    // if (!config.headers['X-CSRF-Token'] && token)
    //   config.headers['X-CSRF-Token'] = token

    //   return config
  });

  // const setCSRFToken = () => {
  //   const url = $axios.defaults.baseURL.replace("/api", "");
  //   return $axios.get(`${url}/sanctum/csrf-cookie`)
  // }

  api.onResponse((response) => {
    $nuxt.$loading.finish();

    if (response.config.method == "post") {

      if (response?.data?.status && response?.data?.msg) {
        $nuxt.$bvToast.toast(response.data.msg, {
          toaster: 'b-toaster-top-right',
          noCloseButton: false,
          solid: true,
          autoHideDelay: 3000,
          variant: 'success'
        })
      }

      if (!response?.data?.status && response?.data?.msg) {
        $nuxt.$bvToast.toast(response.data.msg, {
          toaster: 'b-toaster-top-right',
          noCloseButton: false,
          solid: true,
          autoHideDelay: 3000,
          variant: 'danger'
        })
      }

      if (!response?.data?.status && response?.data?.error) {
        $nuxt.$bvToast.toast(response.data.error, {
          toaster: 'b-toaster-top-right',
          noCloseButton: false,
          solid: true,
          autoHideDelay: 3000,
          variant: 'danger'
        })
      }

      if (!response?.data?.status && response?.data?.errors) {
        for (let index = 0; index < response.data.errors.length; index++) {
          $nuxt.$bvToast.toast(response.data.errors[index], {
            toaster: 'b-toaster-top-right',
            noCloseButton: false,
            solid: true,
            autoHideDelay: 3000,
            variant: 'danger'
          })
        }
      }
    }
  });

  inject("api", api);
}
