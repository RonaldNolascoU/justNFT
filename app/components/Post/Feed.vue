<template>
  <div class="xl:pb-14">
    <div class="w-full block xl:hidden navbar mb-5">
      <LayoutSearchBar />
    </div>
    <PostIndex
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @reloadSaved="reloadSaved"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Content',
  props: {
    mode: {
      type: String,
      default: 'post',
    },
  },
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    ...mapActions('posts', ['getPosts', 'getSavedPosts']),
    allPosts() {
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
    savedPost() {
      this.getSavedPosts()
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
    reloadSaved() {
      if (this.mode == 'saved') {
        this.savedPost()
      }
    },
  },
  mounted() {
    this.mode == 'saved' ? this.savedPost() : this.allPosts()
  },
}
</script>
