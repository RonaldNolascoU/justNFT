<template>
  <div class="relative my-8">
    <div class="relative">
      <vs-card actionable class="w-full">
        <div class="cover__photo" slot="media">
          <img
            src="/images/default_header.png"
            :alt="subscription.name"
            :class="!subscription.active ? 'filter grayscale' : null"
          />
        </div>
      </vs-card>
      <GeneralAvatar
        :isGrayScale="!subscription.active ? true : false"
        :isAbsolute="true"
        :image="subscription.profile_pic"
        :showAvailableStatus="false"
      />
    </div>
    <div class="flex justify-between -mt-4">
      <div class="personal__data">
        <h3 class="font-semibold text-pink fs-24">
          <nuxt-link
            :to="nametoSlug(subscription.creator.name)"
            class="hover:underline dark:hover:text-primary"
            >{{ subscription.creator.name }}</nuxt-link
          >
        </h3>
        <span class="font-semibold text-blue fs-16">{{
          subscription.active
            ? $t(`subscriptions.subscribedSince`) +
              ' ' +
              formatDate(subscription.created_at)
            : $t(`subscriptions.expiredSince`) +
              ' ' +
              formatDate(subscription.expire_date)
        }}</span>
      </div>

      <div class="relative">
        <i
          title="More options"
          class="mt-3 cursor-pointer text-gray fas fa-ellipsis-v fs-16"
          @click.prevent.stop="openOptions"
        ></i>
        <div
          v-click-outside="hide"
          class="absolute ease-in-out transform shadow-md rounded-xl px-7 dark:bg-black dark:custom-box-shadow subscriptions menu__options"
          v-if="isMenuOpen"
        >
          <ul>
            <li class="flex items-center my-3 cursor-pointer">
              <span class="mr-3 material-icons-round text-gray text-primary"
                >mode</span
              >
              <span class="font-semibold fs-14 text-gray">
                {{ $t('subscriptions.options.manage') }}
              </span>
            </li>
            <li class="flex items-center my-3 cursor-pointer">
              <span class="mr-3 material-icons-round text-gray text-primary"
                >clear</span
              >
              <span class="font-semibold fs-14 text-gray">
                {{ $t('subscriptions.options.remove') }}
              </span>
            </li>
            <li class="flex items-center my-3 cursor-pointer">
              <span class="mr-3 material-icons-round text-gray text-primary"
                >autorenew</span
              >
              <span class="font-semibold fs-14 text-gray">
                {{ $t('subscriptions.options.renew') }}
              </span>
            </li>
            <li class="flex items-center my-3 cursor-pointer">
              <span class="mr-3 material-icons-round text-gray text-primary"
                >do_not_disturb_on_total_silence</span
              >
              <span class="font-semibold fs-14 text-gray">
                {{ $t('subscriptions.options.mute') }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import stringToSlug from '@/scripts/slug.js'
export default {
  props: {
    subscription: {
      type: Object,
      default: () => [],
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
    nametoSlug(str) {
      return stringToSlug(str)
    },
    formatDate(date) {
      return this.$dateFns.format(new Date(date), 'do MMM')
    },
  },
}
</script>

<style lang="scss" scoped>
.cover__photo {
  max-height: 200px;
}
</style>
