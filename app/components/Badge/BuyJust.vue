<template>
  <div
    class="buy__just lg:absolute"
    :class="{ 'top-extra': isContentCreatorSignUp, hidden: isPrivacy }"
  >
    <div
      class="flex items-center px-8 w-full justify-center py-1 mt-3 rounded-full bg-navy z-50 cursor-pointer select-none"
    >
      <img class="ml-1.5 mr-1" src="/images/just-pink.png" />
      <a
        href="https://trade.zoocoin.cash/trade/market?inputCurrency=FTM&outputCurrency=0x37c045be4641328dfeb625f1dde610d061613497"
        target="_blank"
        class="fs-16 text-white font-bold mr-1.5"
        >{{ $t('navbar.buyJust') }}</a
      >
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isPrivacy() {
      let routes = ['privacy-policy']
      return routes.includes(this.$nuxt.$route.name)
    },
    isContentCreatorSignUp() {
      return ['creator-signup'].includes(this.$nuxt.$route.name)
    },
  },
}
</script>

<style scoped>
.buy__just {
  /* position: absolute; */
  top: 1em;
  left: 5em;
}

.top-extra {
  top: 5em !important;
}
</style>
