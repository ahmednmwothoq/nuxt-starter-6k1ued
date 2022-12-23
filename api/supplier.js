async function getSupplierProfile() {
  try {
    return await $nuxt.$api.get(`stores/getProfile`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function getSupplierStatistics() {
  try {
    return await $nuxt.$api.get(`stores/getStatistics`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function getNotificationsHistory() {
  try {
    return await $nuxt.$api.get(`stores/notificationsHistoryEdit`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function changeDeliveryMethod(payload) {
  try {
    return await $nuxt.$api.post(`stores/changeDeliveryMethod`,payload).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function GetAllProductsSupplier() {
  try {
    return await $nuxt.$api.get(`stores/products/getAll`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function getAllTaxAmounts() {
  try {
    return await $nuxt.$api.get(`stores/products/getTaxAmounts`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function postAddNewProduct(payload) {
  try {
    return await $nuxt.$api.post(`stores/products/add`,payload).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function getToEditProduct(payload) {
  try {
    return await $nuxt.$api.get(`stores/products/edit?product_id=${payload}`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function postUpdateNewProduct(payload) {
  try {
    return await $nuxt.$api.post(`stores/products/update`,payload).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function DeleteProductFromStore(payload) {
  try {
    return await $nuxt.$api.delete(`stores/products/delete?product_id=${payload}`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function getAllOrderSupplier() {
  try {
    return await $nuxt.$api.get(`stores/orders/getPurchasesOrders`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function getSupplierOrderDetails(payload) {
  try {
    return await $nuxt.$api.get(`stores/orders/getOrdersData/${payload}`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function changeOrderStatusBySupplier(payload) {
  try {
    return await $nuxt.$api.post(`stores/orders/changeOrderStatus`,payload).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function getCustomRequestsSupplier(payload) {
  try {
    return await $nuxt.$api.get(`stores/customRequests/getCustomRequests`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function getCustomRequestsDetailsSupplier(payload) {
  try {
    return await $nuxt.$api.get(`stores/customRequests/getCustomRequestsDetails/${payload}`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function sendOrUpdateOfferSupplier(payload) {
  try {
    return await $nuxt.$api.post(`stores/customRequests/sendOrUpdateOffer`,payload).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function withdrawalOfferSupplier(payload) {
  try {
    return await $nuxt.$api.delete(`stores/customRequests/withdrawalOffer?store_offer_id=${payload}`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}




const supplier = {
  getSupplierProfile,
  getSupplierStatistics,
  getNotificationsHistory,
  changeDeliveryMethod,

  GetAllProductsSupplier,
  getAllTaxAmounts,

  postAddNewProduct,
  getToEditProduct,
  postUpdateNewProduct,
  DeleteProductFromStore,

  getAllOrderSupplier,
  getSupplierOrderDetails,

  changeOrderStatusBySupplier,

  getCustomRequestsSupplier,
  getCustomRequestsDetailsSupplier,
  sendOrUpdateOfferSupplier,
  withdrawalOfferSupplier,
};
export default supplier;
