<template>
  <header>
    <div class="center">
      <nuxt-link :to="localePath('/')" :title="$t('common.homepage')">
        <Icon name="logo" class="logo" />
      </nuxt-link>
      <div class="nav-ct" :class="{ visible: visibleMenu }">
        <nav>
          <ul>
            <li
              v-for="section in sections"
              :key="section.ref"
              class="clickable"
            >
              <nuxt-link :to="localePath(section.path)" :title="section.name">
                {{ section.name }}
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <Button icon="search" class="button" @click="showSearchBar" />
        <Button icon="cart" class="button" @click="showCart" />
        <Button
          :value="$t('common.create')"
          class="button"
          @click="showCreationModal"
        />
        <div class="profile-bt"></div>
      </div>
    </div>
    <div
      class="menu-bt clickable"
      :class="{ opened: visibleMenu }"
      @click="toggleMenuVisibility()"
    >
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      visibleMenu: false,
    }
  },
  computed: {
    sections() {
      return [
        {
          path: '/genres',
          name: this.$t('common.genres'),
        },
        {
          path: '/creations',
          name: this.$t('common.creations'),
        },
        {
          path: '/makers',
          name: this.$t('common.makers'),
        },
      ]
    },
  },
  methods: {
    toggleMenuVisibility() {
      this.visibleMenu = !this.visibleMenu
    },
    hideMenu() {
      this.visibleMenu = false
    },
    showSearchBar() {
      // TODO
    },
    showCart() {
      // TODO
    },
    showCreationModal() {
      // TODO
    },
  },
}
</script>

<style lang="postcss" scoped>
header {
  @apply font-semibold select-none fixed top-0 left-0 right-0 bg-white shadow-md z-10;

  height: 85px;

  & .logo {
    @apply relative z-10;

    height: 40px;
    margin-top: 20px;
  }
  & .nav-ct {
    @apply float-right align-top;

    white-space: nowrap;
    margin-top: 20px;
    & nav {
      @apply inline-block align-top;
      & li {
        @apply inline-block text-lg text-black mr-6;

        line-height: 44px;
      }
    }
    & .button {
      @apply inline-block mr-2 align-top;
    }
    & .profile-bt {
      @apply inline-block bg-placeholder;

      width: 43px;
      height: 43px;
      border-radius: 50%;
    }
  }
  & .menu-bt {
    @apply absolute z-10 hidden;

    top: 19px;
    right: 15px;
    width: 34px;
    height: 39px;
    transition: transform 0.5s ease;
    & > .line {
      @apply bg-black;

      height: 2px;
      margin-bottom: 10px;
      border-radius: 1px;
      transform-origin: 50%;
      transition: transform 0.5s ease, opacity 0.5s ease;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &.opened {
      transform: translateX(15px);

      & > .line {
        &:first-child {
          transform: rotate(45deg) translateY(17px);
        }
        &:nth-child(2) {
          opacity: 0;
        }
        &:last-child {
          transform: rotate(-45deg) translateY(-17px);
        }
      }
    }
  }
}
@media only screen and (max-width: 980px) {
  header {
    @apply fixed;

    height: 65px;
    & .logo {
      height: 35px;
      margin-top: 15px;
    }
    & .nav-ct {
      @apply fixed right-0 bottom-0 left-0 bg-white mt-0 float-none opacity-0 transition duration-200 pointer-events-none;

      top: 64px;
      white-space: initial;
      padding-right: 25px;
      padding-left: 25px;
      transform: translateY(-40px);
      & nav {
        @apply block text-3xl mt-8 mb-10;
        & li {
          @apply block leading-none text-white mb-6;
        }
      }
      & .profile-bt {
        @apply mt-3;
      }
      &.visible {
        @apply opacity-100 pointer-events-auto;

        transform: none;
      }
    }
    & .menu-bt {
      @apply block;
    }
  }
}
</style>
