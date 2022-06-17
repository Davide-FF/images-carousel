<template>
  <images-carousel :images="images" />
</template>

<script>
export default {
  data() {
    return {
      images: [
        { name: 'One', url: 'https://picsum.photos/800/450' },
        { name: 'Two', url: 'https://picsum.photos/801/451' },
      ],
    }
  },
}
</script>
