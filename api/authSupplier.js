async function registerSupplier(payloads) {
  try {
    return await $nuxt.$api.post("stores/register",payloads).then((res) => {
      return res;
    });
  } catch (error) {
    return error;
  }
}

async function activeAccount(payload,headers) {
  try {

    return await $nuxt.$api.post(`stores/activeAccount`, payload , headers).then((res) => {

      return res;
    });
  } catch (error) {
    return error;
  }
}


async function logout() {
  try {
    return await $nuxt.$api.post(`stores/logout`).then((res) => {
      return res;
    });
  } catch (error) {
    return error;
  }
}


const authSupplier = {
  registerSupplier,
  activeAccount,
  logout,
};
export default authSupplier;
