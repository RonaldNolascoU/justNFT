<template>
  <div
    v-click-outside="hide"
    class="absolute flex items-center px-4 w-full justify-center py-1 mt-3 rounded-xl shadow-white dark:bg-black bg-white z-50 cursor-pointer select-none user__actions__dropdown"
    :class="{ 'ease-in-out': open }"
  >
    <div
      class="absolute ease-in-out transform shadow-md rounded-xl px-7 dark:bg-black dark:custom-box-shadow subscriptions menu__options"
    >
      <ul>
        <li
          class="flex items-center my-3 cursor-pointer hover:underline transform transition duration-300 ease-in-out hover:scale-110"
          @click="$router.push('/creator-signup')"
        >
          <span class="mr-3 material-icons-round text-gray text-primary"
            >verified</span
          >
          <span class="font-semibold fs-14 text-gray hover:underline">
            Content Creator Sign Up
          </span>
        </li>
        <li
          class="flex items-center my-3 cursor-pointer hover:underline transform transition duration-300 ease-in-out hover:scale-110"
          @click="copy"
        >
          <span class="mr-3 material-icons-round text-gray text-primary"
            >content_copy</span
          >
          <span class="font-semibold fs-14 text-gray hover:underline">
            {{ copied ? 'Copied!' : 'Copy Address' }}
          </span>
        </li>
        <li
          class="flex items-center my-3 cursor-pointer hover:underline transform transition duration-300 ease-in-out hover:scale-110"
          @click="logout"
        >
          <span class="mr-3 material-icons-round text-gray text-primary"
            >power_settings_new</span
          >
          <span class="font-semibold fs-14 text-gray hover:underline">
            Log Out
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['open'],
  data() {
    return {
      copied: false,
    }
  },
  methods: {
    hide() {
      this.$emit('hide')
    },
    copy() {
      this.copied = true
      this.$emit('copy')
      setTimeout(() => {
        this.copied = false
      }, 5000)
    },
    logout() {
      this.$store.dispatch('general/logout')
    },
  },
}
</script>

<style scoped lang="scss">
.user__actions__dropdown {
  transform: translate(-36%, 60px);
  width: 275px;

  .menu__options {
    width: 275px;
  }

  button {
    padding-bottom: 0.5em;
    margin-bottom: 1em;
    border-bottom: 1px solid white;
    &:last-child {
      border-bottom: 0 !important;
    }
  }
}
</style>
