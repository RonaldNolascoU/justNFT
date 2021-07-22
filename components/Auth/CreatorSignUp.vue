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
          <span class="fs-24 text-black bg-white">{{
            $t('signup.title')
          }}</span>
        </div>

        <div class="flex flex-col items-center login-form">
          <form @submit.prevent="onSubmit" class="w-full">
            <!-- username -->
            <input
              class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
              v-model="email"
              :placeholder="$t('signup.username')"
              type="email"
              required
            />
            <span
              v-if="errors.email"
              class="fs-16 text-primary font-semibold w-full"
              >{{ errors.email }}</span
            >

            <!-- birthday -->
            <div class="mt-3 lg:mt-2">
              <DatePicker
                :language="languages[$i18n.locale]"
                format="d MMMM yyyy"
                :placeholder="$t('signup.birthday')"
              />
            </div>
            <!-- <div>{{ $i18n.locale }}</div> -->
            <!-- address -->
            <input
              class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
              v-model="password"
              :placeholder="$t('signup.address')"
              type="password"
              required
            />
            <span
              v-if="errors.password"
              class="fs-16 text-primary font-semibold w-full"
              >{{ errors.password }}</span
            >

            <!-- genre -->
            <div class="mt-3 lg:mt-2">
              <VSelect
                :placeholder="$t('signup.genre')"
                :options="$t('signup.genreOptions')"
              />
            </div>

            <!-- ID -->
            <div class="mt-3 lg:mt-2">
              <button
                @click.prevent.stop="idVisible = !idVisible"
                class="underline"
              >
                <i class="fas fa-angle-right"></i> {{ $t('signup.id') }}
              </button>
              <UploadImages v-if="idVisible" :uploadMsg="$t('signup.img')" />
            </div>

            <!-- link -->
            <input
              class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
              v-model="username"
              :placeholder="$t('signup.link')"
              type="text"
              required
            />
            <span
              v-if="errors.username"
              class="fs-16 text-primary font-semibold w-full"
              >{{ errors.username }}</span
            >

            <!-- bio -->
            <input
              class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
              v-model="username"
              :placeholder="$t('signup.bio')"
              type="text"
              required
            />
            <span
              v-if="errors.username"
              class="fs-16 text-primary font-semibold w-full"
              >{{ errors.username }}</span
            >

            <!-- profile pic -->
            <div class="mt-3 lg:mt-2">
              <button
                @click.prevent.stop="profileVisible = !profileVisible"
                class="underline"
              >
                <i class="fas fa-angle-right"></i> {{ $t('signup.profile') }}
              </button>
              <UploadImages
                v-if="profileVisible"
                :uploadMsg="$t('signup.img')"
              />
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
            <!-- TODO: DISABLED PROP MUST BE DYNAMIC -->
            <button
              type="submit"
              :disabled="true"
              class="bg-primary text-white w-full rounded-full pl-4 input-height fs-24 mt-3 lg:mt-4 flex justify-center items-center"
            >
              {{ $t('login.signup') }}
              <GeneralLoader v-if="loading" />
            </button>
          </form>
        </div>

        <!-- <h2 class="mt-5 lg:mt-5"></h2>
        <div class="text-center">
          <p v-if="!isLogin">{{ $t('login.haveAccount') }}</p>
          <p v-else>{{ $t('login.noAccount') }}</p>
          <a
            class="mt-3 fs-16 text-primary font-semibold cursor-pointer"
            @click="changeAuthMode()"
          >
            <span>
              {{ $t('login.login') }}
            </span>
          </a>
        </div> -->
      </div>
    </div>

    <LayoutFooter />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import VSelect from 'vue-select'
import DatePicker from 'vuejs-datepicker'
import * as lang from 'vuejs-datepicker/src/locale'

import UploadImages from 'vue-upload-drop-images'

export default {
  components: { UploadImages, DatePicker, VSelect },
  data() {
    return {
      idVisible: false,
      profileVisible: false,
      languages: lang,

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
      if (this.loading) return
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
      const { metaMaskAddress } = data
      if (metaMaskAddress) {
        this.$store.commit('auth/setWalletAddress', data)
        this.$store.commit('auth/setAuth', {})
      }
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
    color: rgba(0, 0, 0, 0.4);
    border-width: 2px;
    border-color: rgba(229, 231, 235, var(--tw-border-opacity));

    .vs__selected-options {
      input::placeholder {
        position: relative;
        left: 0.4em;
      }
    }
  }
  .vdp-datepicker {
    .vdp-datepicker__calendar {
      width: 100%;
    }
    input {
      width: 100%;
      height: 45px;
      border-radius: 9999px;
      border: 2px solid rgba(229, 231, 235, var(--tw-border-opacity));
    }
    input::placeholder {
      position: relative;
      left: 1em;
    }
  }
}
</style>
