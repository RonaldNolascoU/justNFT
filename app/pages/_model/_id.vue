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
  </div>
</template>

<script>
export default {
  asyncData({ env, params, $axios, redirect }) {
    return $axios
      .get(`posts/${params.id}`)
      .then((response) => {
        console.log(response.data, 'response')
        const { post, success } = response.data
        if (!success) redirect('/')
        return {
          post,
        }
      })
      .catch((err) => {})
  },
  layout: 'default',
}
</script>

<style></style>
