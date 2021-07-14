<template>
  <div class="mb-5 lg:mx-6">
    <div class="flex">
      <div class="flex flex-shrink-0 mr-4">
        <img src="/images/post.png" class="rounded-full" />
      </div>
      <div class="flex justify-between flex-auto">
        <div>
          <nuxt-link to="/mia" class="hover:underline dark:hover:text-white">
            <b class="text-lg font-bold dark:text-white fs-24">{{
              post.user
            }}</b>
          </nuxt-link>
          <p class="mt-1 text-muted fs-24">44m</p>
        </div>
        <div class="self-center fs-24">
          <i class="cursor-pointer fas fa-ellipsis-v dark:text-white"></i>
        </div>
      </div>
    </div>
    <!-- Text -->
    <p class="mt-3 text-justify text dark:text-white fs-24">
      {{ post.content }}
    </p>
    <!-- Text -->
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
    },
  },
}
</script>

<style></style>
