async function signIn(payload) {
  try {
    return await $nuxt.$api.post(`users/login`, payload).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}
async function loginEdit(payload) {
  try {
    return await $nuxt.$api.post(`users/loginEdit`, payload).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function registerUser(payloads) {
  try {
    return await $nuxt.$api.post("users/register",payloads).then((res) => {
      return res;
    });
  } catch (error) {
    return error;
  }
}

async function requestPasswordReset(payload) {
  try {
    return await $nuxt.$api.post(`users/requestPasswordReset`, payload).then((res) => {
      return res;
    });
  } catch (error) {
    return error;
  }
}

async function createTokenResetPassword(payload) {
  try {
    return await $nuxt.$api.post(`users/createTokenResetPassword`, payload).then((res) => {
      return res;
    });
  } catch (error) {
    return error;
  }
}

async function resetPassword(payload) {
  try {
    return await $nuxt.$api.post(`users/resetPassword`, payload).then((res) => {
      return res;
    });
  } catch (error) {
    return error;
  }
}

async function activeAccount(payload,headers) {
  try {
    // console.log("call",payload , headers)
    // const req = {
    //   headers : headers,
    //   data : payload
    // }
    return await $nuxt.$api.post(`users/activeAccount`, payload , headers).then((res) => {

      return res;
    });
  } catch (error) {
    return error;
  }
}

async function resendActivationCode(payload) {
  try {
    return await $nuxt.$api.post(`users/resendActivationCode`, payload).then((res) => {
      return res;
    });
  } catch (error) {
    return error;
  }
}

async function logout() {
  try {
    return await $nuxt.$api.post(`users/logout`).then((res) => {
      return res;
    });
  } catch (error) {
    return error;
  }
}


const authUser = {
  signIn,
  loginEdit,
  registerUser,
  requestPasswordReset,
  createTokenResetPassword,
  resetPassword,
  activeAccount,
  resendActivationCode,
  logout,
};
export default authUser;
