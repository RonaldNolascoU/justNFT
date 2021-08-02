<template>
  <div>
    <div class="mt-5" v-if="errorMessages">
      <span class="fs-16 text-primary font-semibold w-full">{{
        errorMessages
      }}</span>
    </div>
    <ValidationObserver ref="registrationForm">
      <form @submit.prevent="onSubmit" class="w-full">
        <ValidationProvider name="Email" rules="required" v-slot="{ errors }">
          <input
            class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
            v-model="email"
            :placeholder="$t('login.email')"
            type="email"
            required
          />
          <span class="fs-16 text-primary font-semibold w-full">{{
            errors[0]
          }}</span>
        </ValidationProvider>

        <ValidationProvider
          name="Password"
          rules="required"
          v-slot="{ errors }"
          vid="password"
        >
          <input
            name="password"
            class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-3"
            type="password"
            v-model="password"
            :placeholder="$t('login.password')"
          />
          <span class="fs-16 text-primary font-semibold w-full">{{
            errors[0]
          }}</span>
        </ValidationProvider>

        <ValidationProvider
          name="Password confirmation"
          vid="confirm"
          rules="required|confirmed:password"
          v-slot="{ errors }"
        >
          <input
            class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-3"
            v-model="confirmPassword"
            :placeholder="$t('login.confirmPassword')"
            type="password"
            data-vv-as="password"
            required
          />
          <span class="fs-16 text-primary font-semibold w-full">{{
            errors[0]
          }}</span>
        </ValidationProvider>
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
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { extend } from 'vee-validate'

extend('confirmed', {
  message: 'Passwords do not match',
})

export default {
  data() {
    return {
      email: null,
      password: null,
      confirmPassword: null,
      errorMessages: null,
      loading: false,
      successfulSignUp: false,
    }
  },
  methods: {
    ...mapActions('general', ['signUp']),
    onSubmit() {
      if (this.$refs.registrationForm.validate()) {
        this.register()
      }
    },
    register() {
      if (this.loading) return
      this.loading = true
      const credentials = {
        email: this.email,
        password: this.password,
      }

      this.signUp(credentials)
        .then((response) => {
          console.log(response, 'response')
          this.email = null
          this.password = null
          this.confirmPassword = null

          this.successfulSignUp = true
          this.$refs.registrationForm.reset()
          this.loading = false
        })
        .catch((err) => {
          console.log(err, 'error')
          this.errorMessages = err
          this.loading = false
          this.$refs.registrationForm.reset()
          this.successfulSignUp = false
        })
    },
  },
}
</script>

<style></style>
