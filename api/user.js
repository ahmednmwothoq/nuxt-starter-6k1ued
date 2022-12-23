async function updateProfile(payload) {
  try {
    return await $nuxt.$api.put(`users/updateProfile`, payload ).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function updateProfileUser(payload) {
  try {
    return await $nuxt.$api.put(`users/updateProfileUser`, payload ).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function changePassword(payload) {
  try {
    return await $nuxt.$api.post(`users/changePassword`, payload ).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function getUser() {
  try {
    return await $nuxt.$api.get(`users/getProfile`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function getAllAddresses() {
  try {
    return await $nuxt.$api.get(`users/addresses/getAll`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function addNewAddress(payload) {
  try {
    return await $nuxt.$api.post(`users/addresses/add`,payload).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function getDetailsAddress(payload) {
  try {
    return await $nuxt.$api.get(`users/addresses/getDetailsId/${payload}`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function putEditAddress(payload) {
  try {
    return await $nuxt.$api.put(`users/addresses/update`,payload).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function DeleteAddress(payload) {
  try {
    return await $nuxt.$api.delete(`users/addresses/deleteId/${payload}`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function addRemoveProductFavourite(payload) {
  try {
    return await $nuxt.$api.post(`users/favourites/addOrRemoveProduct?product_id=${payload}`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function getAllProductFavourite(payload) {
  try {
    return await $nuxt.$api.get(`users/favourites/getAll?${payload}`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function notificationsHistoryEdit() {
  try {
    return await $nuxt.$api.get(`users/notificationsHistoryEdit`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}


async function addProductToCart(payload) {
  try {
    return await $nuxt.$api.post(`carts/addProductToCart?${payload}`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function deleteProductFromCart(payload) {
  try {
    return await $nuxt.$api.delete(`carts/deleteProductFromCart?${payload}`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function getCartDetails() {
  try {
    return await $nuxt.$api.get(`carts/getCartDetails`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function getCheckout() {
  try {
    return await $nuxt.$api.get(`carts/getCheckoutEdit`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function getCheckCoupon(payload) {
  try {
    return await $nuxt.$api.post(`carts/checkCoupon?${payload}`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function checkout(payload) {
  try {
    return await $nuxt.$api.post(`carts/checkout`,payload).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function getOrdersUser() {
  try {
    return await $nuxt.$api.get(`users/orders/getOrders`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function getUserOrderDetails(payload) {
  try {
    return await $nuxt.$api.get(`users/orders/getOrdersData/${payload}`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function getCustomRequestsUser() {
  try {
    return await $nuxt.$api.get(`users/customRequests/getCustomRequests`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function getCustomRequestsDetailsUser(payload) {
  try {
    return await $nuxt.$api.get(`users/customRequests/getCustomRequestsDetails/${payload}`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function cancelDCustomRequest(payload) {
  try {
    return await $nuxt.$api.delete(`users/customRequests/cancelCustomRequest?custom_request_id=${payload}`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}


const user = {
  updateProfile,
  updateProfileUser,
  changePassword,
  getUser,

  getAllAddresses,
  addNewAddress,
  getDetailsAddress,
  putEditAddress,
  DeleteAddress,

  addRemoveProductFavourite,
  getAllProductFavourite,

  notificationsHistoryEdit,

  addProductToCart,
  deleteProductFromCart,
  getCartDetails,
  getCheckout,
  getCheckCoupon,
  checkout,

  getOrdersUser,
  getUserOrderDetails,

  getCustomRequestsUser,
  getCustomRequestsDetailsUser,
  cancelDCustomRequest,

};
export default user;
