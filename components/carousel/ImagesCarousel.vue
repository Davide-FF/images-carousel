<template>
  <div
    class="carousel-ct"
    :style="{ maxWidth: size.width + 'px', height: size.height + 'px' }"
    :class="{
      'preview-top': previewPosition === 'top',
      'preview-right': previewPosition === 'right',
      'preview-left': previewPosition === 'left',
    }"
  >
    <div
      class="carousel-img"
      :style="{ backgroundImage: `url(${images[currentImageIndex].url})` }"
    >
      <div
        v-if="isPrevEnabled"
        class="arrow-ct left"
        @click="arrowClick('prev')"
      >
        <div class="arrow">
          <icon name="arrow-right-compressed" type="primary" class="icon" />
        </div>
      </div>
      <div
        v-if="isNextEnabled"
        class="arrow-ct right"
        @click="arrowClick('next')"
      >
        <div class="arrow">
          <icon name="arrow-right-compressed" type="primary" class="icon" />
        </div>
      </div>
    </div>
    <imagesPreview
      :images="images"
      :current-image-index="currentImageIndex"
      :number-of-images="numberOfImages"
      :size="size"
      :loop="loop"
      :images-to-shift="previewImagesToShift"
      :position="previewPosition"
      @clickPreviewImage="updateCurrentImageIndex"
    />
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
    },
    size: {
      type: Object,
      default: () => {},
    },
    previewImagesToShift: {
      type: Number,
      default: 5,
    },
    previewPosition: {
      type: String,
      default: 'bottom',
      validator(value) {
        return ['top', 'right', 'bottom', 'left'].includes(value)
      },
    },
    autoplay: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      currentImageIndex: 0,
      autoplayInterval: 0,
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

  mounted() {
    this.setAutoplay()
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

    updateCurrentImageIndex(index) {
      this.currentImageIndex = index
    },

    setAutoplay() {
      if (this.autoplay !== 0) {
        this.autoplayInterval = setInterval(
          this.nextImage,
          this.autoplay * 1000
        )
      }
    },

    resetAutoplay() {
      clearInterval(this.autoplayInterval)
      // this.setAutoplay()
    },

    arrowClick(direction) {
      if (direction === 'prev') {
        this.previousImage()
      } else if (direction === 'next') {
        this.nextImage()
      }

      this.resetAutoplay()
    },
  },
}
</script>

<style lang="postcss" scoped>
.carousel-ct {
  @apply relative flex flex-col w-full gap-3 m-2;

  & .carousel-img {
    @apply relative w-full h-5/6 bg-cover bg-center bg-placeholder flex-shrink-0;

    & .arrow-ct {
      @apply absolute h-full cursor-pointer w-1/12 opacity-0;

      &:hover {
        @apply bg-gradient-to-l from-transparent-white bg-opacity-20 opacity-100;
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

  &.preview-top {
    @apply flex-col-reverse;
  }

  &.preview-right,
  &.preview-left {
    @apply flex-row h-full;

    & .carousel-img {
      @apply w-5/6 h-full;

      & .arrow-ct {
        @apply h-full;
      }
    }
  }

  &.preview-left {
    @apply flex-row-reverse;
  }
}
</style>
