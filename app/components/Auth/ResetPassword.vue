<template>
  <div class="xl:container lg:mx-5 content__creator">
    <div class="flex justify-center pt-5 lg:pt-10 3xl:mx-32">
      <div
        class="lg:w-3/5 xl:w-1/2 2xl:w-3/5 hidden lg:flex justify-end pt-8 3xl:mx-16"
      >
        <div
          class="transform transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
        >
          <img
            class="login-banner 2xl:mr-3 mt-24 pt-1.5 w-full"
            src="/images/login.png"
            alt="Just Yours"
          />
        </div>
      </div>
      <div class="w-4/5 lg:w-2/5 xl:w-1/2 2xl:w-2/5 lg:pl-8 2xl:pr-32">
        <div class="flex flex-col items-center">
          <img src="/just_logo.png" alt="" />
          <span class="fs-18 text-blue text-center mt-3 lg:mt-2">{{
            $t('login.title')
          }}</span>
        </div>

        <div class="mt-5 lg:mt-5 text-center">
          <span class="fs-24 text-black bg-white">Reset Your Password</span>
        </div>

        <div class="mt-5" v-if="errorMessages">
          <span class="fs-16 text-primary font-semibold w-full">{{
            errorMessages
          }}</span>
        </div>

        <div class="flex flex-col items-center login-form">
          <ValidationObserver ref="registrationForm">
            <form @submit.prevent.stop="submit" class="w-full">
              <!-- username -->
              <ValidationProvider
                name="Email"
                rules="email,required"
                v-slot="{ errors }"
              >
                <input
                  class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
                  v-model="form.email"
                  placeholder="Email"
                  type="email"
                  required
                />
                <span class="fs-16 text-primary font-semibold w-full">{{
                  errors[0]
                }}</span>
              </ValidationProvider>

              <!-- Name -->

              <ValidationProvider
                name="Password"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
                  v-model="form.password"
                  placeholder="new password"
                  type="password"
                  required
                />
                <span class="fs-16 text-primary font-semibold w-full">{{
                  errors[0]
                }}</span>
              </ValidationProvider>

              <ValidationProvider
                name="ConfirmPassword"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
                  v-model="form.password_confirmation"
                  placeholder="confirm password"
                  type="password"
                  required
                />
                <span class="fs-16 text-primary font-semibold w-full">{{
                  errors[0]
                }}</span>
              </ValidationProvider>

              <button
                type="submit"
                :disabled="loading"
                class="bg-primary text-white w-full rounded-full pl-4 input-height fs-24 mt-3 lg:mt-4 flex justify-center items-center"
              >
                Reset Password
                <GeneralLoader v-if="loading"></GeneralLoader>
              </button>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>

    <LayoutFooter />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import VSelect from 'vue-select'

export default {
  name: 'ResetPassword',
  layout: 'blank',
  components: { VSelect },
  data() {
    return {
      idVisible: false,
      profileVisible: false,
      form: {
        email: null,
        password: null,
        password_confirmation: null,
        token: null,
      },
      errors: {},
      errorMessages: null,
      loading: false,
      successfulSignUp: false,
    }
  },
  async mounted() {
    await this.clearUserStateBeforeLogin()
    this.form.email = this.$router.currentRoute.query['email']
    this.form.token = this.$router.currentRoute.query['code']
  },
  methods: {
    ...mapActions('general', ['resetPassword']),
    async loginWithEmailAndPassword() {
      if (this.loading) return

      this.loading = true
      await this.$auth
        .login({
          data: { email: this.email, password: this.password },
        })
        .then((response) => {
          const { success, user, message, access_token } = response.data
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
          this.errors.email = err
        })
    },
    clearErrors() {
      this.errorMessages = null

      this.form = {
        email: null,
        password: null,
        password_confirmation: null,
      }
    },
    async submit() {
      if (this.loading) return
      await this.clearUserStateBeforeLogin()

      if (this.$refs.registrationForm.validate()) {
        this.reset(this.form)
      }
    },
    async clearUserStateBeforeLogin() {
      localStorage.removeItem('auth._token.local')
      await this.$auth.setUser({})
      await this.$cookies.remove('auth._token.local')
    },
    reset(payload) {
      this.loading = true

      this.resetPassword(payload)
        .then((response) => {
          console.log(response, 'response')
          const { success } = response
          if (success) {
            this.$router.push('/')
          }
        })
        .catch((err) => {
          console.log(err, 'error')
        })
    },
  },
}
</script>

<style lang="scss">
.content__creator {
  input::placeholder {
    font-size: 16px !important;
  }
  .vs__dropdown-toggle {
    border-radius: 9999px;
    height: 45px;
    color: rgba(10, 5, 5, 0.4);
    border-width: 2px;
    border-color: rgba(229, 231, 235, var(--tw-border-opacity));

    .vs__selected {
      left: 0.5em;
      position: relative;
    }

    .vs__selected-options {
      input::placeholder {
        position: relative;
        left: 0.4em;
      }
    }
  }
  .vd-picker__input {
    height: 45px;
    border-radius: 9999px;
    border: 2px solid rgba(229, 231, 235, var(--tw-border-opacity));
    input {
      width: 100%;
      padding-left: 1em;
      &::placeholder {
        color: rgba(5, 0, 0, 0.6);
      }
    }
    .vd-picker__input-clear {
      position: absolute;
      right: 1em;
      top: 0.5em;
    }
  }
}
</style>
