<template>
  <div class="full__layout">
    <div class="block xl:hidden">
      <client-only>
        <LayoutCookiesDisclaimer />
      </client-only>
    </div>
    <div
      :class="[
        'pb-8 lg:p-5 xl:overflow-hidden xl:p-0 dark:bg-black layout-container',
        { 'h-screen': scroll },
      ]"
    >
      <ModalAge v-if="$store.state.modals.age" />
      <div class="xl:container">
        <LayoutNavbar />
      </div>
      <div class="infinity-divider w-screen hidden xl:block"></div>
      <div
        id="body-container"
        class="flex flex-wrap w-full xl:container pb-10 md:h-screen"
      >
        <div
          class="flex-col justify-start hidden px-2 pt-12 sidebar-container xl:flex"
        >
          <LayoutSidebar />
        </div>
        <div
          class="w-full lg:border-l lg:border-lighter page-container xl:w-full overflow-hidden"
          :class="[{ 'xl:overflow-y-scroll md:h-screen': !scroll }]"
        >
          <Nuxt />
        </div>
      </div>
      <div class="hidden xl:block">
        <client-only>
          <LayoutCookiesDisclaimer />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FullLayout',
  middleware: ['router-auth'],
  computed: {
    scroll() {
      let routes = ['subscriptions']
      return routes.includes(this.$nuxt.$route.name)
    },
  },
  mounted() {
    if (
      ['dark', 'system'].includes(this.$colorMode.preference) &&
      !this.$store.state.darkMode
    ) {
      this.$store.commit('TOGGLE_DARK_MODE')
    }
  },
}
</script>

<style scoped lang="scss">
.full__layout {
  .page-container {
    width: auto;
    @media (max-width: 1280px) {
      width: 100%;
    }
  }
}
</style>
