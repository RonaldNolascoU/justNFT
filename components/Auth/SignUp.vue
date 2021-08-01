<template>
  <form @submit.prevent="onSubmit" class="w-full">
    <input
      class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
      v-model="name"
      :placeholder="$t('signup.name')"
      type="text"
      required
    />
    <input
      class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
      v-model="email"
      :placeholder="$t('login.email')"
      type="email"
      required
    />
    <span v-if="errors.email" class="fs-16 text-primary font-semibold w-full">{{
      errors.email
    }}</span>
    <input
      class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-3"
      v-model="password"
      :placeholder="$t('login.password')"
      type="password"
      required
    />
    <span
      v-if="errors.password"
      class="fs-16 text-primary font-semibold w-full"
      >{{ errors.password }}</span
    >
    <input
      class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
      v-model="country"
      :placeholder="$t('signup.address')"
      type="text"
      required
    />
    <file-pond
      class="mt-3"
      name="profile_picture"
      ref="pond"
      label-idle="Upload or drop profile picture..."
      v-bind:allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      maxFiles="1"
      :credits="[]"
      v-model="file"
      required
    />
    <button
      type="submit"
      :disabled="loading"
      class="bg-primary text-white w-full rounded-full input-height fs-24 mt-3 lg:mt-4 flex justify-center items-center"
    >
      <span>
        {{ $t('login.signup') }}
      </span>
      <GeneralLoader v-if="loading"></GeneralLoader>
    </button>
    <span class="text-primary font-bold mt-2 block" v-if="successfulSignUp"
      >Email activation sent. Please check your inbox</span
    >
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
      country: null,
      file: null,
      errors: {},
      loading: false,
      successfulSignUp: false,
    }
  },
  methods: {
    ...mapActions('general', ['signUp']),
    onSubmit() {
      this.register()
    },
    register() {
      if (this.loading) return
      this.loading = true
      let payload = new FormData()

      payload.append('name', this.name)
      payload.append('email', this.email)
      payload.append('password', this.password)
      payload.append('country', this.country)
      payload.append('file', this.file[0].file)

      this.signUp(payload)
        .then((response) => {
          console.log(response, 'response')
          this.errors = {}
          this.successfulSignUp = true
          // this.clearErrors()
          this.loading = false
        })
        .catch((err) => {
          console.log(err, 'error')
          this.errors.email = err
          this.loading = false
          this.successfulSignUp = false
        })
    },
  },
}
</script>

<style></style>
