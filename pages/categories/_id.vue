<template>
  <div class="categories-page">
    <the-header-page :title="`Category Name`"/>
    <div class="categories-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-4 col-12 mb-3 filter-content">
            <div class="categories-filter">
              <form @submit.prevent="filterCategory">
                <div class="filter-box">
                  <p class="title">Category</p>
                  <ul class="list-style">
                    <li class="list">
                      <input type="radio" v-model="category.name" name="categoriesName" id="category_name_1" value="Category Name">
                      <label for="category_name_1">Category Name</label>
                    </li>
                    <li class="list">
                      <input type="radio" v-model="category.name" name="categoriesName" id="category_name_2" value="Category Name 2">
                      <label for="category_name_2">Category Name 2</label>
                    </li>
                    <li class="list">
                      <input type="radio" v-model="category.name" name="categoriesName" id="category_name_3" value="Category Name 3">
                      <label for="category_name_3">Category Name 3</label>
                    </li>
                  </ul>
                </div>
                <div class="filter-box">
                  <p class="title">Rate</p>
                  <ul class="list-style">
                    <li class="list">
                      <input type="radio" v-model="category.rate" name="rates" id="star5" value="5">
                      <label for="star5">
                        <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                        <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                        <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                        <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                        <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                      </label>
                    </li>
                    <li class="list">
                      <input type="radio" v-model="category.rate" name="rates" id="star4" value="4">
                      <label for="star4">
                        <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                        <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                        <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                        <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                        <img src="~/assets/images/icons/star_lg_outline.svg" alt="star_lg_outline">
                      </label>
                    </li>
                    <li class="list">
                      <input type="radio" v-model="category.rate" name="rates" id="star3" value="3">
                      <label for="star3">
                        <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                        <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                        <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                        <img src="~/assets/images/icons/star_lg_outline.svg" alt="star_lg_outline">
                        <img src="~/assets/images/icons/star_lg_outline.svg" alt="star_lg_outline">
                      </label>
                    </li>
                    <li class="list">
                      <input type="radio" v-model="category.rate" name="rates" id="star2" value="2">
                      <label for="star2">
                        <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                        <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                        <img src="~/assets/images/icons/star_lg_outline.svg" alt="star_lg_outline">
                        <img src="~/assets/images/icons/star_lg_outline.svg" alt="star_lg_outline">
                        <img src="~/assets/images/icons/star_lg_outline.svg" alt="star_lg_outline">
                      </label>
                    </li>
                    <li class="list">
                      <input type="radio" v-model="category.rate" name="rates" id="star1" value="1">
                      <label for="star1">
                        <img src="~/assets/images/icons/star_lg.svg" alt="star_lg">
                        <img src="~/assets/images/icons/star_lg_outline.svg" alt="star_lg_outline">
                        <img src="~/assets/images/icons/star_lg_outline.svg" alt="star_lg_outline">
                        <img src="~/assets/images/icons/star_lg_outline.svg" alt="star_lg_outline">
                        <img src="~/assets/images/icons/star_lg_outline.svg" alt="star_lg_outline">
                      </label>
                    </li>
                  </ul>
                </div>
                <div class="filter-box">
                  <p class="title">Sorting By</p>
                  <ul class="list-style">
                    <li class="list">
                      <input type="radio" v-model="category.sortBy" name="sortBy" id="all" value="all">
                      <label for="all">All</label>
                    </li>
                    <li class="list">
                      <input type="radio" v-model="category.sortBy" name="sortBy" id="LowToHigh" value="Low To High">
                      <label for="LowToHigh">Price : Low To High</label>
                    </li>
                    <li class="list">
                      <input type="radio" v-model="category.sortBy" name="sortBy" id="HighToLow" value="High To Low">
                      <label for="HighToLow">Price : High To Low</label>
                    </li>
                  </ul>
                </div>
                <div class="filter-box">
                  <p class="title">Price Range</p>
                  <div class="form-row p-3">
                    <div class="form-group col-lg-6 col-md-6 col-12">
                      <input type="number" placeholder="From 0 SAR" v-model="category.fromPrice" class="custome-input">
                    </div>
                    <div class="form-group col-lg-6 col-md-6 col-12">
                      <input type="number" placeholder="To 100 SAR" v-model="category.toPrice" class="custome-input">
                    </div>
                  </div>
                </div>
                <div class="filter-action">
                  <button class="actionBtn" type="reset">reset</button>
                  <button class="actionBtn" type="submit">apply</button>
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-8 col-md-8 col-12 mb-3">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-12 mb-3" v-for="(i, index) in 6" :key="index">
                <!-- <the-card /> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeaderPage from '~/components/shared/TheHeaderPage.vue'
import TheCard from '~/components/shared/TheCard.vue'
  export default {
  components: { TheHeaderPage,TheCard },
  data() {
    return {
      id: this.$route.params.id,
      category: {
        name: '',
        rate: '',
        sortBy: '',
        fromPrice: '',
        toPrice: ''
      }
    }
  },
  mounted() {
    // this.getCategories()
  },
  methods: {
    filterCategory() {
      console.log(this.category);
    }
  },
}
</script>

<style>
</style>
