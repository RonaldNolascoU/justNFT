<template>
  <div class="xl:px-4">
    <div class="bg-white dark:bg-black">
      <div
        class="p-5 xl:pt-0 my-5 xl:my-0 overflow-hidden bg-white dark:bg-black dark:bg-messages"
      >
        <div class="flex flex-col items-center subscription__cards">
          <span class="text-center mt-3">
            <img src="/images/up-arrow.png" />
          </span>
          <span class="text-center fs-36 dark:text-white">Upload Media</span>
          <div
            v-if="!url"
            class="flex items-center rounded-full cursor-pointer border-primary action__item hover:bg-primary hover:text-white tab__action bg-primary text-white font-bold mt-3 py-2 px-16"
            @click="onPickFile"
          >
            <button class="text-center font-semibold cursor-pointer btn-fs">
              Select
            </button>
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/*"
              @change="onFilePicked"
            />
          </div>

          <div v-if="url" class="mt-5 text-center">
            <img class="" :src="url" />
            <div class="flex justify-center">
              <button
                class="flex items-center rounded-full cursor-pointer border-primary action__item hover:bg-primary hover:text-white tab__action bg-primary text-center text-white font-bold mt-3 p-2"
                @click.prevent.stop="url = null"
              >
                <span
                  class="material-icons-outlined text-center font-semibold cursor-pointer btn-fs"
                >
                  cancel
                </span>
              </button>
            </div>
          </div>

          <div :class="['text-center', !url ? 'mt-16 xl:mt-10' : 'mt-5']">
            <span class="dark:text-white">Set Price in JUST</span>
            <input
              v-model="price"
              class="rounded-full cursor-pointer action__item hover:bg-primary hover:text-white tab__action bg-primary-transparent text-white font-bold mt-3 p-2"
              type="text"
              required
              @keypress="onlyNumber"
            />
          </div>

          <div
            class="flex items-center rounded-full cursor-pointer border-primary action__item hover:bg-primary hover:text-white tab__action bg-primary text-white font-bold mt-16 py-2 px-16 xl:mb-10"
            @click.prevent.stop="finish"
          >
            <i class="material-icons"> check </i>
            <span class="text-center font-semibold cursor-pointer btn-fs ml-1">
              Finish Upload
            </span>
          </div>
          <div :class="{ 'py-10 xl:py-0': url }"></div>
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
      url: '',
      price: '',
    }
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click()
    },
    onFilePicked(event) {
      this.url = URL.createObjectURL(event.target.files[0])
    },
    finish() {
      this.$emit('imgUploaded', { url: this.url, price: this.price })
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault()
      }
    },
  },
}
</script>
