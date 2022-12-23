<template>
  <div class="vueGallery" v-if="photos.length">
    <div class="activePhoto" :style="'background-image: url('+photos[activePhoto].img+');'">
      <button type="button" aria-label="Previous Photo" class="previous" @click="previousPhoto()">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="m4.431 12.822 13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"></path></svg>
      </button>
      <button type="button" aria-label="Next Photo" class="next" @click="nextPhoto()">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z"></path></svg>
      </button>
    </div>
    <div class="thumbnails">
      <div
          v-for="(photo, index) in photos"
          :src="photo.img"
          :key="index"
          @click="activePhoto = index"
          :class="{'active': activePhoto == index}" :style="'background-image: url('+photo.img+')'">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    // props: ['photos'],
    props: {
      photos: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        activePhoto: null
      }
    },
    mounted () {
      this.activePhoto = 0;
      console.log("images",this.photos)
      document.addEventListener("keydown", (event) => {
        if (event.which == 37)
          this.previousPhoto()
        if (event.which == 39)
          this.nextPhoto()
      })
    },
    methods: {
      nextPhoto () {
        this.activePhoto = ( this.activePhoto+1 < this.photos.length ? this.activePhoto+1 : 0 )
      },
      previousPhoto () {
        this.activePhoto = ( this.activePhoto-1 >= 0 ? this.activePhoto-1 : this.photos.length-1 )
      }
    }
  }
</script>

<style lang="scss" scoped>
.vueGallery {
  .activePhoto {
    width: 100%;
    margin-bottom: 5px;
    padding-bottom: 65%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border: 2px solid #fff;
    position: relative;

    button {
      border: none;
      background-color: transparent;
      color: #fff;
      opacity: 1;
      position: absolute;
      outline: none;
      top: 50%;
      &.previous {
        padding: 1em;
        left: 0;
        background: -moz-linear-gradient(left,  rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%);
        background: -webkit-linear-gradient(left,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.9) 100%);
        background: linear-gradient(to right,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.9) 100%);
      }
      &.next {
        padding: 1em;
        right: 0;
        background: -moz-linear-gradient(left,  rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%);
        background: -webkit-linear-gradient(left,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.9) 100%);
        background: linear-gradient(to right,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.9) 100%);
      }
    }
  }
  .thumbnails {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    grid-gap: 5px;

    div {
      width: 100%;
      border: 2px solid #fff;
      outline: 2px solid #fff;
      cursor: pointer;
      padding-bottom: 65%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 1;

      &:hover {
        opacity: 0.6;
      }
      &.active {
        outline-color: #5c4084;
        opacity: 1;
      }
    }
  }
}
</style>
