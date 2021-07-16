<template>
  <div class="xl:px-4">
    <div
      class="bg-white shadow-lg rounded-3xl subscriptions dark:bg-black dark:custom-box-shadow"
    >
      <div
        class="sub_nav fixed xl:hidden z-20 top-0 pt-5 bg-white dark:bg-black px-2"
      >
        <span
          class="flex justify-center py-3 font-semibold text-pink fs-20 btn-letter-spacing border-b-2 border-lighter"
          >CREATE NEW POST</span
        >
      </div>
      <span
        class="hidden xl:flex justify-center py-3 font-semibold text-white rounded-t-3xl bg-primary fs-20 hidden"
        >Create New Post</span
      >
      <div id="subs__container" class="p-5 my-5 overflow-hidden">
        <div
          class="flex flex-col items-center subscription__cards xl:h-screen xl:overflow-y-scroll pt-8 xl:pt-0"
        >
          <span class="text-center mt-3">
            <img src="/images/up-arrow.png" />
          </span>
          <span class="text-center fs-36">Upload Media</span>
          <div
            class="flex items-center rounded-full cursor-pointer border-primary action__item hover:bg-primary hover:text-white tab__action bg-primary text-white font-bold mt-3 py-2 px-16"
          >
            <span class="text-center font-semibold cursor-pointer btn-fs">
              Select
            </span>
          </div>

          <div class="upload-form w-11/12">
            <div class="relative">
              <div class="mt-5">
                <b class="fs-16">Add Caption</b>
              </div>
              <input
                v-model="caption"
                type="text"
                class="w-full bg-pink-10 rounded-full pink-inputs break-words mt-1"
                :maxlength="maxLength"
              />
              <b class="chart-counter absolute">
                <span>{{ maxLength - caption.length }}</span>
                <span class="text-pink">/{{ maxLength }}</span>
              </b>
            </div>
            <div>
              <div class="mt-5">
                <b class="fs-16">
                  Add Location <i class="text-pink">(Optional)</i>
                </b>
              </div>
              <input
                v-model="location"
                type="text"
                class="w-full bg-pink-10 rounded-full pink-inputs mt-1"
              />
            </div>
            <div>
              <div class="mt-5">
                <b class="fs-16">Tag People</b>
              </div>
              <input
                v-model="people"
                type="text"
                class="w-full bg-pink-10 rounded-full pink-inputs mt-1"
              />
            </div>
          </div>
          <div
            class="flex items-center rounded-full cursor-pointer border-primary action__item hover:bg-primary hover:text-white tab__action bg-primary text-white font-bold mt-10 py-2 px-16"
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
