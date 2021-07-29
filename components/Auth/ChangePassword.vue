<template>
  <div>
    <div class="flex flex-col items-center login-form">
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
        <div class="flex w-full mt-3 lg:mt-3">
          <a
            @click.prevent="openForgotPassword()"
            class="fs-16 text-pink cursor-pointer"
            >{{ $t('login.forgot') }}</a
          >
        </div>

        <span
          v-if="passChanged"
          class="fs-16 text-primary font-semibold w-full"
          >{{ $t('passwords.success_mgs') }}</span
        >
        <button
          type="submit"
          :disabled="loading"
          class="bg-primary text-white w-full rounded-full pl-4 input-height fs-24 mt-3 lg:mt-4 flex justify-center items-center"
        >
          <span>
            {{ $t('passwords.btn') }}
          </span>
          <GeneralLoader v-if="loading" />
        </button>
      </form>
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
    ...mapActions('auth', ['changePassword']),
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

<style></style>
