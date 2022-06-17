<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
    <NotificationCenter />
  </div>
</template>
<script>
export default {
}
</script>
<style lang="postcss">
html {
  @apply font-sans;

  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
