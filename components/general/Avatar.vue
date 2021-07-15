<template>
  <div
    class="relative pb-1 mb-4 profile__pic"
    :class="isAbsolute && 'absolute__profile_pic'"
  >
    <div
      class="w-full border-4 rounded-full border-color-primary profile__wrapper"
    >
      <nuxt-img
        class="w-full rounded-full profile-img"
        :class="isGrayScale ? 'filter grayscale' : null"
        :src="image"
        alt="profile"
      />
    </div>
    <div v-if="showAvailableStatus" class="status-circle"></div>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    isAbsolute: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: '/images/profile.png',
    },
    showAvailableStatus: {
      type: Boolean,
      default: true,
    },
    isGrayScale: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.profile__pic {
  width: 8rem;
  @media (max-width: 576px) {
    width: 4rem;
  }
  @media (min-width: 577px) and (max-width: 767px) {
    width: 5rem;
  }
}

.absolute__profile_pic {
  position: absolute;
  bottom: -50%;

  @media (min-width: 880px) and (max-width: 1280px) {
    bottom: -35%;
  }

  @media (min-width: 1281px) and (max-width: 1500px) {
    bottom: -40%;
    width: 6rem;
  }

  @media (min-width: 1501px) {
    bottom: -45%;
  }

  @media (max-width: 767px) {
    bottom: -50%;
  }
}
</style>
