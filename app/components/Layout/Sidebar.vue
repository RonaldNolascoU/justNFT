<template>
  <transition name="slide">
    <div class="pl-4 sidebar xl:pl-3">
      <div class="flex flex-col items-start 2xl:items-center">
        <GeneralAvatar
          :image="
            $store.state.auth.user.profile_img &&
            `${S3Bucket}/${$store.state.auth.user.profile_img}`
          "
          v-if="$store.state.auth.user.role_id == 2"
        />

        <div
          v-if="$store.state.auth.user.role_id == 2"
          class="w-1/2 mb-12 sidebar__route"
        >
          <div
            class="text-left fs-24 grid grid-cols-2 gap-2 items-center text-secondary dark:text-active hover:text-black dark:hover:text-white"
          >
            <!-- My Profile -->
            <i
              class="text-secondary dark:text-active hover:text-black dark:hover:text-white fas fa-user-alt"
            />

            <NuxtLink
              class="flex items-center text-xl text-secondary dark:text-active hover:text-black dark:hover:text-white sidebar__route_link ml-2"
              :to="nametoSlug('me')"
            >
              <span class="">
                {{ $t(`sidebar.profile`) }}
              </span>
            </NuxtLink>
          </div>
          <!-- End profile  -->
        </div>

        <div
          v-for="(route, index) in routes"
          :key="index"
          class="w-1/2 mb-12 sidebar__route"
        >
          <div
            class="text-left fs-24 grid grid-cols-2 gap-2 items-center text-secondary dark:text-active hover:text-black dark:hover:text-white"
          >
            <i
              :class="route.icon"
              class="text-secondary dark:text-active hover:text-black dark:hover:text-white"
            />
            <NuxtLink
              :to="route.to"
              class="flex items-center text-xl text-secondary dark:text-active hover:text-black dark:hover:text-white sidebar__route_link ml-2"
            >
              <span class="">
                {{ $t(`sidebar.${route.i18n}`) }}
              </span>
            </NuxtLink>
          </div>
        </div>
        <div class="w-1/2 mb-12 sidebar__route">
          <div
            class="text-xl text-secondary grid grid-cols-2 gap-2 items-center text-secondary dark:text-active hover:text-black dark:hover:text-white"
          >
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
          </div>
        </div>
        <!-- <nuxt-link
          to="/new-post"
          v-if="$auth.user.role_id == 2"
          class="rounded-full border-primary hover:bg-primary bg-primary font-bold py-2 px-16 text-center font-semibold btn-fs text-white-color"
        >
          Add Post
        </nuxt-link> -->
        <a
          to="/new-post"
          @click="comingSoon()"
          v-if="$auth.user.role_id == 2"
          class="rounded-full border-primary hover:bg-primary bg-primary font-bold py-2 px-16 text-center font-semibold btn-fs text-white-color"
        >
          Add Post
        </a>
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
          to: '/',
          name: 'Home',
          i18n: 'home',
          icon: 'fas fa-home',
          contentCreatorRoute: false,
        },
        {
          to: '/store',
          name: 'Store',
          i18n: 'store',
          icon: 'fas fa-store',
          contentCreatorRoute: false,
        },
        {
          to: '/saved',
          name: 'Saved',
          i18n: 'saved',
          icon: 'fas fa-bookmark',
          contentCreatorRoute: false,
        },
        {
          to: '/subscriptions',
          name: 'Subscriptions',
          i18n: 'subscriptions',
          icon: 'fas fa-money-check',
          contentCreatorRoute: false,
        },
        {
          to: '/settings',
          name: 'Settings',
          i18n: 'settings',
          icon: 'fas fa-cog',
          contentCreatorRoute: false,
        },
      ],
    }
  },
  computed: {
    S3Bucket() {
      return this.$store.state.general.S3Bucket
    },
  },
  methods: {
    toggleDarkMode() {
      this.$store.commit('TOGGLE_DARK_MODE')
    },
    nametoSlug(str) {
      return stringToSlug(str)
    },
    comingSoon() {
      alert('coming soon...')
    },
  },
  mounted() {
    if (this.$auth.user.role_id != 2) {
      let settingsPage = this.routes.find((x) => x.name == 'Settings')
      settingsPage.contentCreatorRoute = true
    }
  },
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
