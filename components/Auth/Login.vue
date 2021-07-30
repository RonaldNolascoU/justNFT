<template>
  <div class="xl:container lg:mx-5">
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
          <div class="w-full mt-3 lg:mt-3">
            <!-- <vue-metamask userMessage="msg" @onComplete="onComplete">
            </vue-metamask> -->
            <AuthMetamask
              v-if="mode == 'auth'"
              :userMessage="msg"
              @onComplete="onComplete"
            ></AuthMetamask>
            <!-- <button class="w-full" @click="loginWithMetamask()">
              <div class="flex">
                <div
                  class="rounded-l-3xl border border-2 border-color-primary flex justify-center items-center bg-white icon width metamask__icon"
                >
                  <img src="/images/metamask.svg" class="mx-5" />
                </div>
                <div
                  class="w-11/12 bg-primary text-white w-full rounded-r-3xl input-height fs-24 flex justify-start pl-6 items-center"
                >
                  <div>{{ $t('login.metamask') }}</div>
                </div>
              </div>
            </button> -->
          </div>
        </div>

        <h2 class="mt-5 lg:mt-5">
          <span class="fs-24 text-black bg-white">{{
            mode == 'auth' ? $t('login.or') : $t('login.forgot')
          }}</span>
        </h2>

        <div class="flex flex-col items-center login-form">
          <form @submit.prevent="onSubmit" class="w-full">
            <input
              class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
              v-model="email"
              :placeholder="$t('login.email')"
              type="email"
              required
            />
            <span
              v-if="errors.email"
              class="fs-16 text-primary font-semibold w-full"
              >{{ errors.email }}</span
            >
            <input
              v-if="mode == 'auth'"
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
            <!-- <input
              v-if="!isLogin && mode == 'auth'"
              class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
              v-model="username"
              :placeholder="$t('login.username')"
              type="text"
              required
            />
            <span
              v-if="errors.username"
              class="fs-16 text-primary font-semibold w-full"
              >{{ errors.username }}</span
            > -->
            <div
              class="flex w-full mt-3 lg:mt-3"
              v-if="isLogin && mode == 'auth'"
            >
              <a
                @click.prevent="openForgotPassword()"
                class="fs-16 text-pink cursor-pointer"
                >{{ $t('login.forgot') }}</a
              >
            </div>

            <span
              v-if="successfulSignUp"
              class="fs-16 text-primary font-semibold w-full"
              >Email registered. Activation mail has been sent to user.</span
            >
            <span
              v-if="successfulSendEmail"
              class="fs-16 text-primary font-semibold w-full"
              >Email was sent successfully.</span
            >
            <button
              type="submit"
              :disabled="loading"
              class="bg-primary text-white w-full rounded-full pl-4 input-height fs-24 mt-3 lg:mt-4 flex justify-center items-center"
            >
              <span v-if="mode == 'auth'">
                {{ isLogin ? $t('login.login') : $t('login.signup') }}
              </span>
              <span v-else>{{ $t('login.forgotBtn') }}</span>
              <GeneralLoader v-if="loading" ></GeneralLoader>
            </button>
          </form>
        </div>

        <h2 class="mt-5 lg:mt-5"></h2>
        <div class="text-center">
          <p v-if="!isLogin">{{ $t('login.haveAccount') }}</p>
          <p v-else>{{ $t('login.noAccount') }}</p>
          <a
            class="mt-3 fs-16 text-primary font-semibold cursor-pointer"
            @click="changeAuthMode()"
          >
            <span>
              {{ isLogin ? $t('login.signup') : $t('login.login') }}
            </span>
          </a>
        </div>
        <div class="mt-2 block lg:hidden badge__just">
          <BadgeBuyJust ></BadgeBuyJust>
        </div>
      </div>
    </div>
    <LayoutFooter ></LayoutFooter>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      isLogin: true,
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
      msg: 'Metamask',
      mode: 'auth',
      errors: {
        username: null,
        email: null,
        password: null,
      },
      loading: false,
      successfulSignUp: false,
      successfulSendEmail: false,
    }
  },
  methods: {
    ...mapActions('auth', ['login', 'signUp', 'forgotPassword']),
    clearErrors() {
      this.errors = {
        username: null,
        email: null,
        password: null,
      }
      this.email = null
      this.password = null
      this.username = null
    },
    openForgotPassword() {
      this.mode = 'forgot'
      this.clearErrors()
    },
    changeAuthMode() {
      this.isLogin = !this.isLogin
      this.mode = 'auth'
      this.clearErrors()
      this.successfulSignUp = false
    },
    onSubmit() {
      if (this.mode == 'auth') {
        this.isLogin ? this.loginWithEmailAndPassword() : this.register()
      } else {
        this.sendEmailToRestartPass()
      }
    },
    loginWithEmailAndPassword() {
      if (this.loading) return
      this.$store.commit('auth/setAuth', {})
      // TODO: DISABLED FOR NOW UNTIL API IS WORKING ON LIVE DOMAIN

      // this.loading = true
      // const credentials = { email: this.email, password: this.password }
      // this.login(credentials)
      //   .then((response) => {
      //     console.log(response, 'response')
      //     this.loading = false
      //   })
      //   .catch((err) => {
      //     console.log(err, 'error')
      //     this.errors.email = err
      //     this.loading = false
      //   })
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
          this.successfulSignUp = true
          this.clearErrors()
          this.loading = false
        })
        .catch((err) => {
          console.log(err, 'error')
          this.errors.email = err
          this.loading = false
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
    onComplete(data) {
      console.log('data:', data)
      const { metaMaskAddress, balance } = data
      if (metaMaskAddress) {
        this.$store.commit('auth/setWalletAddress', metaMaskAddress)
        this.$store.commit('auth/setWalletBalance', balance)
        this.$store.dispatch('auth/saveMetaMaskLoggedState')
        this.$store.commit('auth/setAuth', {})
      }
    },
  },
}
</script>

<style scoped lang="scss">
input::placeholder {
  font-size: 16px !important;
}
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
