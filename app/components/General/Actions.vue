<template>
  <div
    v-click-outside="hide"
    class="absolute flex items-center px-4 w-full justify-center py-1 mt-3 rounded-xl shadow-white dark:bg-black bg-white z-50 cursor-pointer select-none user__actions__dropdown"
    :class="{ 'ease-in-out': open }"
  >
    <div
      class="absolute ease-in-out transform shadow-md rounded-xl px-7 dark:bg-black dark:custom-box-shadow subscriptions menu__options"
    >
      <ul>
        <li
          class="flex items-center my-3 cursor-pointer hover:underline"
          @click="copy"
        >
          <span class="font-semibold fs-16 text-gray hover:underline">
            Copy link to post
          </span>
        </li>
        <li
          class="flex items-center my-3 cursor-pointer hover:underline"
          @click="dislikePost"
        >
          <span class="font-semibold fs-16 text-gray hover:underline">
            I don't like this post
          </span>
        </li>
        <li
          class="flex items-center my-3 cursor-pointer hover:underline"
          @click="hidePost"
        >
          <span class="font-semibold fs-16 text-gray hover:underline">
            Hide from user's feed
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['open'],
  data() {
    return {
      copied: false,
    }
  },
  methods: {
    hide() {
      this.$emit('hide')
    },
    copy() {
      this.$emit('copy')
    },
    dislikePost() {},
    hidePost() {},
  },
}
</script>

<style scoped lang="scss">
.user__actions__dropdown {
  transform: translate(-90%, 60px);
  width: 240px;

  .menu__options {
    width: 240px;
  }

  button {
    padding-bottom: 0.5em;
    margin-bottom: 1em;
    border-bottom: 1px solid white;
    &:last-child {
      border-bottom: 0 !important;
    }
  }
  @media (max-width: 1280px) {
    left: 86px;
  }
}
</style>
