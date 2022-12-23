async function home() {
  try {
    return await $nuxt.$api.get(`home`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function getCitiesHaveAreasEdit() {
  try {
    return await $nuxt.$api.get(`cities/getCitiesHaveAreasEdit`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}

async function getAllCategories() {
  try {
    return await $nuxt.$api.get(`categories/getAllEdit`).then((res) => {
      return res;
    });
  } catch (error) {
    return error
  }
}


const general = {
  home,
  getCitiesHaveAreasEdit,
  getAllCategories,

};
export default general;
