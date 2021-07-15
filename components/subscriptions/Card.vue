<template>
  <div class="relative my-8">
    <div class="relative">
      <vs-card actionable class="w-full">
        <div slot="media">
          <img
            :src="subscription.cover"
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
      <!-- <div></div> -->
      <div class="personal__data">
        <h3 class="font-semibold text-pink fs-24">{{ subscription.name }}</h3>
        <span class="font-semibold text-blue fs-16">{{
          subscription.active
            ? subscription.subscribed_at
            : subscription.expired_at
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
              <span class="font-semibold fs-14 text-gray"> Manage </span>
            </li>
            <li class="flex items-center my-3 cursor-pointer">
              <span class="mr-3 material-icons-round text-gray text-primary"
                >clear</span
              >
              <span class="font-semibold fs-14 text-gray"> Remove </span>
            </li>
            <li class="flex items-center my-3 cursor-pointer">
              <span class="mr-3 material-icons-round text-gray text-primary"
                >autorenew</span
              >
              <span class="font-semibold fs-14 text-gray"> Renew </span>
            </li>
            <li class="flex items-center my-3 cursor-pointer">
              <span class="mr-3 material-icons-round text-gray text-primary"
                >do_not_disturb_on_total_silence</span
              >
              <span class="font-semibold fs-14 text-gray"> Mute User </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subscription: {
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

<style></style>
