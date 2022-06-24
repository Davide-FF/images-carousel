<template>
  <div
    class="carousel-ct"
    :style="{ maxWidth: size.width + 'px', height: size.height + 'px' }"
    :class="{
      'preview-top': preview === 'top',
      'preview-right': preview === 'right',
      'preview-left': preview === 'left',
      'preview-off': preview === 'off',
      'inverted-color-scheme': invertedColorScheme,
    }"
    @mouseover="resetAutoplay"
    @mouseleave="setAutoplay"
  >
    <div
      class="carousel-img"
      :style="{ backgroundImage: `url(${images[currentImageIndex].url})` }"
      @touchstart="swipeStart"
      @touchend="swipeEnd"
    >
      <div v-if="isPrevEnabled" class="arrow-ct left" @click="previousImage">
        <div class="arrow">
          <icon name="arrow-right-compressed" class="icon" />
        </div>
      </div>
      <div v-if="isNextEnabled" class="arrow-ct right" @click="nextImage">
        <div class="arrow">
          <icon name="arrow-right-compressed" class="icon" />
        </div>
      </div>
    </div>
    <imagesPreview
      v-if="preview !== 'off'"
      :images="images"
      :current-image-index="currentImageIndex"
      :number-of-images="numberOfPreviewImages"
      :size="size"
      :loop="loop"
      :images-to-shift="previewImagesToShift"
      :position="preview"
      :inverted-color-scheme="invertedColorScheme"
      @clickPreviewImage="updateCurrentImageIndex"
    />
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
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
    size: {
      type: Object,
      default: () => {
        return { width: 900, height: 600 }
      },
    },
    loop: {
      type: Boolean,
      default: false,
    },
    preview: {
      type: String,
      default: 'off',
      validator(value) {
        return ['top', 'right', 'bottom', 'left', 'off'].includes(value)
      },
    },
    numberOfPreviewImages: {
      type: Number,
      default: 5,
    },
    previewImagesToShift: {
      type: Number,
      default: 5,
    },
    autoplay: {
      type: Number,
      default: 0,
    },
    invertedColorScheme: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentImageIndex: 0,
      autoplayInterval: 0,
      startSwipeX: 0,
      endSwipeX: 0,
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
    },

    swipeStart(e) {
      const { touches } = e
      if (touches && touches.length === 1) {
        const touchX = touches[0].clientX
        this.startSwipeX = touchX
      }
    },

    swipeEnd(e) {
      const touchX = e.changedTouches[0].clientX
      this.endSwipeX = touchX
      this.swipe()
    },

    swipe() {
      const touchMovement = this.endSwipeX - this.startSwipeX
      if (Math.abs(touchMovement) >= this.size.width / 4) {
        if (touchMovement < 0 && this.isNextEnabled) {
          this.nextImage()
        } else if (touchMovement > 0 && this.isPrevEnabled) {
          this.previousImage()
        }
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.carousel-ct {
  @apply relative flex flex-col w-full gap-2;

  &.inverted-color-scheme {
    & .arrow svg path {
      fill: #fff;
    }
  }

  & .carousel-img {
    @apply relative w-full h-5/6 bg-cover bg-center bg-placeholder flex-shrink-0;

    & .arrow-ct {
      @apply absolute h-full cursor-pointer w-1/12 opacity-0;

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

    &:hover .arrow-ct {
      @apply bg-gradient-to-l from-transparent-white bg-opacity-20 opacity-100;
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

  &.preview-off .carousel-img {
    @apply h-full w-full;
  }
}
</style>
