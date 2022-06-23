<template>
  <div class="main">
    <div class="title">TITOLO BELLO</div>
    <images-carousel
      :images="images"
      :loop="false"
      :size="size"
      preview="top"
      :number-of-preview-images="5"
      :preview-images-to-shift="1"
      :autoplay="2"
      :inverted-color-scheme="false"
    />
    <div class="text">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem nihil
      veniam nostrum dignissimos delectus fuga excepturi dolor porro fugiat,
      nulla dolore facilis sint sapiente odio, reprehenderit assumenda ut minus
      velit.
    </div>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quaerat
      natus corporis ipsa praesentium adipisci similique nihil distinctio cumque
      eius, expedita fugiat autem reiciendis quia veniam maiores ut doloremque
      iste?
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { name: 'One', url: 'https://picsum.photos/1920/1080' },
        { name: 'Two', url: 'https://picsum.photos/1280/720' },
        { name: 'Three', url: 'https://picsum.photos/1281/720' },
        { name: 'Four', url: 'https://picsum.photos/2560/1440' },
        { name: 'Five', url: 'https://picsum.photos/1282/720' },
        { name: 'Six', url: 'https://picsum.photos/1280/721' },
        { name: 'Seven', url: 'https://picsum.photos/1280/722' },
        { name: 'Eight', url: 'https://picsum.photos/1921/1080' },
        { name: 'Nine', url: 'https://picsum.photos/1922/1080' },
        { name: 'Ten', url: 'https://picsum.photos/1920/1081' },
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
.main {
  @apply bg-white;
}

.title {
  @apply pl-5;

  font-weight: 500;
  color: black;
}

.text {
  color: black;
}
</style>
