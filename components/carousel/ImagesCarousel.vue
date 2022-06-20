<template>
  <div
    class="carousel-ct"
    :style="{ maxWidth: size[0] + 'px', height: size[1] + 'px' }"
  >
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
      :images="images"
      :current-image-index="currentImageIndex"
      :number-of-images="numberOfImages"
      :size="size"
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
    size: {
      type: Array,
      default: () => [800, 450],
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
}
</style>
