<template>
  <form @submit.prevent="onSubmit" class="w-full">
    <input
      class="input-height fs-16 border-lighter border-1 w-full rounded-full pl-4 mt-3 lg:mt-2"
      v-model="email"
      :placeholder="$t('login.email')"
      type="email"
      required
    />

    <button
      type="submit"
      :disabled="loading"
      class="bg-primary text-white w-full rounded-full input-height fs-24 mt-3 lg:mt-4 flex justify-center items-center"
    >
      <span>
        {{ $t('login.forgotBtn') }}
      </span>
      <GeneralLoader v-if="loading"></GeneralLoader>
    </button>
    <span class="text-primary font-bold mt-2 block" v-if="emailSent"
      >Email activation sent. Please check your inbox</span
    >
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      email: null,
      emailSent: false,
    }
  },
  methods: {
    ...mapActions('general', ['forgotPassword']),
    onSubmit() {
      this.sendEmailToRestartPass()
    },
    sendEmailToRestartPass() {
      if (this.successfulSendEmail) return
      this.loading = true
      const credentials = {
        email: this.email,
      }

      this.forgotPassword(credentials)
        .then((response) => {
          this.loading = false
          console.log(response, 'response')
          this.emailSent = true
          setTimeout(() => {
            this.$emit('changeAuthMode', 'auth')
          }, 3000)
        })
        .catch((err) => {
          console.log(err, 'error')
          this.errors.email = err
          this.emailSent = false
          this.loading = false
        })
    },
  },
}
</script>

<style></style>
