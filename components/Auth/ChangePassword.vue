<template>
  <div class="xl:px-4">
    <div
      class="bg-white shadow-lg rounded-3xl subscriptions dark:bg-black dark:custom-box-shadow"
    >
      <div
        class="sub_nav fixed xl:hidden z-20 top-0 pt-5 bg-white dark:bg-black px-2"
      >
        <span
          class="flex justify-center py-3 font-semibold text-pink fs-20 btn-letter-spacing border-b-2 border-lighter"
          >CHANGE PASSWORD</span
        >
      </div>
      <span
        class="hidden xl:flex justify-center py-3 font-semibold text-white rounded-t-3xl bg-primary fs-20 hidden"
        >Change Password</span
      >
      <div id="subs__container" class="p-5 my-5 overflow-hidden">
        <div
          class="flex flex-col items-center subscription__cards xl:h-screen xl:overflow-y-scroll pt-8 xl:pt-0 mx-auto md:mx-16 xl:mx-5"
        >
          <form @submit.prevent="onSubmit" class="w-full">
            <input
              class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-3"
              v-model="form.old_password"
              :placeholder="$t('passwords.old_password')"
              type="password"
              required
            />
            <!-- <span
          v-if="errors.email"
          class="fs-16 text-primary font-semibold w-full"
          >{{ errors.email }}</span
        > -->
            <input
              class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-3"
              v-model="form.new_password"
              :placeholder="$t('passwords.new_password')"
              type="password"
              required
            />
            <!-- <span
          v-if="errors.password"
          class="fs-16 text-primary font-semibold w-full"
          >{{ errors.password }}</span
        > -->
            <input
              class="input-height fs-16 border-lighter border-2 w-full rounded-full pl-4 mt-3 lg:mt-3"
              v-model="form.confirm_password"
              :placeholder="$t('passwords.confirm_password')"
              type="password"
              required
            />
            <!-- <span
          v-if="errors.password"
          class="fs-16 text-primary font-semibold w-full"
          >{{ errors.password }}</span
        > -->

            <span
              v-if="passChanged"
              class="fs-16 text-primary font-semibold w-full"
              >{{ $t('passwords.success_mgs') }}</span
            >
            <button
              type="submit"
              :disabled="loading"
              class="bg-primary text-white w-full rounded-full pl-4 input-height fs-24 mt-8 flex justify-center items-center"
            >
              <span>
                {{ $t('passwords.btn') }}
              </span>
              <GeneralLoader v-if="loading" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      passChanged: false,
      form: {
        new_password: '',
        old_password: '',
        confirm_password: '',
      },
    }
  },
  methods: {
    ...mapActions('general', ['changePassword']),
    onSubmit() {
      if (this.loading) return

      // if (this.$refs.changeForm.validate()) {
      // }

      let payload = {
        old_password: this.form.old_password,
        new_password: this.form.new_password,
      }

      this.changePassword(payload)
    },
  },
}
</script>
