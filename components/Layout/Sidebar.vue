<template>
  <transition name="slide">
    <div class="pl-4 sidebar lg:pl-3 xl:pl-8">
      <div class="flex flex-col items-start 2xl:items-center">
        <GeneralAvatar image="/images/profile.png" />

        <div
          v-for="(route, index) in routes"
          :key="index"
          class="w-1/2 mb-12 sidebar__route"
        >
          <div class="text-left fs-24 grid grid-cols-2 gap-1 items-center">
            <i
              v-if="route.name !== 'dark'"
              :class="route.icon"
              class="dark:text-active text-secondary hover:text-black dark:hover:text-white text-white"
            />
            <NuxtLink
              v-if="route.name !== 'dark'"
              :to="route.to"
              class="flex items-center text-xl text-secondary dark:text-active hover:text-black dark:hover:text-white sidebar__route_link ml-2"
            >
              <span class="">
                {{ route.name }}
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
                  >Dark Mode</label
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
export default {
  name: 'Sidebar',
  data() {
    return {
      routes: [
        {
          to: '/profile',
          name: 'My Profile',
          class: '',
          icon: 'fas fa-user-alt',
        },
        {
          to: '/',
          name: 'Home',
          class: '',
          icon: 'fas fa-home',
        },
        {
          to: '/saved',
          name: 'Saved',
          class: '',
          icon: 'fas fa-bookmark',
        },
        {
          to: '/subscriptions',
          name: 'Subscriptions',
          class: '',
          icon: 'fas fa-money-check',
        },
        {
          to: '/settings',
          name: 'Settings',
          class: '',
          icon: 'fas fa-cog',
        },
        {
          to: '#',
          name: 'dark',
          class: '',
          icon: 'fas fa-cog',
        },
      ],
    }
  },
  methods: {
    toggleDarkMode() {
      this.$store.commit('TOGGLE_DARK_MODE')
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
