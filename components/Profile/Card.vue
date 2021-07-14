<template>
  <div class="relative my-8 profile__card">
    <div class="relative">
      <vs-card actionable class="w-full">
        <div slot="media">
          <img :src="model.cover" :alt="model.name" />
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
            >Posts <span class="text-primary">79</span></span
          >
          <span class="dark:text-white"
            >Likes <span class="text-primary">2.3k</span></span
          >
        </h3>
      </div>
    </div>
    <div class="content mt-20">
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
            class="px-16 py-2 text-white bg-primary rounded-2xl flex justify-center items-center cursor-pointer"
          >
            <span class="material-icons-outlined mr-3"> lock </span>
            <span><b>Subscribe</b> to unlock content</span>
          </a>
        </div>
      </div>
      <div class="mt-5 hidden lg:block">
        <div class="pricing__wrapper">
          <ProfilePricingCards />
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
      isMenuOpen: false,
    }
  },
  methods: {
    openOptions() {
      this.isMenuOpen = !this.isMenuOpen
    },
    hide() {
      this.isMenuOpen = false
    },
  },
}
</script>

<style scoped lang="scss">
.profile__card {
  .personal__data {
    position: relative;
    left: 22%;
  }

  .content {
    .info {
      line-height: 29px;
      letter-spacing: 0.183333px;
      font-weight: 500;
      p {
        max-width: 60%;
      }
    }

    .pricing__wrapper {
      box-shadow: 0px 0px 20px rgba(188, 188, 188, 0.3);
      border-radius: 38px;
      padding: 0.5em;
    }
  }
}
</style>
