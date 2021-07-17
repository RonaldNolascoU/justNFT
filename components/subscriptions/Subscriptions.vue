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
          >{{ $t('subscriptions.title') }}</span
        >
        <div class="flex justify-between actions py-3">
          <div
            v-for="tab in tabs"
            :key="tab.name"
            class="flex items-center rounded-full cursor-pointer border-primary action__item hover:bg-primary hover:text-white tab__action"
            @click="selectOption(tab)"
            :class="tab.active ? 'bg-primary text-white' : 'text-primary'"
          >
            <span class="flex items-center font-semibold cursor-pointer btn-fs">
              <span class="mr-2 material-icons-round">{{ tab.icon }}</span>
              {{ tab.name }}
            </span>
          </div>
        </div>
      </div>
      <span
        class="hidden xl:flex justify-center py-3 font-semibold text-white rounded-t-3xl bg-primary fs-20 hidden"
        >{{ $t('subscriptions.title') }}</span
      >
      <div id="subs__container" class="p-5 my-5 overflow-hidden">
        <div class="hidden xl:flex justify-between actions hidden">
          <div
            v-for="(tab, index) in tabs"
            :id="`tab__action_${index}`"
            :key="tab.name"
            class="flex items-center py-3 rounded-full cursor-pointer 3xl:px-16 xl:px-10 border-primary action__item hover:bg-primary hover:text-white tab__action"
            @click="selectOption(tab)"
            :class="tab.active ? 'bg-primary text-white' : 'text-primary'"
          >
            <span
              class="flex items-center font-semibold cursor-pointer fs-20 truncate"
            >
              <span class="mr-1 sm:mr-2 material-icons-round">{{
                tab.icon
              }}</span>

              {{ $t(`subscriptions.${tab.i18n}`) }}
            </span>
          </div>
        </div>
        <div
          id="scrollable"
          class="flex flex-col items-center subscription__cards xl:h-screen xl:overflow-y-scroll pt-8 xl:pt-0"
          @scroll="scrollFunction"
        >
          <SubscriptionsCard
            v-for="subscription in filteredList"
            :key="subscription.name"
            :subscription="subscription"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          slug: 'all',
          icon: 'visibility',
          name: 'View All',
          i18n: 'viewAll',
          active: true,
        },
        {
          slug: 'active',
          icon: 'stars',
          name: 'Active',
          i18n: 'active',
          active: false,
        },
        {
          slug: 'renew',
          icon: 'autorenew',
          name: 'Renew',
          i18n: 'renew',
          active: false,
        },
      ],
      subscriptions: [
        {
          i18n: 'subscribedSince',
          name: 'Alisha Soprano',
          subscribed_at: '12th march',
          cover: '/images/subscriptions/1.png',
          profile_pic: '/images/subscriptions/2.png',
          active: true,
        },
        {
          i18n: 'subscribedSince',
          name: 'Alisha Soprano2',
          subscribed_at: '26th April',
          cover: '/images/subscriptions/3.png',
          profile_pic: '/images/subscriptions/4.png',
          active: true,
        },
        {
          i18n: 'subscribedSince',
          name: 'Alisha Soprano3',
          subscribed_at: '9th may',
          cover: '/images/subscriptions/5.png',
          profile_pic: '/images/subscriptions/6.png',
          active: true,
        },
        {
          i18n: 'expiredSince',
          name: 'Beach Bum XOX',
          subscribed_at: '14th June',
          cover: '/images/subscriptions/7.png',
          profile_pic: '/images/subscriptions/8.png',
          expired_at: '12th march',
          active: false,
        },
      ],
      selectedTab: {
        slug: 'all',
      },
    }
  },
  computed: {
    filteredList() {
      if (this.selectedTab.slug == 'all') return this.subscriptions
      if (this.selectedTab.slug == 'active') {
        return this.subscriptions.filter((subscription) => {
          return subscription.active
        })
      }

      return this.subscriptions.filter((subscription) => {
        return !subscription.active
      })
    },
  },
  created() {},
  methods: {
    selectOption(tab) {
      this.selectedTab = tab
      this.tabs.map((x) => {
        x.active = false
      })
      tab.active = !tab.active
    },
    scrollFunction() {
      let subContainer = document.getElementById('subs__container')
      let nuxtContainer = document.getElementById('nuxt__container')

      if (
        document.documentElement.scrollTop > 40 ||
        document.getElementById('scrollable').scrollTop > 40
      ) {
        nuxtContainer.classList.remove('xl:pt-12')
        nuxtContainer.classList.add('xl:pt-2')
        subContainer.classList.remove('p-5', 'my-5')
        subContainer.classList.add('pt-0', 'mt-1', 'px-5', 'pb-5', 'mb-5')
        for (var i = 0; i < 3; i++) {
          let tabBtn = document.getElementById(`tab__action_${i}`)
          tabBtn.classList.remove('py-3')
          tabBtn.classList.add('py-0')
        }
      } else {
        subContainer.classList.remove('pt-0', 'mt-0', 'px-5', 'pb-5', 'mb-5')
        subContainer.classList.add('p-5', 'my-5')
        nuxtContainer.classList.add('xl:pt-12')
        nuxtContainer.classList.remove('xl:pt-2')
        for (var i = 0; i < 3; i++) {
          let tabBtn = document.getElementById(`tab__action_${i}`)
          tabBtn.classList.add('py-3')
          tabBtn.classList.remove('py-0')
        }
      }
    },
  },
}
</script>

<style>
.action__item {
  user-select: none;
}
</style>
