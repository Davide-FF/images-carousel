<template>
  <div class="main">
    <div class="title">TITOLO BELLO</div>
    <div class="text">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem nihil
      veniam nostrum dignissimos delectus fuga excepturi dolor porro fugiat,
      nulla dolore facilis sint sapiente odio, reprehenderit assumenda ut minus
      velit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
      quaerat natus corporis ipsa praesentium adipisci similique nihil
      distinctio cumque eius, expedita fugiat autem reiciendis quia veniam
      maiores ut doloremque iste? Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Eius dicta alias officia quo cumque perferendis
      veritatis repellendus nam fugiat aut, quam impedit exercitationem quis
      beatae, explicabo veniam, laborum atque voluptatibus? Lorem ipsum dolor,
      sit amet consectetur adipisicing elit. Facilis, eligendi veritatis autem
      earum similique tempore voluptatum ad cum, quasi asperiores rerum modi
      maiores, accusamus magni eaque animi. Eveniet, quibusdam rerum?
    </div>
    <images-carousel
      class="carousel"
      :images="images"
      :size="size"
      :loop="false"
      preview="right"
      :number-of-preview-images="5"
      :preview-images-to-shift="3"
      :autoplay="0"
      :inverted-color-scheme="false"
    />
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
        width: 760,
        height: 380,
      },
    }
  },

  mounted() {
    window.innerWidth <= 980
      ? (this.size = { width: 360, height: 180 })
      : (this.size = { width: 760, height: 380 })
    window.addEventListener('resize', this.adjustSize)
  },

  methods: {
    adjustSize() {
      window.innerWidth <= 980
        ? (this.size = { width: 360, height: 180 })
        : (this.size = { width: 760, height: 380 })
    },
  },
}
</script>

<style lang="postcss" scoped>
.main {
  @apply bg-white;

  & .carousel {
    @apply mt-5;
  }
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
