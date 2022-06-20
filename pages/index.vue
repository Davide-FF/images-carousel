<template>
  <images-carousel
    :images="images"
    :loop="true"
    :number-of-images="5"
    :size="size"
  />
</template>

<script>
export default {
  data() {
    return {
      images: [
        { name: 'One', url: 'https://picsum.photos/800/450' },
        { name: 'Two', url: 'https://picsum.photos/801/451' },
        { name: 'Three', url: 'https://picsum.photos/802/452' },
        { name: 'Four', url: 'https://picsum.photos/799/449' },
        { name: 'Five', url: 'https://picsum.photos/798/450' },
        { name: 'Six', url: 'https://picsum.photos/798/451' },
        { name: 'Seven', url: 'https://picsum.photos/799/449' },
        { name: 'Eight', url: 'https://picsum.photos/801/451' },
        { name: 'Nine', url: 'https://picsum.photos/800/450' },
        // { name: 'Ten', url: 'https://picsum.photos/798/450' },
      ],
      size: [1000, 500],
    }
  },
}
</script>
