<template>
  <div
    class="carousel-ct"
    :style="{ backgroundImage: `url(${images[defaultImage].url})` }"
  >
    {{images[defaultImage].name}}
    <slot name="images-carousel-list"></slot>
  </div>
</template>

<script>
export default {
  props: {
    images: [
      {
        name: { type: String, default: '' },
        url: { type: String, default: '' },
      },
    ],
    defaultImage: {
      type: Number,
      default: 0,
    },
  },
  // render(h, context) {
  //   return context.props.url
  // }
}
</script>

<style lang="postcss" scoped>
.carousel-ct {
  @apply flex;

  width: 800px;
  height: 450px;
  background-size: cover;
}
</style>
