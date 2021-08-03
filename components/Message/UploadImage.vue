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
            <button
              class="text-center font-semibold cursor-pointer btn-fs"
              @click="onPickFile"
            >
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

          <div class="text-center mt-16 xl:mt-10">
            <span class="dark:text-white">Set Price in JUST</span>
            <input
              class="rounded-full cursor-pointer action__item hover:bg-primary hover:text-white tab__action bg-primary-transparent text-white font-bold mt-3 p-2"
              type="text"
            />
          </div>

          <div
            class="flex items-center rounded-full cursor-pointer border-primary action__item hover:bg-primary hover:text-white tab__action bg-primary text-white font-bold mt-16 py-2 px-16 xl:mb-10"
            @click="finish"
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
      image: null,
      url: '',
      price: '',
    }
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click()
    },
    onFilePicked(event) {
      const files = event.target.files
      let filename = files[0].name
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })

      fileReader.readAsDataURL(files[0])
      this.image = files[0]
      this.url = URL.createObjectURL(files[0])
    },
    finish() {
      this.$emit('imgUploaded', { url: this.url, price: this.price })
    },
  },
}
</script>
