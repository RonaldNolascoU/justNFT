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
            <AuthMetamask :userMessage="msg" @onComplete="onComplete" />
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
          <span class="fs-24 text-black bg-white">{{ $t('login.or') }}</span>
        </h2>

        <div class="flex flex-col items-center login-form">
          <form
            @submit.prevent="isLogin ? loginWithEmailAndPassword() : register()"
            class="w-full"
          >
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
              v-if="!isLogin"
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
            >
            <div class="flex w-full mt-3 lg:mt-3" v-if="isLogin">
              <a href="" class="fs-16 text-pink">{{ $t('login.forgot') }}</a>
            </div>

            <span
              v-if="successfulSignUp"
              class="fs-16 text-primary font-semibold w-full"
              >Email registered. Activation mail has been sent to user.</span
            >
            <button
              type="submit"
              :disabled="successfulSignUp"
              class="bg-primary text-white w-full rounded-full pl-4 input-height fs-24 mt-3 lg:mt-4 flex justify-center items-center"
            >
              {{ isLogin ? $t('login.login') : $t('login.signup') }}
              <GeneralLoader v-if="loading" />
            </button>
          </form>
        </div>

        <h2 class="mt-5 lg:mt-5"></h2>
        <div class="text-center">
          <p v-if="!isLogin">{{ $t('login.haveAccount') }}</p>
          <p v-else>{{ $t('login.noAccount') }}</p>
          <a
            class="mt-3 fs-16 text-primary font-semibold cursor-pointer"
            @click="isLogin = !isLogin"
          >
            {{ isLogin ? $t('login.signup') : $t('login.login') }}
          </a>
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col items-center mt-5 lg:mt-14">
      <div class="flex justify-between items-center fs-18 fs-res-12 text-pink">
        <div class="mx-3 lg:mx-5"><a href="">Tokenomics</a></div>
        <span class="material-icons fs-5"> fiber_manual_record </span>
        <div class="mx-3 lg:mx-5">
          <a href="">{{ $t('login.contact') }}</a>
        </div>
        <span class="material-icons fs-5"> fiber_manual_record </span>
        <div class="mx-3 lg:mx-5">
          <a href="">{{ $t('login.help') }}</a>
        </div>
        <span class="material-icons fs-5"> fiber_manual_record </span>
        <div class="mx-3 lg:mx-5">
          <a href="">{{ $t('login.about') }}</a>
        </div>
      </div>

      <div class="flex justify-between items-center mt-3 lg:mt-5">
        <a
          class="fs-24 social__icon p-1.5 flex fs-res-24 rounded-full bg-primary text-white mx-5"
          href="https://discord.gg/justyours"
          target="_blank"
        >
          <i class="fs-16 fab fa-discord"></i>
        </a>
        <a
          class="fs-24 social__icon p-1.5 flex fs-res-24 rounded-full bg-primary text-white mx-5"
          href="https://twitter.com/justyoursme"
          target="_blank"
        >
          <i class="fs-16 fab fa-twitter"></i>
        </a>
        <a
          class="fs-24 social__icon p-1.5 flex fs-res-24 rounded-full bg-primary text-white mx-5"
          href="https://t.me/JustYoursMe"
          target="_blank"
        >
          <i class="fs-16 fab fa-telegram-plane"></i>
        </a>
        <a
          class="fs-24 social__icon p-1.5 flex fs-res-24 rounded-full bg-primary text-white mx-5"
          href="https://discord.gg/justyours"
          target="_blank"
        >
          <i class="fs-16 fab fa-instagram"></i>
        </a>
      </div>
    </div>
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
      errors: {
        username: null,
        email: null,
        password: null,
      },
      loading: false,
      successfulSignUp: false,
    }
  },
  methods: {
    ...mapActions('auth', ['login', 'signUp']),
    loginWithEmailAndPassword() {
      if (this.successfulSignUp) return
      this.loading = true
      const credentials = { email: this.email, password: this.password }
      this.login(credentials)
        .then((response) => {
          console.log(response, 'response')
          this.loading = false
        })
        .catch((err) => {
          console.log(err, 'error')
          this.errors.email = err
          this.loading = false
        })
    },
    register() {
      if (this.successfulSignUp) return
      this.loading = true
      const credentials = {
        username: this.username,
        email: this.email,
        password: this.password,
      }
      this.signUp(credentials)
        .then((response) => {
          console.log(response, 'response')
          this.successfulSignUp = true
          this.loading = false
        })
        .catch((err) => {
          console.log(err, 'error')
          this.loading = false
        })
    },
    onComplete(data) {
      console.log('data:', data)
      const { metaMaskAddress } = data
      if (metaMaskAddress) {
        this.$store.commit('auth/setWalletAddress', data)
        this.$store.commit('SET_USER_AUTH', {
          user: 'test',
          wallet: true,
        })
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
</style>
