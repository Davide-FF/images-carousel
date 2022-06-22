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
      v-if="preview !== 'off'"
      :images="images"
      :current-image-index="currentImageIndex"
      :number-of-images="numberOfPreviewImages"
      :size="size"
      :loop="loop"
      :images-to-shift="previewImagesToShift"
      :position="preview"
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
  @apply relative flex flex-col w-full gap-2;

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

  &.preview-off .carousel-img {
    @apply h-full w-full;
  }

  /* TODO: how to change .svg color?
  &.inverted-color-scheme {
    
  } */
}
</style>
