<template>
  <div class="post px-1.5 mb-5">
    <!-- Header -->
    <PostTitle :post="post" />
    <!-- Header -->
    <!-- Image -->
    <vs-card actionable class="w-full">
      <div slot="media">
        <img :src="post.media" :alt="post.media" class="ml-1" />
      </div>
    </vs-card>

    <!-- Image -->

    <!-- Footer -->
    <PostSocialContainer :post="post" />
    <!-- Footer -->

    <div
      class="my-8 xl:my-16 divider dark:border-gray-700"
      v-if="post.id !== $store.state.posts.length"
    ></div>
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

<style>
.back__img {
  background-repeat: no-repeat;
  background-position: center center;
  height: 1037px;
}
.vs-card {
  max-width: 100% !important;
}

.vs-card__img {
  max-height: 100% !important;
}

.text {
  font-size: 16px;
  line-height: 29px;
}

.text-muted {
  color: #323232;
}
</style>
