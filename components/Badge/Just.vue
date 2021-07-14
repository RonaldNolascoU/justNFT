<template>
  <div class="relative">
    <div
      class="relative flex items-center px-5 px-10 py-1 border-solid rounded-full border-custom-gray fs-16 dark:bg-white lg:dark:bg-transparent"
      @click="buyJust = !buyJust"
    >
      <img
        class="absolute self-start my-3 mr-2 lg:my-0 just-logo"
        src="~/assets/img/wallet-icon.png"
      />
      <span class="ml-3 font-semibold text-blue">54,000</span>
      <span class="ml-1 font-semibold text-primary">JUST</span>
    </div>
    <div
      v-if="buyJust"
      class="absolute flex items-center px-10 py-1 mt-3 rounded-full bg-navy z-50"
      :class="{ 'ease-in-out': buyJust }"
    >
      <img class="ml-1.5 mr-1" src="/images/just-pink.png" />
      <span class="fs-16 text-white font-bold mr-1.5">BUY JUST</span>
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
