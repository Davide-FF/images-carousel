<template>
  <div class="carousel-ct">
    <div
      class="carousel-img"
      :style="{ backgroundImage: `url(${images[currentImageIndex].url})` }"
    >
      <div v-if="isPrevEnabled" class="arrow-ct left" @click="previousImage">
        <div class="arrow">
          <icon name="arrow-right-compressed" type="primary" class="icon" />
        </div>
      </div>
      <div v-if="isNextEnabled" class="arrow-ct right" @click="nextImage">
        <div class="arrow">
          <icon name="arrow-right-compressed" type="primary" class="icon" />
        </div>
      </div>
      <!-- TODO: Images carousel List -->
    </div>
    {{ images[currentImageIndex].name }}
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
      validator(items) {
        for (const item of items) {
          if (!item.name || !item.url) return false
        }
        return true
      },
    },
    defaultImageIndex: {
      type: Number,
      default: 0,
    },
    isPlaceHolder: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentImageIndex: 0,
    }
  },

  computed: {
    isPrevEnabled() {
      if (this.loop) return true
      return this.currentImageIndex > 0
    },
    isNextEnabled() {
      if (this.loop) return true
      return this.currentImageIndex < this.images.length - 1
    },
  },

  created() {
    this.currentImageIndex = this.defaultImageIndex
  },

  methods: {
    nextImage() {
      if (this.currentImageIndex === this.images.length - 1) {
        this.currentImageIndex = 0
      } else {
        this.currentImageIndex += 1
      }
    },
    previousImage() {
      if (this.currentImageIndex === 0) {
        this.currentImageIndex = this.images.length - 1
      } else {
        this.currentImageIndex -= 1
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.carousel-ct {
  @apply flex;

  width: 800px;
  height: 450px;

  & .carousel-img {
    @apply absolute w-full h-5/6 top-0 left-0 bg-cover bg-placeholder;

    & .arrow-ct {
      @apply absolute h-full cursor-pointer w-1/12;

      &:hover {
        @apply bg-gradient-to-l from-transparent-white bg-opacity-20;

        /* background: linear-gradient(circle, rgba(0,0,0,0), rgba(255, 255, 255, 1)) */
      }

      &.left {
        transform-origin: 50% 50%;
        transform: rotate(-180deg);
      }

      &.right {
        @apply right-0;
      }

      & .arrow {
        @apply absolute;

        height: 36px;
        top: calc(50% - 18px);
        left: calc(50% - 18px);

        & .icon {
          @apply h-full;
        }
      }
    }
  }
}
</style>
