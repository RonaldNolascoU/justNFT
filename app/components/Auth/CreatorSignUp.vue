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

        <div class="mt-5" v-if="errorMessages">
          <span class="fs-16 text-primary font-semibold w-full">{{
            errorMessages
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

              <!-- Name -->

              <ValidationProvider
                name="Name"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
                  v-model="form.name"
                  :placeholder="$t('signup.name')"
                  type="text"
                  required
                />
                <span class="fs-16 text-primary font-semibold w-full">{{
                  errors[0]
                }}</span>
              </ValidationProvider>

              <!-- Email -->
              <ValidationProvider
                name="Email"
                rules="email"
                v-slot="{ errors }"
              >
                <input
                  class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
                  v-model="form.email"
                  :placeholder="$t('login.email')"
                  type="email"
                  required
                />
                <span class="fs-16 text-primary font-semibold w-full">{{
                  errors[0]
                }}</span>
              </ValidationProvider>

              <!-- Password -->
              <ValidationProvider
                name="Password"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-2"
                  v-model="form.password"
                  :placeholder="$t('login.password')"
                  type="password"
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
                    format="DD-MM-YYYY"
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
                  v-model="form.country"
                  :placeholder="$t('signup.address')"
                  type="text"
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
                v-model="form.current"
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
                      v-model="form.profileImage"
                      required
                    />
                    <span class="fs-16 text-primary font-semibold w-full">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                </client-only>
              </div>

              <span
                v-if="successfulSignUp"
                class="fs-16 text-primary font-semibold w-full"
                >Email registered. Activation mail has been sent to user.</span
              >

              <button
                type="submit"
                :disabled="loading"
                class="bg-primary text-white w-full rounded-full pl-4 input-height fs-24 mt-3 lg:mt-4 flex justify-center items-center"
              >
                {{ $t('login.signup') }}
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
  name: 'CreatorSignUp',
  components: { VSelect },
  data() {
    return {
      idVisible: false,
      profileVisible: false,
      form: {
        name: null,
        email: null,
        password: null,
        country: null,
        username: null,
        bio: null,
        genre: null,
        current: null,
        birthday: null,
        id: null,
        profileImage: null,
      },
      errors: {},
      errorMessages: null,
      loading: false,
      successfulSignUp: false,
      date: new Date(),
      menu: false,
      formData: null,
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.menu.$refs.agenda.mode = 'year'))
      setTimeout(() => {
        let datesFromPicker = document.querySelectorAll(
          '.vd-picker__years-button'
        )
        Array.from(datesFromPicker).map((date) => {
          date.removeAttribute('disabled')
        })
      }, 1)
    },
  },
  methods: {
    ...mapActions('general', ['creatorSignUp']),
    clearErrors() {
      this.errorMessages = null

      this.form = {
        name: null,
        email: null,
        password: null,
        country: null,
        username: null,
        bio: null,
        genre: null,
        current: null,
        birthday: null,
        id: null,
        profileImage: null,
      }
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
    onSubmit() {
      if (this.loading) return

      let payload = new FormData()
      for (var key in this.form) {
        if (!['id', 'profileImage'].includes(key)) {
          payload.append(key, this.form[key])
        } else {
          this.form[key].forEach((x) => {
            payload.append(key == 'id' ? 'file' : 'profileImage', x.file)
          })
        }
      }

      if (this.$refs.registrationForm.validate()) {
        this.register(payload)
      }
    },
    register(payload) {
      this.loading = true

      this.creatorSignUp(payload)
        .then((response) => {
          console.log(response, 'response')
          this.successfulSignUp = true
          this.clearErrors()
          this.$refs.registrationForm.reset()
          this.loading = false
        })
        .catch((err) => {
          console.log(err, 'error')
          this.errorMessages = err
          this.loading = false
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
