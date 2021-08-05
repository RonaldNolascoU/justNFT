<template>
  <div class="flex-1 lg:overflow-y-auto">
    <div
      class="max-w-3xl mx-auto pt-10 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8"
    >
      <h1 class="text-3xl font-extrabold text-blue-gray-900 dark:text-white">
        Security
      </h1>

      <form
        class="mt-6 space-y-8 divide-y divide-y-blue-gray-200"
        @submit.prevent="onSubmit"
      >
        <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div class="sm:col-span-6">
            <h3 class="text-xl font-medium text-blue-gray-900 dark:text-white">
              Password
            </h3>
            <p class="mt-1 text-sm text-blue-gray-500 dark:text-gray">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              quidem corporis veritatis dolorum saepe, rerum numquam culpa harum
              fugiat unde dolores perspiciatis vel non recusandae? Odio fugit
              ipsum maiores tempora!
            </p>
          </div>

          <div class="sm:col-span-6 dark:bg-input">
            <label
              for="first-name"
              class="block text-sm font-medium text-blue-gray-900 dark:text-white"
            >
              {{ $t('passwords.old_password') }}
            </label>
            <input
              type="password"
              v-model="form.old_password"
              class="pl-2 mt-1 block w-full border-blue-gray-300 dark:text-white dark:text-white dark:border-none rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div class="sm:col-span-6 dark:bg-input">
            <label
              for="last-name"
              class="block text-sm font-medium text-blue-gray-900 dark:text-white"
            >
              {{ $t('passwords.new_password') }}
            </label>
            <input
              type="password"
              v-model="form.new_password"
              class="pl-2 mt-1 block w-full border-blue-gray-300 dark:text-white dark:border-none rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="sm:col-span-6 dark:bg-input">
            <label
              for="last-name"
              class="block text-sm font-medium text-blue-gray-900 dark:text-white"
            >
              {{ $t('passwords.confirm_password') }}
            </label>
            <input
              type="password"
              v-model="form.confirm_password"
              class="pl-2 mt-1 block w-full border-blue-gray-300 dark:text-white dark:border-none rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <span
          v-if="passChanged"
          class="fs-16 text-primary font-semibold w-full"
          >{{ $t('passwords.success_mgs') }}</span
        >
        <span class="text-primary font-bold fs-24" v-if="error">{{
          error
        }}</span>

        <div class="pt-8 flex justify-end">
          <button
            type="button"
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {{ $t('passwords.btn') }}
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
      form: {
        old_password: null,
        new_password: null,
        confirm_password: null,
      },
      loading: false,
      passChanged: false,
      error: null,
      mode: 'user',
    }
  },
  methods: {
    ...mapActions('general', ['changePassword', 'changePasswordCreator']),
    onSubmit() {
      if (this.loading) return
      this.loading = true
      let payload = {
        password: this.form.old_password,
        new_password: this.form.new_password,
      }

      let changeFunction =
        this.mode == 'user'
          ? this.changePassword(payload)
          : this.changePasswordCreator(payload)

      changeFunction
        .then(() => {
          this.success = true
          this.form = { old_password: null, new_password: null }
          this.loading = false
          this.error = null
        })
        .catch((err) => {
          this.success = false
          this.loading = false
          this.error = err
        })
    },
  },
}
</script>

<style></style>
