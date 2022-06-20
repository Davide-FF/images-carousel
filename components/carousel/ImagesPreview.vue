<template>
  <div class="preview-ct">
    <div
      v-for="image in imagesToShow"
      :key="image.name"
      :style="{ backgroundImage: `url(${image.url})` }"
      class="preview-img"
      :class="{ current: isCurrent(image.name) }"
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
  },
  computed: {
    imagesToShow() {
      const sideImages = (this.numberOfImages - 1) / 2
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
  },
  methods: {
    isCurrent(imageName) {
      return this.images[this.currentImageIndex].name === imageName
    },
  },
}
</script>

<style lang="postcss" scoped>
.preview-ct {
  @apply flex flex-row justify-around align-middle items-center;

  & .preview-img {
    @apply bg-center bg-cover h-full flex-grow bg-placeholder opacity-50;

    margin: 10px;
    max-width: 20%;

    &.current {
      @apply opacity-100;
    }
  }
}
</style>
