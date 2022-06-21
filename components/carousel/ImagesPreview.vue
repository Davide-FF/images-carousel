<template>
  <div
    class="preview-ct"
    :style="{ maxWidth: size.width + 'px', height: 0.2 * size.height + 'px' }"
  >
    <div
      v-for="(image, index) in images"
      :key="image.name"
      :ref="`previewImage${index}`"
      class="preview-img-ct"
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
    previewImagesToShift: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      imageWidth: this.size.width / this.numberOfImages,
      isPrevEnabled: false,
      isNextEnabled: true,
    }
  },
  watch: {
    currentImageIndex(newIndex, previousIndex) {
      if (
        newIndex > previousIndex &&
        newIndex === this.getFirstShownPreviewImageIndex() + this.numberOfImages
      ) {
        this.shiftPreviewLeft(1)
      } else if (
        previousIndex === this.getFirstShownPreviewImageIndex() &&
        newIndex < previousIndex
      ) {
        this.shiftPreviewRight(1)
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

    getFirstShownPreviewImageIndex() {
      const previewImage = this.$refs?.previewImage0?.[0]

      if (!previewImage) return null

      const currentMarginLeft = previewImage.style.marginLeft
        ? parseFloat(previewImage.style.marginLeft)
        : 0

      return Math.round(-currentMarginLeft / this.imageWidth)
    },

    checkIfPrevEnabled() {
      this.isPrevEnabled = this.getFirstShownPreviewImageIndex() !== 0
    },

    checkIfNextEnabled() {
      this.isNextEnabled =
        this.getFirstShownPreviewImageIndex() !==
        this.images.length - this.numberOfImages
    },

    shiftPreviewLeft(imagesToShift) {
      const currentMarginLeft = this.$refs.previewImage0[0].style.marginLeft
        ? parseFloat(this.$refs.previewImage0[0].style.marginLeft)
        : 0

      let shiftSteps = this.previewImagesToShift
      if (imagesToShift) {
        shiftSteps = imagesToShift
      } else if (
        this.getFirstShownPreviewImageIndex() +
          this.numberOfImages +
          this.previewImagesToShift >
        this.images.length
      ) {
        shiftSteps =
          this.images.length -
          this.getFirstShownPreviewImageIndex() -
          this.numberOfImages
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

      let shiftSteps = this.previewImagesToShift
      if (imagesToShift) {
        shiftSteps = imagesToShift
      } else if (
        this.getFirstShownPreviewImageIndex() < this.previewImagesToShift
      ) {
        shiftSteps = this.getFirstShownPreviewImageIndex()
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
}
</style>
