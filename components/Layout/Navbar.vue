<template>
  <nav
    id="navbar"
    class="xl:container flex justify-center w-full max-w-full xl:mx-3 2xl:px-10 xl:pt-4 border-t navbar bg-white dark:bg-black border-lighter xl:border-0 xl:top-2"
  >
    <div
      class="flex items-center justify-center xl:justify-between pl-16 xl:pl-0 nav-items"
    >
      <div
        class="logo-container mr-2 md:mr-3 2xl:mr-10 2xl:mr-0 cursor-pointer"
        @click="$router.push('/')"
      >
        <img
          class="self-start my-3 xl:my-0"
          src="~/assets/img/logo.svg"
          @click="$router.push('/')"
        />
      </div>

      <div class="hidden 2xl:block" style="width: 12%"></div>

      <div class="hidden search-input xl:flex">
        <vs-input
          block
          type="text"
          icon-after
          v-model="searchValue"
          placeholder="Search"
          icon="search"
          class=""
        >
          <template #icon>
            <span class="fs-40">
              <i class="cursor-pointer fs-40 fas fa-search text-secondary" />
            </span>
          </template>
        </vs-input>
      </div>

      <div
        class="flex items-center justify-between 2xl:ml-10 xl:pr-1 2xl:pr-10"
      >
        <div class="px-4 sm:px-10 2xl:px-10 xl:pl-3 xl:pr-5" role="button">
          <span
            class="my-3 mb-0 text-white xl:my-0 material-icons fs-40 fs-res-24 icons-color select-none"
            @click.prevent.stop="
              isMobile ? $router.push('/chats') : handleOpenModals('msg')
            "
          >
            question_answer
          </span>
          <div
            v-if="!isMobile"
            class="relative justify-center ease-in-out hidden xl:flex messages__dropdown__wrapper"
            :class="{ 'ease-in-out': msgBox }"
          >
            <img
              v-if="msgBox"
              @click.prevent.stop="openMessages"
              src="~/assets/img/dropdown.png"
              :class="`absolute mx-0 dropdown ${
                msgBox ? 'dropdown-active' : ''
              }`"
            />
            <MessageDropdown
              v-if="msgBox"
              :messages="messages"
              @hidden="msgBox = false"
            />
          </div>
        </div>

        <div
          class="px-4 sm:px-10 2xl:px-10 xl:px-5"
          role="button"
          @click.prevent.stop="
            isMobile
              ? $router.push('/notifications')
              : handleOpenModals('notify')
          "
        >
          <span
            class="my-3 text-white xl:my-0 notification material-icons fs-40 fs-res-24 icons-color select-none"
          >
            notifications_active
          </span>
          <div
            v-if="!isMobile"
            class="hidden xl:flex justify-center ease-in-out"
            :class="{ 'ease-in-out': notifyBox }"
          >
            <img
              v-if="notifyBox"
              src="~/assets/img/dropdown.png"
              class="mx-0 absolute"
            />
          </div>
        </div>

        <div
          class="px-4 sm:px-10 2xl:px-10 xl:px-5 block xl:hidden"
          role="button"
          @click.prevent.stop="
            isMobile ? $router.push('/suggestions') : handleOpenModals('notify')
          "
        >
          <span
            class="my-3 text-white xl:my-0 notification material-icons fs-40 fs-res-24 icons-color select-none"
          >
            try
          </span>
          <div
            v-if="!isMobile"
            class="hidden xl:flex justify-center ease-in-out"
            :class="{ 'ease-in-out': notifyBox }"
          >
            <img
              v-if="notifyBox"
              src="~/assets/img/dropdown.png"
              class="mx-0"
            />
          </div>
        </div>

        <div class="px-4 sm:px-10 2xl:px-10 xl:pl-5" role="button">
          <nuxt-link to="/store">
            <span
              class="my-3 text-white xl:my-0 notification material-icons fs-40 fs-res-24 icons-color select-none"
            >
              store
            </span></nuxt-link
          >
        </div>
      </div>

      <div class="hidden xl:flex">
        <BadgeJust />
      </div>

      <div class="hidden xl:flex xl:ml-5 2xl:ml-10">
        <BadgeAddress />
      </div>

      <div
        class="block menu xl:hidden fs-40 text-secondary pl-2 md:pl-5 xl:pl-0"
      >
        <i
          role="button"
          class="fas fa-bars"
          @click.prevent.stop="toggleSidebar"
        ></i>
        <LayoutMobileSidebar v-if="$store.state.sidebar" />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  data() {
    return {
      msgBox: false,
      notifyBox: false,
      notificationsBox: false,
      storeBox: false,
      darkMode: true,
      searchValue: '',
      isMobile: false,
      messages: [
        {
          userId: 11,
          image: 'msg-profile07',
          name: 'Rayella Ferguss',
          msg: 'I’m ready for the shoot tom',
          date: '12w',
          count: 3,
        },
        {
          userId: 2,
          image: 'msg-profile06',
          name: 'Mistique Madeline',
          msg: 'Wondering about the idea...',
          date: '7w',
        },
        {
          userId: 3,
          image: 'msg-profile05',
          name: 'Caroline Daenm..',
          msg: 'What about the surfboard...',
          date: '1w',
          count: 5,
        },
        {
          userId: 4,
          image: 'msg-profile04',
          name: 'Shameil Khan',
          msg: 'That works for me.',
          date: '5d',
        },
        {
          userId: 5,
          image: 'msg-profile03',
          name: 'Gizelle Zifadsy',
          msg: ' Honey be goin wild at all ti..',
          date: '3d',
          count: 1,
        },
        {
          userId: 6,
          image: 'msg-profile02',
          name: 'Shannon Kala.',
          msg: 'She may or may not like we..',
          date: '3d',
        },
        {
          userId: 7,
          image: 'msg-profile01',
          name: 'Mikella Jia',
          msg: 'You: Gotta meet you tomm...',
          date: '1d',
        },
      ],
    }
  },
  computed: {
    isMainPage() {
      return this.$route.path == '/'
    },
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
  mounted() {
    this.darkMode = this.$store.state.darkMode
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 1280
      const forbiddenRoutes = ['/chats', '/notifications', '/suggestions']
      if (
        !this.isMobile &&
        (forbiddenRoutes.includes(this.$route.path) ||
          this.$route.name == 'chats-id')
      ) {
        this.$router.push('/')
      }
    },
    openMessages() {
      this.msgBox = !this.msgBox
    },
    hide() {
      this.msgBox = false
    },
    toggleSidebar() {
      this.$store.commit('TOGGLE_SIDEBAR')
    },
    handleOpenModals(type) {
      if (type == 'msg') {
        this.msgBox = !this.msgBox
        this.notifyBox = false
      }
      if (type == 'notify') {
        this.notifyBox = !this.notifyBox
        this.msgBox = false
      }
    },
  },
}
</script>

<style scoped>
.dark:bg-gray-700 > input {
  background: red;
}
</style>
