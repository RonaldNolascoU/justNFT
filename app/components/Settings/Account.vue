<template>
  <div class="flex-1 lg:overflow-y-auto">
    <div
      class="max-w-3xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8"
    >
      <h1 class="text-3xl font-extrabold text-blue-gray-900 dark:text-white">
        Account
      </h1>

      <form class="mt-6 space-y-8 divide-y divide-y-blue-gray-200" v-if="true">
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
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
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
              v-model="$store.state.auth.user.email"
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
            <!-- This example requires Tailwind CSS v2.0+ -->
            <!--
  Custom select controls like this require a considerable amount of JS to implement from scratch. We're planning
  to build some low-level libraries to make this easier with popular frameworks like React, Vue, and even Alpine.js
  in the near future, but in the mean time we recommend these reference guides when building your implementation:

  https://www.w3.org/TR/wai-aria-practices/#Listbox
  https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
-->
            <div>
              <label
                id="listbox-label"
                class="block text-sm font-medium text-gray-700"
              >
                Assigned to
              </label>
              <div class="mt-1 relative">
                <button
                  type="button"
                  class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  aria-haspopup="listbox"
                  aria-expanded="true"
                  aria-labelledby="listbox-label"
                >
                  <span class="block truncate"> Tom Cook </span>
                  <span
                    class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                  >
                    <!-- Heroicon name: solid/selector -->
                    <svg
                      class="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>

                <!--
      Select popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
                <ul
                  class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                  tabindex="-1"
                  role="listbox"
                  aria-labelledby="listbox-label"
                  aria-activedescendant="listbox-option-3"
                >
                  <!--
        Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

        Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
      -->
                  <li
                    class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                    id="listbox-option-0"
                    role="option"
                  >
                    <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                    <span class="font-normal block truncate">
                      Wade Cooper
                    </span>

                    <!--
          Checkmark, only display for selected option.

          Highlighted: "text-white", Not Highlighted: "text-indigo-600"
        -->
                    <span
                      class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4"
                    >
                      <!-- Heroicon name: solid/check -->
                      <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </li>

                  <!-- More items... -->
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
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

      <h1 v-else>Coming soon...</h1>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
