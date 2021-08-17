<template>
  <div class="xl:pb-14">
    <div class="w-full block xl:hidden navbar mb-5">
      <LayoutSearchBar />
    </div>
    <PostIndex v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Content',
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    ...mapActions('posts', ['getPosts']),
  },
  mounted() {
    this.getPosts()
      .then((result) => {
        console.log(result, 'result')
        const { success, posts } = result
        if (success) {
          this.posts = posts.data
        }
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  },
}
</script>
