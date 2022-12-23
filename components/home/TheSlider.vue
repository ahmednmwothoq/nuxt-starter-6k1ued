<template>
    <div>
        <div class="img-slider" v-for="slide in slides" :key="slide.id" :style="{ display: activeSlider.id != slide.id ? 'none' : '' }">
            <div class="slides">
                <div class="slider-img">
                    <img loading="lazy" :src="slide.img" :alt="slide.title">
                    <nuxt-link :to="localePath({path: './store', query: {store_id: 56 , page: 1}})" class="slider-link"></nuxt-link>
                </div>

              <div class="slider-tabs">
                  <ul class="list-style">
                      <li class="list"
                          v-for="slide in slides"
                          :key="slide.id"
                          :class="{ slide: true, active: slide.id == active }"
                          @click="activate(slide.id)">
                      </li>
                  </ul>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            slides: [
                {
                    id:1,
                    img:require('@/assets/images/slider/slider1.jpg'),
                    title: "slider1"
                },
                {
                    id:2,
                    img:require('@/assets/images/slider/slider2.jpg'),
                    title: "slider2"
                },
                {
                    id:3,
                    img:require('@/assets/images/slider/slider3.jpg'),
                    title: "slider3"
                }
            ],
            auto_animate: true,
            active: 1
        }
    },
    created() {
        if (this.auto_animate) {
            this.interval = setInterval(() => {
                this.active = this.active == this.slides.length ? 1 : (this.active + 1) % (this.slides.length + 1);
            }, 6000);
        }
    },
    methods: {
        activate(id) {
            this.active = id;
        }
    },
    computed: {
        activeSlider: function () {
            return this.slides.filter((slide) => slide.id == this.active)[0];
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
