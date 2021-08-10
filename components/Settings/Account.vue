<template>
  <div class="flex-1 lg:overflow-y-auto">
    <div
      class="max-w-3xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8"
    >
      <h1 class="text-3xl font-extrabold text-blue-gray-900 dark:text-white">
        Account
      </h1>

      <form
        @submit.prevent="onSubmit"
        class="mt-6 space-y-8 divide-y divide-y-blue-gray-200"
      >
        <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div class="sm:col-span-6">
            <h3 class="text-xl font-medium text-blue-gray-900 dark:text-white">
              Profile
            </h3>
            <p class="mt-1 text-sm text-blue-gray-500 dark:text-gray">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div class="sm:col-span-3 dark:bg-input">
            <label
              for="first-name"
              class="block text-sm font-medium text-blue-gray-900 dark:text-white"
            >
              First name
            </label>
            <input
              v-model="form.first_name"
              type="text"
              name="first-name"
              id="first-name"
              autocomplete="given-name"
              class="pl-2 mt-1 block w-full border-blue-gray-300 dark:text-white dark:text-white dark:border-none rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div class="sm:col-span-3 dark:bg-input">
            <label
              for="last-name"
              class="block text-sm font-medium text-blue-gray-900 dark:text-white"
            >
              Last name
            </label>
            <input
              v-model="form.last_name"
              type="text"
              name="last-name"
              id="last-name"
              autocomplete="family-name"
              class="pl-2 mt-1 block w-full border-blue-gray-300 dark:text-white dark:border-none rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div class="sm:col-span-6 dark:bg-input">
            <label
              for="username"
              class="block text-sm font-medium text-blue-gray-900 dark:text-white"
            >
              Username
            </label>
            <div class="mt-1 flex rounded-md shadow-sm">
              <input
                v-model="form.username"
                type="text"
                name="username"
                id="username"
                autocomplete="username"
                value="lisamarie"
                class="pl-2 flex-1 block w-full min-w-0 border-blue-gray-300 dark:text-white dark:border-none rounded-md text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div class="sm:col-span-6 dark:bg-input">
            <label
              for="photo"
              class="block text-sm font-medium text-blue-gray-900 dark:text-white"
            >
              Photo
            </label>
            <div class="mt-1 flex items-center">
              <img
                class="inline-block h-12 w-12 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
                alt=""
              />
              <div class="ml-4 flex">
                <div
                  class="relative bg-white py-2 px-3 border border-blue-gray-300 rounded-md shadow-sm flex items-center cursor-pointer hover:bg-blue-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 focus-within:ring-blue-500"
                >
                  <label
                    for="user-photo"
                    class="relative text-sm font-medium text-blue-gray-900 pointer-events-none"
                  >
                    <span>Change</span>
                    <span class="sr-only"> user photo</span>
                  </label>
                  <input
                    id="user-photo"
                    name="user-photo"
                    type="file"
                    accept="image/*"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                    @change="onChange"
                  />
                </div>
                <button
                  type="button"
                  class="ml-3 bg-transparent dark:text-white py-2 px-3 border border-transparent rounded-md text-sm font-medium text-blue-gray-900 hover:text-blue-gray-700 focus:outline-none focus:border-blue-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-gray-50 focus:ring-blue-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          <div class="sm:col-span-6 dark:bg-input">
            <label
              for="description"
              class="block text-sm font-medium text-blue-gray-900 dark:text-white"
            >
              Description
            </label>
            <div class="mt-1">
              <textarea
                v-model="form.description"
                id="description"
                name="description"
                rows="4"
                class="pl-2 block w-full border border-blue-gray-300 dark:text-white dark:border-none rounded-md shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <p class="mt-3 text-sm text-blue-gray-500 dark:text-gray">
              Brief description for your profile. URLs are hyperlinked.
            </p>
          </div>
        </div>

        <div class="pt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div class="sm:col-span-6">
            <h3 class="text-xl font-medium text-blue-gray-900 dark:text-white">
              Personal Information
            </h3>
            <p class="mt-1 text-sm text-blue-gray-500 dark:text-gray">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div class="sm:col-span-3 dark:bg-input">
            <label
              for="email-address"
              class="block text-sm font-medium text-blue-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="text"
              name="email-address"
              id="email-address"
              autocomplete="email"
              v-model="form.email"
              class="pl-2 mt-1 block w-full border-blue-gray-300 dark:text-white dark:border-none rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div class="sm:col-span-3 dark:bg-input">
            <label
              for="phone-number"
              class="block text-sm font-medium text-blue-gray-900 dark:text-white"
            >
              Phone number
            </label>
            <input
              v-model="form.number"
              type="text"
              name="phone-number"
              id="phone-number"
              autocomplete="tel"
              class="pl-2 mt-1 block w-full border-blue-gray-300 dark:text-white dark:border-none rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div class="sm:col-span-3 dark:bg-input">
            <label
              for="country"
              class="block text-sm font-medium text-blue-gray-900 dark:text-white"
            >
              Country
            </label>
            <input
              v-model="form.country"
              type="text"
              name="country"
              id="country"
              autocomplete="country"
              class="pl-2 mt-1 block w-full border-blue-gray-300 dark:text-white dark:border-none rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div class="pt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div class="sm:col-span-6">
            <h3 class="text-xl font-medium text-blue-gray-900 dark:text-white">
              Subscription Details
            </h3>
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
              v-model="form.subscription_rate"
              type="text"
              class="pl-2 mt-1 block w-full border-blue-gray-300 dark:text-white dark:border-none rounded-md shadow-sm text-blue-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <p class="text-sm text-blue-gray-500 dark:text-white sm:col-span-6">
            This account was created on
            <time datetime="2017-01-05T20:35:40"
              >January 5, 2017, 8:35:40 PM</time
            >.
          </p>
        </div>
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
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        username: '',
        description: '',
        email: '',
        photo: '',
        number: '',
        country: '',
        subscription_rate: '',
      },
    }
  },
  mounted() {
    this.form.email = this.$store.state.auth.user.email || ''
  },
  methods: {
    onSubmit() {
      let payload = new FormData()

      for (var key in this.form) {
        payload.append(key, this.form[key])
      }
    },
    onChange(e) {
      this.form.photo = e.target.files[0]
    },
  },
}
</script>

<style></style>
