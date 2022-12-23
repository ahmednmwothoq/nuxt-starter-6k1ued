<template>
  <div>
      <div class="star-rating">
        <label
            class="star-rating__star"
            v-for="(rating, index) in ratings"
            :key="index"
            :class="{'is-selected': ((value >= rating) && value != null), 'is-disabled': disabled}"
            v-on:click="set(rating)"
            v-on:mouseover="starOver(rating)"
            v-on:mouseout="starOut">
          <input class="star-rating star-rating__checkbox" type="radio" :value="rating" :name="name" v-model="value" :disabled="disabled">★
        </label>
      </div>
  </div>
</template>

<script>
  export default {
    props: {
      'name': String,
      'value': null,
      'disabled': Boolean,
      'required': Boolean
    },
    data() {
      return {
        temp_value: null,
        ratings: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      /*
      * Behaviour of the stars on mouseover.
      */
      starOver: function(index) {
        var self = this;
        if (!this.disabled) {
          this.temp_value = this.value;
          return this.value = index;
        }
      },
      /*
      * Behaviour of the stars on mouseout.
      */
      starOut: function() {
        var self = this;
        if (!this.disabled) {
          return this.value = this.temp_value;
        }
      },
      /*
      * Set the rating.
      */
      set: function(value) {
        var self = this;
        if (!this.disabled) {
          this.temp_value = value;
          return this.value = value;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
