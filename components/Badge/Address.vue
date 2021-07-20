<template>
  <div
    class="px-5 py-1 border-solid rounded-full border-custom-gray fs-16 flex justify-center mt-5 xl:mt-0 cursor-pointer"
    :title="$store.state.auth.wallet.address"
  >
    <span class="font-semibold text-gray"> {{ formattedAddress }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    formattedAddress() {
      const { address } = this.$store.state.auth.wallet
      if (address.length > 4) {
        return (
          address.substr(0, 5) +
          '...' +
          address.substr(address.length - 5, address.length)
        )
      }
      return address || ''
    },
  },
}
</script>

<style></style>
