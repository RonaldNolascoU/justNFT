<template>
  <div>
    <div
      v-if="!cookiesAccepted"
      class="fixed inset-x-0 bottom-0 z-50 cookie__disclaimer"
      :class="isLogin ? '' : 'relative xl:fixed top-0 xl:bottom-0 xl:top-auto'"
    >
      <div>
        <div
          class="p-2 bg-primary rounded-lg shadow-lg sm:p-3"
          :class="isLogin ? '' : 'rounded-none xl:rounded-lg'"
        >
          <div class="flex flex-wrap items-center justify-between">
            <div class="flex items-center flex-1 w-0">
              <span class="flex p-2 bg-white text-pink rounded-lg"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                  class="w-6 h-6 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  ></path></svg
              ></span>
              <p class="ml-3 text-white fs-14">
                <span>{{ $t('cookies.disclaimer') }}</span>
              </p>
            </div>
            <div class="flex-shrink-0 order-2 sm:order-3 sm:ml-2">
              <button
                aria-label="Dismiss"
                type="button"
                class="flex p-2 -mr-1 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-white"
                @click="closeDisclaimer"
              >
                <span class="sr-only">Dismiss</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                  class="w-6 h-6 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      let routes = ['signin', 'creator-signup']
      return routes.includes(this.$nuxt.$route.name)
    },
    cookiesAccepted() {
      return !!this.$store.state.cookies
    },
  },
  methods: {
    closeDisclaimer() {
      this.$cookies.set('jy_cookie_disclaimer', true)
      this.$store.commit('APPROVE_COOKIES')
    },
  },
}
</script>

<style>
.cookie__disclaimer {
}
</style>
