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
          <div class="w-full mt-3 lg:mt-3" v-if="mode == 'auth'">
            <AuthMetamask
              :userMessage="msg"
              @onComplete="onComplete"
            ></AuthMetamask>
          </div>
        </div>

        <h2 class="mt-5 lg:mt-5">
          <span class="fs-24 text-black bg-white">{{
            mode == 'auth' ? $t('login.or') : $t('login.forgot')
          }}</span>
        </h2>

        <div class="flex flex-col items-center login-form">
          <template v-if="mode == 'auth'">
            <AuthLogin
              v-if="isLogin"
              @changeAuthMode="mode = 'forgot'"
            ></AuthLogin>
            <AuthSignUp v-else> </AuthSignUp>
          </template>
          <AuthForgotPassword
            v-if="mode == 'forgot'"
            @changeAuthMode="mode = 'auth'"
          ></AuthForgotPassword>
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
          <BadgeBuyJust></BadgeBuyJust>
        </div>
      </div>
    </div>
    <LayoutFooter></LayoutFooter>
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
    changeAuthMode() {
      this.isLogin = !this.isLogin
      // history.pushState({}, null, this.isLogin ? '/signin' : '/register')
      this.mode = 'auth'
      this.successfulSignUp = false
    },
    onComplete(data) {
      console.log('data:', data)
      const { metaMaskAddress, balance } = data
      if (metaMaskAddress) {
        this.$store.commit('general/setWalletAddress', metaMaskAddress)
        this.$store.commit('general/setWalletBalance', balance)
        this.$store.dispatch('general/saveMetaMaskLoggedState')
        // this.redirectUserLogin()
        // this.$auth.setUser({ name: 'Metamask', loggedIn: true })
        this.$router.push('/')
        // this.$store.commit('general/setAuth', {})
      }
    },
  },
}
</script>

<style lang="scss">
.login-form {
  input::placeholder {
    font-size: 16px !important;
  }
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
