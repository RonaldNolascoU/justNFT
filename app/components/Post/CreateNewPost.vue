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
          <template v-if="!form.url">
            <span class="text-center mt-3">
              <img src="/images/up-arrow.png" />
            </span>
            <span class="text-center fs-36 dark:text-white">Upload Media</span>
          </template>

          <div
            v-if="!form.url"
            class="flex items-center rounded-full cursor-pointer border-primary action__item hover:bg-primary hover:text-white tab__action bg-primary text-white font-bold mt-3 py-2 px-16"
            @click="$refs.fileInput.click()"
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

          <div v-if="form.url" class="mt-5 text-center">
            <img class="" :src="form.url" />
            <div class="flex justify-center">
              <button
                class="flex items-center rounded-full cursor-pointer border-primary action__item hover:bg-primary hover:text-white tab__action bg-primary text-center text-white font-bold mt-3 p-2"
                @click.prevent.stop="form.url = null"
              >
                <span
                  class="material-icons-outlined text-center font-semibold cursor-pointer btn-fs"
                >
                  cancel
                </span>
              </button>
            </div>
          </div>

          <div class="upload-form w-11/12">
            <div class="relative">
              <div class="mt-5">
                <b class="fs-16 dark:text-white">Add Caption</b>
              </div>
              <input
                v-model="form.caption"
                type="text"
                class="w-full bg-pink-10 rounded-full pink-inputs break-words mt-1 dark:text-white"
                :maxlength="maxLength"
              />
              <b class="chart-counter absolute">
                <span class="dark:text-white">{{
                  maxLength - form.caption.length
                }}</span>
                <span class="text-pink">/{{ maxLength }}</span>
              </b>
            </div>
            <div>
              <div class="mt-5">
                <b class="fs-16 dark:text-white">
                  Add Location <i class="text-pink">(Optional)</i>
                </b>
              </div>
              <input
                v-model="form.location"
                type="text"
                class="w-full bg-pink-10 rounded-full pink-inputs mt-1 dark:text-white"
              />
            </div>
            <div>
              <div class="mt-5">
                <b class="fs-16 dark:text-white">Tag People</b>
              </div>
              <input
                v-model="form.people"
                type="text"
                class="w-full bg-pink-10 rounded-full pink-inputs mt-1 dark:text-white"
              />
            </div>
          </div>
          <div
            class="flex items-center rounded-full cursor-pointer border-primary action__item hover:bg-primary hover:text-white tab__action bg-primary text-white font-bold mt-10 py-2 px-16"
            @click="add"
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
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      form: {
        caption: '',
        location: '',
        people: '',
        url: null,
        file: null,
        message: '',
      },
      maxLength: 150,
    }
  },
  methods: {
    ...mapActions('general', ['addPost']),
    add() {
      let payload = new FormData()

      for (var key in this.form) {
        payload.append(key, this.form[key])
      }

      this.form.id = 4
      this.form.user = 'Foo Bar'
      this.form.likes = '0'
      this.form.comments = '0'
      this.form.commentsArray = []

      this.addPost(payload)
        .then(() => {
          this.$store.commit('ADD_POST', this.form)
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err, 'error')
        })
    },
    onFilePicked(event) {
      this.form.file = event.target.files[0]
      this.form.url = URL.createObjectURL(event.target.files[0])
    },
  },
}
</script>
