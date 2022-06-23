<template>
  <div
    class="preview-ct"
    :style="previewSize"
    :class="{
      'display-top': position === 'top',
      'display-right': position === 'right',
      'display-left': position === 'left',
      'display-bottom': position === 'bottom',
      'inverted-color-scheme': invertedColorScheme,
    }"
    @touchstart="swipeStart"
    @touchend="swipeEnd"
  >
    <div
      v-for="(image, index) in images"
      :key="image.name"
      :ref="`previewImage${index}`"
      class="preview-img-ct"
      :class="{
        'no-padding-first': index === 0 && loop === false,
        'no-padding-last': index === images.length - 1 && loop === false,
      }"
      :style="{
        width: imageSize.width + 'px',
        height: imageSize.height + 'px',
      }"
      @click="clickPreviewImage(index)"
    >
      <div
        :style="{ backgroundImage: `url(${image.url})` }"
        class="preview-img"
        :class="{ current: isCurrent(index) }"
      ></div>
    </div>
    <div
      v-if="isPrevEnabled"
      class="preview-arrow-ct prev"
      @click="moveToPrev()"
    >
      <div class="preview-arrow">
        <icon name="arrow-right-compressed" class="icon" />
      </div>
    </div>
    <div
      v-if="isNextEnabled"
      class="preview-arrow-ct next"
      @click="moveToNext()"
    >
      <div class="preview-arrow">
        <icon name="arrow-right-compressed" class="icon" />
      </div>
    </div>
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
      required: true,
    },
    imagesToShift: {
      type: Number,
      default: 5,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'bottom',
      validator(value) {
        return ['top', 'right', 'bottom', 'left'].includes(value)
      },
    },
    invertedColorScheme: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isPrevEnabled: false,
      isNextEnabled: false,
      startSwipe: 0,
      endSwipe: 0,
    }
  },
  computed: {
    isAtSide() {
      return ['left', 'right'].includes(this.position)
    },

    previewSize() {
      if (this.isAtSide) {
        const width = 0.2 * this.size.width
        return `width: ${width}px; max-height: ${this.size.height}px`
      }

      const height = 0.2 * this.size.height
      return `max-width: ${this.size.width}px; height: ${height}px`
    },

    imageSize() {
      if (this.isAtSide) {
        const imageHeight = this.size.height / this.numberOfImages
        const imageWidth = this.size.width * 0.2
        return { width: imageWidth, height: imageHeight }
      }

      const imageHeight = this.size.height * 0.2
      const imageWidth = this.size.width / this.numberOfImages
      return { width: imageWidth, height: imageHeight }
    },
  },
  watch: {
    currentImageIndex(newIndex, previousIndex) {
      if (
        newIndex > previousIndex &&
        newIndex === this.getFirstPreviewIndex() + this.numberOfImages
      ) {
        this.moveToNext(1)
      } else if (
        previousIndex === this.getFirstPreviewIndex() &&
        newIndex < previousIndex
      ) {
        this.moveToPrev(1)
      } else if (newIndex === this.images.length - 1 && previousIndex === 0) {
        this.moveToNext(
          this.images.length - this.numberOfImages - this.getFirstPreviewIndex()
        )
      } else if (newIndex === 0 && previousIndex === this.images.length - 1) {
        this.moveToPrev(this.getFirstPreviewIndex())
      }
    },
  },
  mounted() {
    this.checkIfPrevEnabled()
    this.checkIfNextEnabled()
  },
  methods: {
    isCurrent(index) {
      return this.currentImageIndex === index
    },

    clickPreviewImage(index) {
      this.$emit('clickPreviewImage', index)
    },

    getFirstPreviewIndex() {
      const previewImage = this.$refs?.previewImage0?.[0]

      if (!previewImage) return null

      const selectMargin = this.isAtSide ? 'marginTop' : 'marginLeft'
      const imageDimension = this.isAtSide
        ? this.imageSize.height
        : this.imageSize.width

      const currentMargin = previewImage.style[selectMargin]
        ? parseFloat(previewImage.style[selectMargin])
        : 0
      return Math.round(-currentMargin / imageDimension)
    },

    checkIfPrevEnabled() {
      if (this.numberOfImages === this.images.length) {
        this.isPrevEnabled = false
        return
      }

      this.isPrevEnabled = this.loop || this.getFirstPreviewIndex() !== 0
    },

    checkIfNextEnabled() {
      if (this.numberOfImages === this.images.length) {
        this.isNextEnabled = false
        return
      }

      this.isNextEnabled =
        this.loop ||
        this.getFirstPreviewIndex() !== this.images.length - this.numberOfImages
    },

    moveToPrev(imagesToShift) {
      const axis = this.isAtSide ? 'y' : 'x'

      let shiftSteps = this.imagesToShift
      if (imagesToShift) {
        shiftSteps = imagesToShift
      } else if (this.getFirstPreviewIndex() < this.imagesToShift) {
        shiftSteps = this.getFirstPreviewIndex()
        if (shiftSteps === 0) {
          this.shiftPreview(this.numberOfImages - this.images.length, axis)
          return
        }
      }

      this.shiftPreview(shiftSteps, axis)
    },

    moveToNext(imagesToShift) {
      const axis = this.isAtSide ? 'y' : 'x'

      let shiftSteps = this.imagesToShift
      if (imagesToShift) {
        shiftSteps = imagesToShift
      } else if (
        this.getFirstPreviewIndex() + this.numberOfImages + this.imagesToShift >
        this.images.length
      ) {
        shiftSteps =
          this.images.length - this.getFirstPreviewIndex() - this.numberOfImages
        if (shiftSteps === 0) {
          this.shiftPreview(this.getFirstPreviewIndex(), axis)
          return
        }
      }

      this.shiftPreview(-shiftSteps, axis)
    },

    shiftPreview(shiftSteps, axis) {
      const previewImage = this.$refs?.previewImage0?.[0]
      const selectMargin = axis === 'x' ? 'marginLeft' : 'marginTop'
      const stepDimension =
        axis === 'x' ? this.imageSize.width : this.imageSize.height
      const currentMargin = previewImage.style[selectMargin]
        ? parseFloat(previewImage.style[selectMargin])
        : 0

      previewImage.style[selectMargin] =
        shiftSteps * stepDimension + currentMargin + 'px'

      this.checkIfNextEnabled()
      this.checkIfPrevEnabled()
    },

    swipeStart(e) {
      const { touches } = e
      if (touches && touches.length === 1) {
        const touchPosition = this.isAtSide
          ? touches[0].clientY
          : touches[0].clientX
        this.startSwipe = touchPosition
      }
    },

    swipeEnd(e) {
      const lastTouch = e.changedTouches[0]
      const touchPosition = this.isAtSide
        ? lastTouch.clientY
        : lastTouch.clientX
      this.endSwipe = touchPosition
      this.swipePreview()
    },

    swipePreview() {
      const touchMovement = this.endSwipe - this.startSwipe
      if (Math.abs(touchMovement) >= this.size.width / 4) {
        if (touchMovement < 0 && this.isNextEnabled) {
          this.moveToNext()
        } else if (touchMovement > 0 && this.isPrevEnabled) {
          this.moveToPrev()
        }
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.preview-ct {
  @apply flex flex-row relative overflow-hidden items-center;

  & .preview-img-ct {
    @apply px-2 h-full flex-shrink-0 cursor-pointer transition-all;

    & .preview-img {
      @apply bg-center bg-cover h-full w-full bg-placeholder opacity-50;

      &:hover {
        @apply opacity-100;
      }

      &.current {
        @apply opacity-100 px-0;
      }
    }
  }

  & .preview-arrow-ct {
    @apply absolute cursor-pointer bg-white;

    &.prev {
      transform-origin: 50% 50%;
      transform: rotate(180deg);
    }

    &.next {
      @apply right-0;
    }

    & .preview-arrow {
      @apply absolute opacity-70;

      width: 18px;
      height: 18px;

      & .icon {
        @apply absolute h-full;
      }
    }

    &:hover .preview-arrow {
      @apply opacity-100;
    }
  }

  &.inverted-color-scheme {
    & .preview-arrow-ct {
      @apply bg-black;

      & .preview-arrow svg path {
        fill: #fff;
      }
    }
  }

  &.display-bottom,
  &.display-top {
    & .preview-img-ct {
      @apply px-1;

      &.no-padding-first {
        @apply pl-0;
      }

      &.no-padding-last {
        @apply pr-0;
      }
    }

    & .preview-arrow-ct {
      width: 18px;
      height: calc(100% + 2px);

      & .preview-arrow {
        @apply right-0;

        top: calc(50% - 9px);
      }

      &.next {
        @apply absolute bottom-0;
      }
    }
  }

  &.display-left,
  &.display-right {
    @apply flex-col h-full;

    & .preview-img-ct {
      @apply py-1;

      &.no-padding-first {
        @apply pt-0;
      }

      &.no-padding-last {
        @apply pb-0;
      }
    }

    & .preview-arrow-ct {
      height: 14px;
      width: calc(100% + 2px);

      & .preview-arrow {
        @apply top-0;

        right: calc(50% - 9px);
      }

      &.next {
        @apply absolute bottom-0;
      }

      &.next .preview-arrow {
        transform: rotate(90deg);
      }

      &.prev .preview-arrow {
        left: calc(50% - 9px);
        bottom: 5px;
        transform-origin: 50% 50%;
        transform: rotate(90deg);
      }
    }

    &.display-bottom,
    &.display-top {
      &.preview-img-ct.prev .preview-arrow {
        @apply absolute;

        left: calc(50% - 9px);
        bottom: 5px;
      }
    }
  }
}
</style>
