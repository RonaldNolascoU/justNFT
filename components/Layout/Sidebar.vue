<template>
  <transition name="slide">
    <div class="pl-4 sidebar xl:pl-3 xl:pl-8">
      <div class="flex flex-col items-start 2xl:items-center">
        <GeneralAvatar image="/images/profile.png" />

        <div
          v-for="(route, index) in routes"
          :key="index"
          class="w-1/2 mb-12 sidebar__route"
        >
          <div
            class="text-left fs-24 grid grid-cols-2 gap-1 items-center text-secondary dark:text-active hover:text-black dark:hover:text-white"
          >
            <i
              v-if="route.name !== 'dark'"
              :class="route.icon"
              class="text-secondary dark:text-active hover:text-black dark:hover:text-white"
            />
            <NuxtLink
              v-if="route.name !== 'dark'"
              :to="
                localePath(
                  route.to == '/profile' ? nametoSlug('me') : route.to,
                  $i18n.locale
                )
              "
              class="flex items-center text-xl text-secondary dark:text-active hover:text-black dark:hover:text-white sidebar__route_link ml-2"
            >
              <span class="">
                {{ $t(`sidebar.${route.i18n}`) }}
              </span>
            </NuxtLink>
            <template v-else class="text-xl text-secondary">
              <div>
                <vs-switch
                  color="#C53761"
                  :value="$store.state.darkMode"
                  @click="toggleDarkMode"
                  size="sm"
                  id="dark"
                />
              </div>
              <div>
                <label
                  @click="toggleDarkMode()"
                  class="text-xl cursor-pointer select-none text-secondary xl:whitespace-nowrap sidebar__route_link"
                  for="dark"
                  >{{ $t('sidebar.darkMode') }}</label
                >
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import stringToSlug from '@/scripts/slug.js'
export default {
  name: 'Sidebar',
  data() {
    return {
      routes: [
        {
          to: '/profile',
          name: 'My Profile',
          i18n: 'profile',
          icon: 'fas fa-user-alt',
        },
        {
          to: '/',
          name: 'Home',
          i18n: 'home',
          icon: 'fas fa-home',
        },
        {
          to: '/saved',
          name: 'Saved',
          i18n: 'saved',
          icon: 'fas fa-bookmark',
        },
        {
          to: '/subscriptions',
          name: 'Subscriptions',
          i18n: 'subscriptions',
          icon: 'fas fa-money-check',
        },
        {
          to: '/settings',
          name: 'Settings',
          i18n: 'settings',
          icon: 'fas fa-cog',
        },
        {
          to: '#',
          name: 'dark',
          i18n: 'darkMode',
          icon: 'fas fa-cog',
        },
      ],
    }
  },
  methods: {
    toggleDarkMode() {
      this.$store.commit('TOGGLE_DARK_MODE')
    },
    nametoSlug(str) {
      return stringToSlug(str)
    },
  },
  mounted() {},
}
</script>

<style scoped>
.sidebar__route_link {
  margin-left: -2em;
}

.sidebar {
  transform: translateX(0%) !important;
}
.slide-leave-to {
  /* transform: translateX(-150%) !important; */
  -webkit-animation: slide 0.3s ease-in-out;
  animation: slide 0.3s ease-in-out;
}
</style>
