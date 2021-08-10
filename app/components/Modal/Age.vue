<template>
  <client-only>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <!-- <div
      class="fixed z-50 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        >
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <svg
                class="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Warning
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">Are you 18 or older?</p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
            <button
              type="button"
              class="bg-primary inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
            >
              Yes
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-navy text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div> -->

    <div>
      <div class="age__modal">
        <p class="text-center">Are you 18 or older?</p>
        <div class="actions mt-2 flex justify-evenly">
          <button
            class="bg-primary rounded-xl px-10 xl:px-16 py-1 mr-3 text-white"
            @click="goToHomepage"
          >
            Yes
          </button>
          <button
            class="bg-navy rounded-xl px-10 xl:px-16 py-1 text-white"
            @click="returnBack"
          >
            No
          </button>
        </div>
      </div>
      <div class="overlay"></div>
    </div>
  </client-only>
</template>

<script>
export default {
  methods: {
    goToHomepage() {
      this.$cookies.set('justyours_modal_age', true, {
        path: '/',
        maxAge: 86400 * 365,
      })
      this.$store.commit('CLOSE_AGE_MODAL', true)
      this.$router.push('/')
    },
    returnBack() {
      window.location.href = 'https://google.com'
    },
  },
}
</script>

<style lang="scss" scoped>
.age__modal {
  font-size: 24px;
  padding: 1em 2em;
  font-weight: 500;
  background: #efefef;
  box-shadow: inset 0px 4px 96px rgba(13, 13, 13, 0.53);
  border-radius: 46px;
  @media (max-width: 1279px) {
    font-size: 16px;
  }
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 99999;
  transform: translate(-50%, -50%);
}

.overlay {
  background: rgba(0, 0, 0, 0.87);
  inset: 0px;
  opacity: 1;
  pointer-events: initial;
  position: fixed;
  transition: opacity 220ms ease 0s;
  z-index: 500;
}
</style>
