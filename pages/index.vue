<template>
  <div class="main">
    <div class="title">TITOLO BELLO</div>
    <images-carousel
      :images="images"
      :loop="false"
      :size="size"
      preview="right"
      :number-of-preview-images="5"
      :preview-images-to-shift="3"
      :autoplay="0"
    />
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem nihil
      veniam nostrum dignissimos delectus fuga excepturi dolor porro fugiat,
      nulla dolore facilis sint sapiente odio, reprehenderit assumenda ut minus
      velit.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { name: 'One', url: 'https://picsum.photos/1920/1080' },
        { name: 'Two', url: 'https://picsum.photos/960/540' },
        { name: 'Three', url: 'https://picsum.photos/1281/720' },
        { name: 'Four', url: 'https://picsum.photos/2560/1440' },
        { name: 'Five', url: 'https://picsum.photos/1200/675' },
        { name: 'Six', url: 'https://picsum.photos/1440/810' },
        { name: 'Seven', url: 'https://picsum.photos/2400/1350' },
        { name: 'Eight', url: 'https://picsum.photos/480/270' },
        { name: 'Nine', url: 'https://picsum.photos/800/450' },
        { name: 'Ten', url: 'https://picsum.photos/1280/720' },
      ],
      size: {
        width: 800,
        height: 500,
      },
    }
  },
}
</script>

<style lang="postcss" scoped>
.title {
  @apply pl-5;

  font-weight: 500;
}
</style>
