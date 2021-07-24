<template>
  <div
    v-if="cookieDisclaimer"
    :class="[
      ' lg:absolute left-0 bottom-0 bg-primary w-full flex justify-center items-center text-white  lg:mb-0 lg:mt-3 py-4 px-3',
      isLogin ? 'absolute' : 'relative',
    ]"
  >
    <span class="font-bold fs-10 mr-5 text-center">{{
      $t('cookies.disclaimer')
    }}</span>
    <div @click="closeDisclaimer">
      <span class="material-icons-outlined cursor-pointer"> close </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cookieDisclaimer: false,
    }
  },
  computed: {
    isLogin() {
      let routes = ['signin', 'creator-signup']
      console.log(this.$nuxt.$route.name)
      return routes.includes(this.$nuxt.$route.name)
    },
  },
  created() {
    if (!this.$cookies.get('jy_cookie_disclaimer')) {
      this.cookieDisclaimer = true
    }
  },
  methods: {
    closeDisclaimer() {
      this.cookieDisclaimer = false
      this.$cookies.set('jy_cookie_disclaimer', true)
    },
  },
}
</script>

<style></style>
