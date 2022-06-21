<template>
  <div
    class="preview-ct"
    :style="{ previewSizing }"
    :class="{
      aside: aside,
    }"
  >
    <div
      v-for="(image, index) in images"
      :key="image.name"
      :ref="`previewImage${index}`"
      class="preview-img-ct"
      :class="{
        'no-padding-left': index === 0,
        'no-padding-right': index === images.length - 1,
      }"
      :style="{ width: imageWidth + 'px' }"
      @click="clickPreviewImage(index)"
    >
      <div
        :style="{
          backgroundImage: `url(${image.url})`,
        }"
        class="preview-img"
        :class="{ current: isCurrent(index) }"
      ></div>
    </div>
    <div
      v-if="isPrevEnabled"
      class="preview-arrow-ct left"
      @click="shiftPreviewRight()"
    >
      <div class="preview-arrow">
        <icon name="arrow-right-compressed" type="primary" class="icon" />
      </div>
    </div>
    <div
      v-if="isNextEnabled"
      class="preview-arrow-ct right"
      @click="shiftPreviewLeft()"
    >
      <div class="preview-arrow">
        <icon name="arrow-right-compressed" type="primary" class="icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => {},
      validator(items) {
        for (const item of items) {
          if (!item.name || !item.url) return false
        }
        return true
      },
    },
    currentImageIndex: {
      type: Number,
      default: 0,
    },
    numberOfImages: {
      type: Number,
      default: 5,
    },
    size: {
      type: Object,
    },
    imagesToShift: {
      type: Number,
      default: 5,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    aside: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      imageWidth: this.size.width / this.numberOfImages,
      isPrevEnabled: false,
      isNextEnabled: false,
    }
  },
  computed: {
    previewSizing() {
      if (this.aside) {
        const width = 0.2 * this.size.width
        return `width: ${width}px, maxHeight: ${this.size.height}`
      }

      const height = 0.2 * this.size.height
      return `maxWidth: ${this.size.width}px, height: ${height}px`
    },
  },
  watch: {
    currentImageIndex(newIndex, previousIndex) {
      if (
        newIndex > previousIndex &&
        newIndex === this.getFirstPreviewIndex() + this.numberOfImages
      ) {
        this.shiftPreviewLeft(1)
      } else if (
        previousIndex === this.getFirstPreviewIndex() &&
        newIndex < previousIndex
      ) {
        this.shiftPreviewRight(1)
      } else if (newIndex === this.images.length - 1 && previousIndex === 0) {
        this.shiftPreviewLeft(
          this.images.length - this.numberOfImages - this.getFirstPreviewIndex()
        )
      } else if (newIndex === 0 && previousIndex === this.images.length - 1) {
        this.shiftPreviewRight(this.getFirstPreviewIndex())
      }
    },
  },
  mounted() {
    this.checkIfPrevEnabled()
    this.checkIfNextEnabled()
  },
  methods: {
    isCurrent(index) {
      return this.currentImageIndex === index
    },

    clickPreviewImage(index) {
      this.$emit('clickPreviewImage', index)
    },

    getFirstPreviewIndex() {
      const previewImage = this.$refs?.previewImage0?.[0]

      if (!previewImage) return null

      const currentMarginLeft = previewImage.style.marginLeft
        ? parseFloat(previewImage.style.marginLeft)
        : 0

      return Math.round(-currentMarginLeft / this.imageWidth)
    },

    checkIfPrevEnabled() {
      if (this.numberOfImages === this.images.length) {
        this.isPrevEnabled = false
        return
      }

      this.isPrevEnabled = this.loop || this.getFirstPreviewIndex() !== 0
    },

    checkIfNextEnabled() {
      if (this.numberOfImages === this.images.length) {
        this.isNextEnabled = false
        return
      }

      this.isNextEnabled =
        this.loop ||
        this.getFirstPreviewIndex() !== this.images.length - this.numberOfImages
    },

    shiftPreviewLeft(imagesToShift) {
      const currentMarginLeft = this.$refs.previewImage0[0].style.marginLeft
        ? parseFloat(this.$refs.previewImage0[0].style.marginLeft)
        : 0

      let shiftSteps = this.imagesToShift
      if (imagesToShift) {
        shiftSteps = imagesToShift
      } else if (
        this.getFirstPreviewIndex() + this.numberOfImages + this.imagesToShift >
        this.images.length
      ) {
        shiftSteps =
          this.images.length - this.getFirstPreviewIndex() - this.numberOfImages
        if (shiftSteps === 0) {
          this.shiftPreviewRight(this.getFirstPreviewIndex())
          return
        }
      }

      this.$refs.previewImage0[0].style.marginLeft =
        shiftSteps * -this.imageWidth + currentMarginLeft + 'px'

      this.checkIfNextEnabled()
      this.checkIfPrevEnabled()
    },

    shiftPreviewRight(imagesToShift) {
      const currentMarginLeft = this.$refs.previewImage0[0].style.marginLeft
        ? parseFloat(this.$refs.previewImage0[0].style.marginLeft)
        : 0

      let shiftSteps = this.imagesToShift
      if (imagesToShift) {
        shiftSteps = imagesToShift
      } else if (this.getFirstPreviewIndex() < this.imagesToShift) {
        shiftSteps = this.getFirstPreviewIndex()
        if (shiftSteps === 0) {
          this.shiftPreviewLeft(this.images.length - this.numberOfImages)
          return
        }
      }

      this.$refs.previewImage0[0].style.marginLeft =
        shiftSteps * this.imageWidth + currentMarginLeft + 'px'

      this.checkIfNextEnabled()
      this.checkIfPrevEnabled()
    },
  },
}
</script>

<style lang="postcss" scoped>
.preview-ct {
  @apply flex flex-row relative overflow-hidden items-center transition-all;

  & .preview-img-ct {
    @apply px-2 h-full flex-shrink-0 cursor-pointer;

    & .preview-img {
      @apply bg-center bg-cover h-full w-full bg-placeholder opacity-60;

      &:hover {
        @apply opacity-100;
      }

      &.current {
        @apply opacity-100;
      }
    }

    &.no-padding-left {
      @apply pl-0;
    }

    &.no-padding-right {
      @apply pr-0;
    }
  }

  & .preview-arrow-ct {
    @apply absolute cursor-pointer h-full;

    width: 5%;

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

    & .preview-arrow {
      @apply absolute;

      height: 18px;
      width: 18px;
      top: calc(50% - 9px);
      right: 10px;

      & .icon {
        @apply absolute h-full;
      }
    }
  }

  &.aside {
    @apply flex-col h-full;
  }
}
</style>
