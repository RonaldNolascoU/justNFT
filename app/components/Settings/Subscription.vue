<template>
  <div class="flex-1 lg:overflow-y-auto">
    <div
      class="max-w-3xl mx-auto pt-10 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8"
    >
      <h1 class="text-3xl font-extrabold text-blue-gray-900 dark:text-white">
        Subscription
      </h1>

      <form
        class="space-y-8 divide-y divide-y-blue-gray-200"
        @submit.prevent="onSubmit"
      >
        <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div class="sm:col-span-6">
            <p class="mt-1 text-sm text-blue-gray-500 dark:text-gray">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div class="sm:col-span-6 dark:bg-input">
            <label
              for="email-address"
              class="block text-sm font-medium text-blue-gray-900 dark:text-white"
            >
              Subscription Rate
            </label>
            <input
              type="text"
              v-model="rate"
              class="pl-2 mt-1 block w-full border-blue-gray-300 dark:text-white dark:border-none rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div class="pt-8 flex justify-end">
          <button
            type="submit"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {{ $t('general.save') }}
            <GeneralLoader v-if="loading" />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      rate: null,
      loading: false,
    }
  },
  methods: {
    ...mapActions('subscriptions', ['updateRate']),
    onSubmit() {
      if (this.loading) return
      this.loading = true

      this.updateRate()
        .then((response) => {
          // const { success } = response
          console.log(response)
          this.$auth.setUser({ ...this.$auth.user, rate: this.rate })
          this.loading = false
          this.error = null
        })
        .catch((err) => {
          this.loading = false
        })
    },
  },
}
</script>

<style></style>
