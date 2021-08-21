<template>
  <form @submit.prevent="onSubmit" class="w-full">
    <span
      v-if="generalErrors"
      class="fs-16 text-primary font-semibold w-full"
      >{{ generalErrors }}</span
    >
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
    <div class="flex w-full mt-3 lg:mt-3">
      <a
        @click.prevent="openForgotPassword()"
        class="fs-16 text-pink cursor-pointer"
        >{{ $t('login.forgot') }}</a
      >
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="bg-primary text-white w-full rounded-full input-height fs-24 mt-3 lg:mt-4 flex justify-center items-center"
    >
      <span>
        {{ $t('login.login') }}
      </span>
      <GeneralLoader v-if="loading"></GeneralLoader>
    </button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
      errors: {
        email: null,
        password: null,
      },
      loading: false,
      generalErrors: null,
    }
  },
  async mounted() {
    await this.clearUserStateBeforeLogin()
  },
  methods: {
    ...mapActions('general', ['login', 'redirectUserLogin']),
    clearErrors() {
      this.errors = {
        email: null,
        password: null,
      }
      this.email = null
      this.password = null
      this.generalErrors = null
    },
    openForgotPassword() {
      this.$emit('changeAuthMode', 'forgot')
      this.clearErrors()
    },
    async clearUserStateBeforeLogin() {
      localStorage.removeItem('auth._token.local')
      await this.$auth.setUser({})
      await this.$cookies.remove('auth._token.local')
    },
    async onSubmit() {
      await this.clearUserStateBeforeLogin()
      await this.loginWithEmailAndPassword()
    },
    async loginWithEmailAndPassword() {
      if (this.loading) return

      this.loading = true
      await this.$auth
        .login({
          data: { email: this.email, password: this.password },
        })
        .then((response) => {
          const { success, user, message, access_token } = response.data
          console.log(response.data)
          if (success) {
            this.errors = {}
            this.$auth.setUser({ ...user, token: access_token })
            this.redirectUserLogin()
          } else {
            this.errors.email = message
          }
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err, 'err')
          console.log(err.response)
          this.generalErrors = err.message
          if (err.response.status === 400) {
            this.generalErrors = err.response.data.error
            this.errors = {}
          }

          if (err.response.status === 429) {
            this.generalErrors = 'To Many Attempts. Please retry in 1 minute'
            this.errors = {}
          }

          if (err.response.data && err.response.data.errors) {
            const { password, email } = err.response.data.errors
            this.errors.email = email && email.join('')
            this.errors.password = password && password.join('')
            this.generalErrors = null
          }
          // this.generalErrors = err
        })
    },
    sendEmailToRestartPass() {
      if (this.successfulSendEmail) return
      this.loading = true
      const credentials = {
        email: this.email,
      }

      this.forgotPassword(credentials)
        .then((response) => {
          console.log(response, 'response')
          this.successfulSendEmail = true
          this.loading = false
          this.clearErrors()

          setTimeout(() => {
            this.mode = 'auth'
            this.successfulSendEmail = false
          }, 3000)
        })
        .catch((err) => {
          console.log(err, 'error')
          this.errors.email = err
          this.loading = false
        })
    },
  },
}
</script>

<style scoped lang="scss">
.metamask__icon {
  max-width: 79px;
}
.social__icon {
  padding-left: 0.3em;
  padding-right: 0.3em;
}
.badge__just {
}
</style>
