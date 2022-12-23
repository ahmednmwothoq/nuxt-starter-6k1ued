<template>
  <div class="story-card" :style="item.cover ? `background-image: url('${item.cover}')` : `background: #f2f2f2`">
    <div class="overlay">
      <!-- <img class="image" :src="item.cover" :alt="item.name"> -->
      <div class="story-content">
        <div class="content">
          <p class="story-title">{{ item.name }}</p>
          <nuxt-link :to="localePath({path: './store', query: {store_id: item.id , page: 1}})" class="story-btn">shop now</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
.overlay{
  position: relative;
}
.overlay .image{
    width: 90%;
    height: 90%;
    z-index: 1;
    position: absolute;
    opacity: 0.1;
}
.story-content{
  position: relative;
  z-index: 2;
}
.story-title{
  font-size: 30px;
  text-align: center;
  margin-bottom: 10px;
}
</style>
