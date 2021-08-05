<template>
  <div
    class="relative h-screen flex bg-blue-gray-50 dark:bg-black dark:text-white overflow-hidden settings__screen"
  >
    <div
      class="flex-1 min-w-0 flex flex-col overflow-hidden"
      v-if="settingSelected"
    >
      <main class="flex-1 flex overflow-auto lg:overflow-hidden">
        <div class="flex-1 flex flex-col overflow-y-auto lg:overflow-hidden">
          <!-- Breadcrumb -->
          <nav
            aria-label="Breadcrumb"
            class="bg-white border-b border-blue-gray-200 lg:hidden"
          >
            <div class="max-w-3xl py-3 px-4 flex items-start sm:px-6 lg:px-8">
              <a
                @click="
                  settingSelected = null
                  $router.push('/settings')
                "
                class="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-blue-gray-900"
              >
                <!-- Heroicon name: solid/chevron-left -->
                <svg
                  class="h-5 w-5 text-blue-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>Settings</span>
              </a>
            </div>
          </nav>

          <div class="flex-1 flex lg:overflow-hidden">
            <!-- Secondary sidebar -->
            <nav
              aria-label="Sections"
              class="hidden flex-shrink-0 w-96 bg-white dark:bg-black border-r border-blue-gray-200 lg:flex lg:flex-col"
            >
              <div
                class="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center"
              >
                <p
                  class="text-lg font-medium text-blue-gray-900 dark:text-white"
                >
                  Settings
                </p>
              </div>
              <div class="flex-1 min-h-0 overflow-y-auto">
                <!-- Current: "bg-blue-50 bg-opacity-50", Default: "hover:bg-blue-50 hover:bg-opacity-50" -->
                <a
                  v-for="(setting, index) in settings"
                  :key="index"
                  class="flex p-6 border-b border-blue-gray-200 dark:hover:bg-light-gray cursor-pointer"
                  @click="selectOption(setting)"
                  :class="
                    setting.selected
                      ? 'bg-blue-50 dark:bg-light-gray bg-opacity-50'
                      : null
                  "
                  aria-current="page"
                >
                  <div v-html="setting.svg"></div>
                  <div class="ml-3 text-sm">
                    <p class="font-medium text-blue-gray-900 dark:text-white">
                      {{ setting.name }}
                    </p>
                    <p class="mt-1 text-blue-gray-500">
                      {{ setting.description }}
                    </p>
                  </div>
                </a>
              </div>
            </nav>

            <!-- Main content -->
            <SettingsAccount v-if="settingSelected == 'Account'" />
            <SettingsNotifications v-if="settingSelected == 'Notifications'" />
            <SettingsSecurity v-if="settingSelected == 'Security'" />
            <SettingsAppereance v-if="settingSelected == 'Appereance'" />
            <SettingsBilling v-if="settingSelected == 'Billing'" />
          </div>
        </div>
      </main>
    </div>
    <div class="flex-1 flex lg:overflow-hidden" v-else>
      <!-- Secondary sidebar -->
      <nav
        aria-label="Sections"
        class="flex flex-col flex-shrink-0 w-full bg-white dark:bg-black border-r border-blue-gray-200 lg:hidden"
      >
        <div
          class="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center"
        >
          <p class="text-lg font-medium text-blue-gray-900 dark:text-white">
            Settings
          </p>
        </div>
        <div class="flex-1 min-h-0 overflow-y-auto">
          <!-- Current: "bg-blue-50 bg-opacity-50", Default: "hover:bg-blue-50 hover:bg-opacity-50" -->
          <a
            v-for="(setting, index) in settings"
            :key="index"
            class="flex p-6 border-b border-blue-gray-200 dark:hover:bg-light-gray cursor-pointer"
            @click="selectOption(setting)"
            :class="
              setting.selected
                ? 'bg-blue-50 dark:bg-light-gray bg-opacity-50'
                : null
            "
            aria-current="page"
          >
            <div v-html="setting.svg"></div>
            <div class="ml-3 text-sm">
              <p class="font-medium text-blue-gray-900 dark:text-white">
                {{ setting.name }}
              </p>
              <p class="mt-1 text-blue-gray-500">
                {{ setting.description }}
              </p>
            </div>
          </a>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  layout: 'full',
  data() {
    return {
      settings: [
        {
          name: 'Account',
          svg: `<svg
                    class="flex-shrink-0 -mt-0.5 h-6 w-6 text-blue-gray-400 dark:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>`,
          description:
            'Ullamcorper id at suspendisse nec id volutpat vestibulum enim. Interdum blandit.',
          selected: true,
        },
        {
          name: 'Notifications',
          svg: `<svg
                    class="flex-shrink-0 -mt-0.5 h-6 w-6 text-blue-gray-400 dark:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>`,
          description:
            'Ullamcorper id at suspendisse nec id volutpat vestibulum enim. Interdum blandit.',
          selected: false,
        },
        {
          name: 'Security',
          svg: `<svg
                    class="flex-shrink-0 -mt-0.5 h-6 w-6 text-blue-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>`,
          description:
            'Ullamcorper id at suspendisse nec id volutpat vestibulum enim. Interdum blandit.',
          selected: false,
        },
        {
          name: 'Appereance',
          svg: `<svg
                    class="flex-shrink-0 -mt-0.5 h-6 w-6 text-blue-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>`,
          description:
            'Ullamcorper id at suspendisse nec id volutpat vestibulum enim. Interdum blandit.',
          selected: false,
        },
        {
          name: 'Billing',
          svg: `<svg
                    class="flex-shrink-0 -mt-0.5 h-6 w-6 text-blue-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>`,
          description:
            'Ullamcorper id at suspendisse nec id volutpat vestibulum enim. Interdum blandit.',
          selected: false,
        },
      ],
      settingSelected: null,
      isMobile: false,
    }
  },
  methods: {
    selectOption(opt) {
      this.settingSelected = opt.name
      // this.$router.replace(`/${opt.name.toLowerCase()}`)
      this.$router.replace({ hash: `#${opt.name.toLowerCase()}` })
      this.settings.forEach((setting) => (setting.selected = false))
      opt.selected = true
    },
    onResize() {
      this.isMobile = window.innerWidth < 1024
      if (!this.isMobile && this.$route.hash == '') {
        this.settingSelected = 'Account'
        this.$router.replace({ hash: `#account` })
      }
    },
  },
  created() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })

    let setting = this.settings.find((x) =>
      this.$route.hash.includes(x.name.toLowerCase())
    )
    if (setting) {
      this.settings.forEach((x) => {
        x.selected = false
      })
      this.settingSelected = setting.name
      setting.selected = true
    }
  },
}
</script>

<style lang="scss">
.settings__screen {
  input {
    height: 30px;
  }
}
</style>
