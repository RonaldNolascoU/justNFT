<template>
  <div class="grid grid-cols-3 gap-4">
    <template v-if="!isSubscribed">
      <ProfilePremiumMedia
        v-for="(content, index) in media"
        :key="index"
        :media="content"
      />
    </template>
    <ProfileFreeMedia v-else v-for="(content, index) in media" :key="index" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      media: [
        {
          img: '/images/suggestion1.png',
        },
        {
          img: '/images/suggestion2.png',
        },
        {
          img: '/images/suggestion3.png',
        },
        {
          img: '/images/woman.png',
        },
        {
          img: '/images/post1.png',
        },
        {
          img: '/images/suggestion1.png',
        },
        {
          img: '/images/suggestion2.png',
        },
        {
          img: '/images/suggestion3.png',
        },
        {
          img: '/images/woman.png',
        },
      ],
    }
  },
  props: {
    tab: {
      type: String,
      default: 'images',
    },
  },
  computed: {
    isSubscribed() {
      return this.$store.getters.isPremiumUser
    },
  },
}
</script>

<style></style>
