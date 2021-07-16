<template>
  <div class="relative my-3 xl:my-5 profile__card">
    <div class="relative">
      <vs-card actionable class="w-full">
        <div slot="media">
          <nuxt-img :src="model.cover" :alt="model.name" />
        </div>
      </vs-card>
      <GeneralAvatar
        :isAbsolute="true"
        :image="model.profile_pic"
        :showAvailableStatus="false"
      />
    </div>
    <div class="-mt-4">
      <div class="personal__data">
        <h3 class="font-semibold fs-24">
          <span class="dark:text-white"
            >{{ $t('profile.posts') }}
            <span class="text-primary">79</span></span
          >
          <span class="dark:text-white"
            >{{ $t('profile.likes') }}
            <span class="text-primary">2.3k</span></span
          >
        </h3>
      </div>
    </div>
    <div class="content mt-10 lg:mt-20">
      <div class="flex justify-between fs-24">
        <div class="info dark:text-white">
          <b>Ecstatic Wellness</b>
          <p>
            Welcome to Wellness Wednesdays💕 Podcast hosted by @yogawithtaz New
            episode every Wednesday💕
          </p>
        </div>
        <i class="fas fa-ellipsis-v text-gray" />
      </div>
      <div class="mt-8">
        <div class="subscribe__button_wrapper flex justify-center fs-24">
          <a
            class="px-4 md:px-16 py-2 text-white bg-primary rounded-2xl flex justify-center items-center cursor-pointer"
          >
            <span class="material-icons-outlined mr-3"> lock </span>
            <span
              ><b>{{ $t('profile.subscribeFrom') }}</b> for 5000 $JUST</span
            >
          </a>
        </div>
      </div>
      <div class="mt-5 hidden">
        <div class="pricing__wrapper">
          <ProfilePricingCards />
        </div>
      </div>
      <div class="mt-5">
        <div class="bg-gray-200 dark:bg-black media p-3">
          <div class="ctas flex justify-between">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              class="flex justify-center items-center rounded-full border-primary action__item hover:bg-primary hover:text-white text-white fs-10 py-3 px-2 xs:fs-16 sm:px-4 md:px-6 xl:px-10"
              @click="selectOption(tab)"
              :class="tab.active ? 'bg-primary text-white' : 'text-primary'"
            >
              <span class="material-icons-round mr-1 sm:mr-3">
                {{ tab.icon }}
              </span>
              {{ $t(`profile.${tab.slug}`) }}
            </button>
          </div>
          <div class="mt-5">
            <div class="media__content">
              <keep-alive
                ><ProfileMediaLayout :tab="selectedTab" />
              </keep-alive>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
    },
  },
  data() {
    return {
      selectedTab: 'images',
      isMenuOpen: false,
      tabs: [
        {
          slug: 'images',
          icon: 'image',
          name: 'Images',
          active: true,
        },
        {
          slug: 'videos',
          icon: 'videocam',
          name: 'Videos',
          active: false,
        },
        {
          slug: 'livestreams',
          icon: 'sensors',
          name: 'Livestreams',
          active: false,
        },
      ],
    }
  },
  methods: {
    openOptions() {
      this.isMenuOpen = !this.isMenuOpen
    },
    hide() {
      this.isMenuOpen = false
    },
    selectOption(tab) {
      this.selectedTab = tab.slug
      this.tabs.map((x) => {
        x.active = false
      })
      tab.active = !tab.active
    },
  },
}
</script>

<style scoped lang="scss">
.profile__card {
  .personal__data {
    position: relative;
    margin-left: 20%;
    @media (max-width: 1280px) {
      text-align: center;
      margin-left: 0;
    }
  }

  .content {
    .info {
      line-height: 29px;
      letter-spacing: 0.183333px;
      font-weight: 500;
      @media (max-width: 1280px) {
        text-align: center;
      }
      p {
        max-width: 60%;
        @media (max-width: 1280px) {
          max-width: 100%;
          text-align: center;
        }
      }
    }

    .pricing__wrapper {
      box-shadow: 0px 0px 20px rgba(188, 188, 188, 0.3);
      border-radius: 38px;
      padding: 0.5em;
    }
  }

  .media {
    box-shadow: 0px 0px 20px rgba(188, 188, 188, 0.3);
    border-radius: 50px;
  }
}
</style>
