<template>
  <div class="relative">
    <div
      class="relative flex items-center px-5 px-10 py-1 border-solid rounded-full border-custom-gray fs-16 dark:bg-white lg:dark:bg-transparent cursor-pointer"
      @click="buyJust = !buyJust"
    >
      <nuxt-img
        class="absolute self-start my-3 mr-2 xl:my-0 just-logo"
        src="/images/wallet-icon.png"
      />
      <span class="ml-3 font-semibold text-blue">{{
        $store.state.auth.wallet.balance || 0
      }}</span>
      <span class="ml-1 font-semibold text-primary">JUST</span>
    </div>
    <div
      v-if="buyJust"
      class="absolute flex items-center px-10 py-1 mt-3 rounded-full bg-navy z-50 cursor-pointer select-none"
      :class="{ 'ease-in-out': buyJust }"
    >
      <nuxt-img class="ml-1.5 mr-1" src="/images/just-pink.png" />
      <a
        href="https://trade.zoocoin.cash/trade/market?inputCurrency=FTM&outputCurrency=0xC8Da1a26ABEF9e2E41B4C89c1b345Cc05ce034e8"
        target="_blank"
        class="fs-16 text-white font-bold mr-1.5"
        >{{ $t('navbar.buyJust') }}</a
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buyJust: false,
    }
  },
}
</script>

<style></style>
