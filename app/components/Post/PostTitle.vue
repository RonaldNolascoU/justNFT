<template>
  <div class="mb-5 xl:mx-6">
    <div class="flex relative">
      <div class="flex flex-shrink-0 mr-4 absolute">
        <img src="/images/post.png" class="rounded-full" />
      </div>
      <div class="flex justify-between flex-auto" style="margin-left: 5em">
        <div>
          <nuxt-link
            :to="nametoSlug(post.creator.username)"
            class="hover:underline dark:hover:text-white"
          >
            <b class="text-lg font-bold dark:text-white fs-24">{{
              post.creator.name
            }}</b>
          </nuxt-link>
          <nuxt-link
            class="mt-1 text-muted fs-24 block hover:underline"
            :to="`${nametoSlug(post.creator.username)}/${post._id}`"
          >
            {{
              $dateFns.formatDistance(new Date(post.created_at), new Date(), {
                addSuffix: true,
              })
            }}
          </nuxt-link>
        </div>
        <div class="self-center fs-24 relative">
          <i
            class="cursor-pointer fas fa-ellipsis-v dark:text-white"
            @click.prevent.stop="toggleDropdown"
          ></i>
          <GeneralActions v-if="isOpen" :open="isOpen" @hide="hide" />
        </div>
      </div>
    </div>
    <!-- Text -->
    <p class="mt-3 text-justify text dark:text-white fs-24">
      {{ post.caption }}
    </p>
    <!-- Text -->
  </div>
</template>

<script>
import stringToSlug from '@/scripts/slug.js'
export default {
  props: {
    post: {
      type: Object,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {},
  methods: {
    nametoSlug(str) {
      return stringToSlug(str)
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    hide() {
      this.isOpen = false
    },
  },
}
</script>

<style scoped>
.text-muted {
  color: #7c7c7c !important;
  font-weight: normal;
}
</style>
