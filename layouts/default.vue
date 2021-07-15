<template>
  <div
    class="px-2 pt-5 pb-8 lg:p-5 xl:overflow-hidden xl:p-0 dark:bg-black layout-container"
  >
    <ModalAge v-if="$store.state.modals.age" />
    <div class="xl:container">
      <LayoutNavbar />
    </div>
    <div class="infinity-divider w-screen hidden xl:block"></div>
    <div
      id="body-container"
      class="flex flex-wrap w-full xl:container pb-10 xl:h-screen"
    >
      <div
        class="flex-col justify-start hidden px-2 pt-12 sidebar-container xl:flex"
      >
        <LayoutSidebar />
      </div>
      <div
        class="w-full xl:h-screen xl:overflow-y-scroll xl:pb-20 xl:border-l xl:border-r border-lighter page-container xl:w-full xl:pt-12"
      >
        <Nuxt />
      </div>
      <div
        class="hidden xl:flex items-start justify-center pt-12 pb-20 suggestions-container"
      >
        <LayoutSuggestions />
      </div>
    </div>
  </div>
</template>

<script>
import getCookie from '@/scripts/cookies.js'
export default {
  // middleware: ['router-auth'],
  mounted() {
    if (
      ['dark', 'system'].includes(this.$colorMode.preference) &&
      !this.$store.state.darkMode
    ) {
      this.$store.commit('TOGGLE_DARK_MODE')
    }

    let modalAge = getCookie('justyours_modal_age')
    if (modalAge) {
      this.$store.commit('CLOSE_AGE_MODAL')
    }
  },
}
</script>

<style>
#wrap-container,
#scroll-suggestion {
  /* overflow-y: scroll; */
  height: 100vh;
  @media (max-width: 1279px) {
    height: 100% !important;
  }
}
html {
  /* font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif; */
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
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
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
