<template>
  <div
    v-click-outside="hideSidebar"
    class="rounded-xl bg-white dark:bg-black px-6 py-4 absolute -translate-y-full right-0 top-0 mobile__sidebar overflow-y-scroll"
  >
    <div class="user__data flex items-center">
      <div class="badges mt-5 mr-5">
        <BadgeJust />
        <BadgeAddress />
      </div>
      <GeneralAvatar
        image="/images/profile.png"
        v-if="$store.state.auth.user.role_id == 2"
      />
    </div>
    <div class="routes">
      <ul>
        <li
          v-if="$store.state.auth.user.role_id == 2"
          class="divide-y-4 divide-yellow-600 text-center border-b-2 border-gray-100"
        >
          <nuxt-link :to="'/profile'" class="dark:text-active">
            <div class="flex justify-center items-center pb-2 pt-2 my-2">
              <div class="fs-20">
                {{ $t(`sidebar.profile`) }}
              </div>
              <i class="fas fa-user fs-20 ml-3" />
            </div>
          </nuxt-link>
        </li>

        <li
          v-for="(option, index) in options"
          :key="index"
          class="divide-y-4 divide-yellow-600 text-center border-b-2 border-gray-100"
        >
          <component
            :is="option.to ? 'nuxt-link' : 'div'"
            :to="option.to ? option.to : undefined"
            class="dark:text-active"
          >
            <div
              v-if="option.type == 'switch'"
              class="fs-20 flex justify-start items-center text-secondary pb-2 pt-2 my-2"
            >
              <vs-switch
                color="#C53761"
                :value="$store.state.darkMode"
                @click="toggleDarkMode"
                size="sm"
                id="dark"
              />
              <label
                @click="toggleDarkMode"
                class="ml-3 fs-20 cursor-pointer select-none text-secondary xl:whitespace-nowrap"
                for="dark"
                >{{ $t('sidebar.darkMode') }}</label
              >
            </div>
            <div
              v-else-if="option.type == 'language'"
              class="flex justify-start items-center pt-2 my-2 cursor-pointer"
            >
              <GeneralTranslateDropdown />
            </div>

            <div
              v-else-if="option.type == 'new-post'"
              class="flex justify-end items-center my-2 cursor-pointer"
            >
              <nuxt-link
                to="/new-post"
                class="rounded-full border-primary hover:bg-primary bg-primary font-bold py-1 px-10 text-center font-semibold btn-fs fs-20 text-white-color"
              >
                Add Post
              </nuxt-link>
            </div>

            <!-- LOGOUT -->
            <div
              v-else
              class="flex justify-start items-center pt-2 my-2 cursor-pointer"
              @click="$store.dispatch('general/logout')"
            >
              <span class="material-icons-round fs-20 mr-3">
                {{ option.icon }}
              </span>
              <span class="fs-20">
                {{ $t(`sidebar.${option.i18n}`) }}
              </span>
            </div>
          </component>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          icon: 'home',
          pack: 'material',
          name: 'Home',
          i18n: 'home',
          to: '/',
        },
        {
          icon: 'bookmark',
          pack: 'material',
          name: 'Saved',
          i18n: 'saved',
          to: '/saved',
        },
        {
          icon: 'payment',
          pack: 'material',
          name: 'Subscriptions',
          i18n: 'subscriptions',
          to: '/subscriptions',
        },
        {
          icon: 'settings',
          pack: 'material',
          name: 'Settings',
          i18n: 'settings',
          to: '/settings',
        },
        {
          type: 'language',
        },
        {
          type: 'switch',
          name: 'Dark Mode',
          i18n: 'darkMode',
        },
        {
          type: 'new-post',
          name: 'New Post',
        },
        {
          icon: 'power_settings_new',
          pack: 'material',
          name: 'Log out',
          i18n: 'logOut',
        },
      ],
    }
  },
  methods: {
    toggleDarkMode() {
      this.$store.commit('TOGGLE_DARK_MODE')
    },
    hideSidebar() {
      this.$store.commit('TOGGLE_SIDEBAR')
    },
  },
  mounted() {
    if (this.$auth.user !== 2) {
      this.options = this.options.filter((x) => x.type != 'new-post')
    }
  },
}
</script>

<style scoped lang="scss">
.mobile__sidebar {
  .profile__pic {
    margin-bottom: 0 !important;
    width: 5rem;
  }

  li:last-child {
    border-bottom: 0 !important;
    padding-bottom: 0.25em;
    margin-bottom: 0.25em;
  }
}
</style>
