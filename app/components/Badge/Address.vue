<template>
  <div class="relative">
    <div
      class="px-5 py-1 border-solid rounded-full border-custom-gray fs-16 flex justify-center mt-5 xl:mt-0 cursor-pointer"
      :title="
        $store.state.general.wallet.address ||
        $store.state.auth.user.wallet_address ||
        '-'
      "
      @click.prevent.stop="toggleDropdown"
    >
      <input
        type="hidden"
        class="hidden"
        :value="
          $store.state.general.wallet.address ||
          $store.state.auth.user.wallet_address ||
          '-'
        "
        ref="address"
      />
      <span class="font-semibold text-gray">
        {{ formattedAddress || '-' }}
      </span>
    </div>
    <GeneralUserActionsDropdown
      v-if="isOpen"
      :open="isOpen"
      @hide="hide"
      @copy="copy"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    formattedAddress() {
      const { address } = this.$store.state.general.wallet
      const { wallet_address } = this.$store.state.auth.user

      if (address) {
        return (
          address.substr(0, 5) +
          '...' +
          address.substr(address.length - 5, address.length)
        )
      }

      if (wallet_address) {
        return (
          wallet_address.substr(0, 5) +
          '...' +
          wallet_address.substr(
            wallet_address.length - 5,
            wallet_address.length
          )
        )
      }
      return address
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    hide() {
      this.isOpen = false
    },
    copy() {
      navigator.clipboard.writeText(
        this.$store.state.general.wallet.address ||
          this.$store.state.auth.user.wallet_address ||
          ''
      )
    },
  },
}
</script>

<style></style>
