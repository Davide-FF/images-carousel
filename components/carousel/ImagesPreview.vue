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
  },
  data() {
    return {
      imageWidth: this.size.width / this.numberOfImages,
    }
  },
  watch: {
    currentImageIndex(newIndex, previousIndex) {
      const currentMarginLeft = this.$refs.previewImage0[0].style.marginLeft
        ? parseFloat(this.$refs.previewImage0[0].style.marginLeft)
        : 0
      const firstShownPreviewImageIndex = this.getFirstShownPreviewImageIndex()
      if (
        newIndex - firstShownPreviewImageIndex >= this.numberOfImages &&
        previousIndex < newIndex
      ) {
        this.$refs.previewImage0[0].style.marginLeft =
          -this.imageWidth + currentMarginLeft + 'px'
      } else if (newIndex < firstShownPreviewImageIndex) {
        this.$refs.previewImage0[0].style.marginLeft =
          this.imageWidth + currentMarginLeft + 'px'
      }
    },
  },
  methods: {
    isCurrent(index) {
      return this.currentImageIndex === index
    },
    clickPreviewImage(index) {
      this.$emit('clickPreviewImage', index)
    },
    getFirstShownPreviewImageIndex() {
      const currentMarginLeft = this.$refs.previewImage0[0].style.marginLeft
        ? parseFloat(this.$refs.previewImage0[0].style.marginLeft)
        : 0
      return Math.round(-currentMarginLeft / this.imageWidth)
    },
  },
}
</script>

<style lang="postcss" scoped>
.preview-ct {
  @apply flex flex-row overflow-hidden items-center transition-all;

  & .preview-img-ct {
    @apply px-2 h-full flex-shrink-0 cursor-pointer;

    & .preview-img {
      @apply bg-center bg-cover h-full w-full bg-placeholder opacity-60;

      &.current {
        @apply opacity-100;
      }
    }
  }
}
</style>
