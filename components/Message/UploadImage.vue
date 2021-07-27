<template>
  <div class="xl:px-4">
    <div class="bg-white dark:bg-black">
      <div class="xl:hidden pt-10 xl:pt-5 bg-white dark:bg-black px-2">
        <span
          class="flex justify-center py-3 font-semibold text-pink fs-12-res btn-letter-spacing border-b-2 border-lighter"
          >CREATE NEW POST</span
        >
      </div>
      <div
        class="p-5 xl:pt-0 my-5 xl:my-0 overflow-hidden bg-white dark:bg-black dark:bg-messages"
      >
        <div class="flex flex-col items-center subscription__cards">
          <span class="text-center mt-3">
            <img src="/images/up-arrow.png" />
          </span>
          <span class="text-center fs-36 dark:text-white">Upload Media</span>
          <div
            class="flex items-center rounded-full cursor-pointer border-primary action__item hover:bg-primary hover:text-white tab__action bg-primary text-white font-bold mt-3 py-2 px-16"
          >
            <span class="text-center font-semibold cursor-pointer btn-fs">
              Select
            </span>
          </div>

          <div class="text-center mt-16 xl:mt-10">
            <span class="dark:text-white">Set Price in JUST</span>
            <div
              class="flex items-center rounded-full cursor-pointer action__item hover:bg-primary hover:text-white tab__action bg-primary-transparent text-white font-bold mt-3 py-2 px-16"
            >
              <span
                class="text-center font-semibold cursor-pointer btn-fs ml-1 dark:text-white"
              >
                3500 JUST
              </span>
            </div>
          </div>

          <div
            class="flex items-center rounded-full cursor-pointer border-primary action__item hover:bg-primary hover:text-white tab__action bg-primary text-white font-bold mt-16 py-2 px-16 xl:mb-10"
          >
            <i class="material-icons"> check </i>
            <span class="text-center font-semibold cursor-pointer btn-fs ml-1">
              Finish Upload
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      caption: '',
      location: '',
      people: '',
      maxLength: 150,
    }
  },
  methods: {},
}
</script>
