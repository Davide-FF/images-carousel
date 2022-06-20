<template>
  <div
    class="preview-ct"
    :style="{ maxWidth: size[0] + 'px', height: 0.2 * size[1] + 'px' }"
  >
    <div
      v-for="(image, index) in images"
      :key="image.name"
      :style="{ backgroundImage: `url(${image.url})` }"
      class="preview-img"
      :class="{ current: isCurrent(index) }"
    ></div>
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
      type: Array,
      default: () => [800, 450],
    },
  },
  computed: {
    imagesToShow() {
      const sideImages = (this.numberOfImages - 1) / 2

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
  },
  methods: {
    isCurrent(index) {
      return this.currentImageIndex === index
    },
  },
}
</script>

<style lang="postcss" scoped>
.preview-ct {
  @apply flex flex-row overflow-hidden justify-around align-middle items-center;

  & .preview-img {
    @apply bg-center bg-cover h-full bg-placeholder opacity-50;

    margin: 10px;
    min-width: 140px;

    &.current {
      @apply opacity-100;
    }
  }
}
</style>
