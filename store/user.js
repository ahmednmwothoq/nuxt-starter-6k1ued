export const state = () => ({
  user: {},
  supplier: {},
  role: null,
  token: null,
  isLoggedIn: false
});

export const mutations = {
  storeUser(state, userObj) {
    state.user = userObj;
  },
  storeRole(state, role) {
    state.role = role;
  },
  storeSupplier(state, supplierObj) {
    state.supplier = supplierObj;
  },
  storeToken(state, token) {
    state.token = token;
  },
  switchUserStuts(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  }
};

export const actions = {
  addUser({ commit }, event) {
    commit('storeUser', event)
    this.$auth.$storage.setUniversal("userData", event);
  },
  addSupplier({ commit }, event) {
    commit('storeSupplier', event)
    this.$auth.$storage.setUniversal("SupplierData", event);
  },
  addRole({ commit }, event) {
    commit('storeRole', event)
    this.$auth.$storage.setUniversal("RoleData", event);
  },
  addToken({ commit }, event) {
    commit('storeToken', event)
    this.$auth.$storage.setUniversal("token", event);
  },
  switchStatus({ commit }, event) {
    commit('switchUserStuts', event)
    this.$auth.$storage.setUniversal("logged_In", event);
  },
}

export const getters = {
  getRole: state => {
    return state.role
  },
  getUser: state => {
    return state.user
  },
  getSupplier: state => {
    return state.supplier
  },
  getToken: state => {
    return state.token
  },
  getSwitchStatus: state => {
    return state.isLoggedIn
  }
}
