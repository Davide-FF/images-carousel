<template>
  <div class="carousel-ct">
    <div
      class="carousel-img"
      :style="{ backgroundImage: `url(${images[currentImageIndex].url})` }"
    >
      <div v-if="isPrevEnabled" class="arrow-ct left" @click="previousImage">
        <div class="arrow">
          <icon name="arrow-right-compressed" type="primary" class="icon" />
        </div>
      </div>
      <div v-if="isNextEnabled" class="arrow-ct right" @click="nextImage">
        <div class="arrow">
          <icon name="arrow-right-compressed" type="primary" class="icon" />
        </div>
      </div>
    </div>
    <images-preview
      class="preview"
      :images="images"
      :current-image-index="currentImageIndex"
      :number-of-images="numberOfImages"
    ></images-preview>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
      validator(items) {
        for (const item of items) {
          if (!item.name || !item.url) return false
        }
        return true
      },
    },
    defaultImageIndex: {
      type: Number,
      default: 0,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    numberOfImages: {
      type: Number,
      default: 5,
      validator(number) {
        return number % 2 !== 0
      },
    },
  },

  data() {
    return {
      currentImageIndex: 0,
    }
  },

  computed: {
    isPrevEnabled() {
      if (this.loop) return true
      return this.currentImageIndex > 0
    },
    isNextEnabled() {
      if (this.loop) return true
      return this.currentImageIndex < this.images.length - 1
    },
    previewImages() {
      const sideImages = Math.floor(this.numberOfImages / 2)
      console.log(sideImages, this.currentImageIndex)

      if (this.currentImageIndex - sideImages < 0) {
        return this.images.slice(0, this.numberOfImages)
      } else if (this.currentImageIndex + sideImages >= this.images.length) {
        return this.images.slice(this.images.length - sideImages * 2 - 1)
      }
      return this.images.slice(
        this.currentImageIndex - sideImages,
        this.currentImageIndex + sideImages + 1
      )
    },
    currentImage() {
      return this.images[this.currentImageIndex]
    },
  },

  created() {
    this.currentImageIndex = this.defaultImageIndex
  },

  methods: {
    nextImage() {
      if (this.currentImageIndex === this.images.length - 1) {
        this.currentImageIndex = 0
      } else {
        this.currentImageIndex += 1
      }
    },
    previousImage() {
      if (this.currentImageIndex === 0) {
        this.currentImageIndex = this.images.length - 1
      } else {
        this.currentImageIndex -= 1
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.carousel-ct {
  @apply relative flex flex-col w-full;

  max-width: 800px;
  height: 450px;

  & .carousel-img {
    @apply w-full h-5/6 bg-cover bg-center bg-placeholder;

    & .arrow-ct {
      @apply absolute h-5/6 cursor-pointer w-2/12;

      &:hover {
        @apply bg-gradient-to-l from-transparent-white bg-opacity-20;
      }

      &.left {
        transform-origin: 50% 50%;
        transform: rotate(-180deg);
      }

      &.right {
        @apply right-0;
      }

      & .arrow {
        @apply absolute;

        height: 36px;
        top: calc(50% - 18px);
        right: 5px;

        & .icon {
          @apply h-full;
        }
      }
    }
  }

  & .preview {
    @apply h-1/6;

    margin: 1%;
  }
}
</style>
