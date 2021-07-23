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
          <ValidationObserver ref="registrationForm">
            <form @submit.prevent="onSubmit" class="w-full">
              <!-- username -->
              <ValidationProvider
                name="Username"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
                  v-model="form.username"
                  :placeholder="$t('signup.username')"
                  type="text"
                  required
                />
                <span class="fs-16 text-primary font-semibold w-full">{{
                  errors[0]
                }}</span>
              </ValidationProvider>

              <!-- birthday -->
              <div class="mt-3 lg:mt-2">
                <ValidationProvider
                  name="Birthday"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <VueDatePicker
                    v-model="form.birthday"
                    clearable
                    :placeholder="$t('signup.birthday')"
                    :color="'#c53761'"
                    fullscreen-mobile
                    :locale="{ lang: $i18n.locale }"
                    noCalendarIcon
                    ref="menu"
                    :max-date="$dateFns.subYears(new Date(), 18).toISOString()"
                    min-date="1980-01-01"
                    @onOpen="menu = true"
                    @onClose="menu = false"
                  />
                  <span class="fs-16 text-primary font-semibold w-full">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
              </div>
              <!-- address -->
              <ValidationProvider
                name="Address"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
                  v-model="form.address"
                  :placeholder="$t('signup.address')"
                  type="address"
                  required
                />
                <span class="fs-16 text-primary font-semibold w-full">{{
                  errors[0]
                }}</span>
              </ValidationProvider>

              <!-- genre -->
              <div class="mt-3 lg:mt-2">
                <ValidationProvider
                  name="Genre"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <VSelect
                    :placeholder="$t('signup.genre')"
                    :options="$t('signup.genreOptions')"
                    v-model="form.genre"
                  >
                    <template #search="{ attributes, events }">
                      <input
                        class="vs__search"
                        :required="!form.genre"
                        v-bind="attributes"
                        v-on="events"
                      />
                    </template>
                  </VSelect>
                  <span class="fs-16 text-primary font-semibold w-full">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
              </div>

              <!-- ID -->
              <div class="mt-3 lg:mt-2">
                <button
                  v-tooltip="
                    getTooltipOptions(
                      'Attach front and back images from your ID'
                    )
                  "
                  @click.prevent.stop="idVisible = !idVisible"
                  class="underline"
                >
                  <i class="fas fa-angle-right"></i> {{ $t('signup.id') }}
                </button>
                <client-only>
                  <ValidationProvider
                    name="ID"
                    mode="lazy"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <file-pond
                      v-model="form.id"
                      name="id_imgs"
                      ref="pond"
                      label-idle="Drop files here..."
                      v-bind:allow-multiple="true"
                      accepted-file-types="image/jpeg, image/png"
                      maxFiles="2"
                      :credits="[]"
                      required
                    />
                    <span class="fs-16 text-primary font-semibold w-full">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                </client-only>
              </div>

              <!-- link -->
              <input
                class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
                v-model="form.onlyfans"
                :placeholder="$t('signup.link')"
                type="text"
              />
              <span class="fs-16 text-primary font-semibold w-full">{{
                errors[0]
              }}</span>

              <!-- bio -->
              <ValidationProvider
                name="Bio"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
                  v-model="form.bio"
                  :placeholder="$t('signup.bio')"
                  type="text"
                  required
                />
                <span class="fs-16 text-primary font-semibold w-full">{{
                  errors[0]
                }}</span>
              </ValidationProvider>

              <!-- profile pic -->
              <div class="mt-3 lg:mt-2">
                <button
                  v-tooltip="getTooltipOptions('Attach a profile image')"
                  @click.prevent.stop="profileVisible = !profileVisible"
                  class="underline"
                >
                  <i class="fas fa-angle-right"></i> {{ $t('signup.profile') }}
                </button>
                <client-only>
                  <ValidationProvider
                    mode="lazy"
                    name="Profile Picture"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <file-pond
                      name="profile_picture"
                      ref="pond"
                      label-idle="Drop files here..."
                      v-bind:allow-multiple="true"
                      accepted-file-types="image/jpeg, image/png"
                      maxFiles="1"
                      :credits="[]"
                      v-model="form.profilePicture"
                      required
                    />
                    <span class="fs-16 text-primary font-semibold w-full">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                </client-only>
              </div>

              <!-- <span
              v-if="successfulSignUp"
              class="fs-16 text-primary font-semibold w-full"
              >Email registered. Activation mail has been sent to user.</span
            > -->
              <!-- TODO: DISABLED PROP MUST BE DYNAMIC -->
              <button
                type="submit"
                class="bg-primary text-white w-full rounded-full pl-4 input-height fs-24 mt-3 lg:mt-4 flex justify-center items-center"
              >
                {{ $t('login.signup') }}
                <GeneralLoader v-if="loading" />
              </button>
            </form>
          </ValidationObserver>
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

export default {
  components: { VSelect },
  data() {
    return {
      idVisible: false,
      profileVisible: false,
      form: {
        username: null,
        birthday: null,
        address: null,
        genre: null,
        id: null,
        onlyfans: null,
        bio: null,
        profilePicture: null,
      },
      errors: {
        username: null,
        email: null,
        password: null,
      },
      loading: false,
      successfulSignUp: false,
      date: new Date(),
      menu: false,
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.menu.$refs.agenda.mode = 'year'))
    },
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
    getTooltipOptions(msg) {
      return {
        content: msg,
        placement: 'top',
        classes: ['info'],
        targetClasses: ['it-has-a-tooltip'],
        offset: 10,
        delay: {
          show: 500,
          hide: 300,
        },
      }
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
      console.log(this.form, 'FORM')
      console.log(this.$refs.registrationForm.validate(), 'refs')

      let { id } = this.form
      id.map((id) => {
        console.log(id, 'ID PHOTO')
        this.form.id.push(id.file)
      })

      // if (this.mode == 'auth') {
      //   this.isLogin ? this.loginWithEmailAndPassword() : this.register()
      // } else {
      //   this.sendEmailToRestartPass()
      // }
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
    }
    .vd-picker__input-clear {
      position: absolute;
      right: 1em;
      top: 0.5em;
    }
  }
}
</style>
