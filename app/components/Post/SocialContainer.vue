<template>
  <div class="mt-3 fs-24 xl:mx-7">
    <div class="flex justify-between">
      <div
        class="flex-auto font-semibold cursor-pointer"
        @click="likeUnlikePost(post._id)"
      >
        <i :class="[isLiked ? 'fas' : 'far', 'fa-heart save']"></i>
        <span class="text-pink">
          {{ (post.likes && post.likes.length) || 0 }}
        </span>
        <span class="dark:text-white"> {{ $t('home.social.likes') }} </span>
      </div>
      <div class="flex-auto font-semibold text-center cursor-pointer">
        <i class="fas fa-comment-alt comments"></i>
        <span class="text-pink">
          {{ (post.comments && post.comments.length) || 0 }}
        </span>
        <span class="dark:text-white"> {{ $t('home.social.comments') }} </span>
      </div>
      <div
        class="flex-auto font-semibold text-right cursor-pointer dark:text-white"
        @click="savingPost(post._id)"
      >
        {{ $t('home.social.save') }}
        <i :class="[isSaved ? 'fas' : 'far', 'fa-bookmark save']"></i>
      </div>
    </div>
    <!-- Comment -->
    <div class="mt-4" v-if="false">
      <div>
        <div
          class="flex"
          v-for="comment in post.commentsArray"
          :key="comment.content"
        >
          <div class="flex-shrink-0 block mr-4">
            <img :src="comment.user.img" class="w-12 h-12 rounded-full" />
          </div>
          <div class="flex justify-between flex-auto">
            <div>
              <p class="text-justify text dark:text-white fs-24">
                {{ comment.content }}
              </p>
              <div class="flex">
                <p class="mt-1 mr-4 cursor-pointer text-muted">
                  {{ $t('home.social.like') }}
                </p>
                <p class="mt-1 cursor-pointer text-muted">
                  {{ $t('home.social.reply') }}
                </p>
              </div>
            </div>
            <div>
              <i
                class="ml-3 cursor-pointer fas fa-ellipsis-v dark:text-white"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <span
        class="font-semibold cursor-pointer dark:text-white"
        v-if="post.commentsArray.length"
      >
        {{ $tc('home.social.viewMoreComments', post.commentsArray.length) }}
      </span>
      <div class="mt-3 add__comment">
        <div class="flex items-center">
          <div class="flex-shrink-0 mr-4">
            <img src="/images/post.png" class="w-12 h-12 rounded-full" />
          </div>
          <div class="flex-auto comment">
            <div class="relative mt-1">
              <input
                type="text"
                class="block w-full p-2 xl:pt-4 pl-4 pr-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                :placeholder="$t('home.social.addComment')"
                v-model="comment"
                @keyup.enter="addComment(post)"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <div class="hidden sm:block">
                  <i class="mr-2 cursor-pointer far fa-grin-alt text-muted"></i>
                  <i
                    class="mr-2 cursor-pointer far fa-closed-captioning text-muted"
                  ></i>
                  <i
                    class="mr-2 cursor-pointer fas fa-paperclip text-muted"
                  ></i>
                  <i class="mr-2 cursor-pointer fas fa-camera text-muted"></i>
                </div>
                <div class="block sm:hidden">
                  <i
                    class="mr-2 cursor-pointer fas fa-ellipsis-v text-muted"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Comment -->
    <div
      class="my-8 xl:my-16 divider dark:border-gray-700"
      v-if="post.id !== $store.state.posts.length"
    ></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    post: {
      type: Object,
    },
  },
  data() {
    return {
      comment: null,
      isSaved: false,
      isLiked: false,
    }
  },
  mounted() {
    this.isSaved = this.post
      ? this.post.saves.some((x) => x.user_id == this.$auth.user._id)
      : false
    this.isLiked = this.post
      ? this.post.likes.some((x) => x.user_id == this.$auth.user._id)
      : false
  },
  methods: {
    ...mapActions('posts', ['savePost', 'likePost']),
    addComment(post) {
      post.commentsArray.push({
        content: this.comment,
        user: { img: '/images/post.png' },
      })
      this.comment = null
    },
    savingPost(id) {
      this.savePost({ id }).then((res) => {
        if (res.success) {
          this.isSaved = !this.isSaved
          this.$emit('reloadSaved', this.isSaved)
        }
      })
    },
    likeUnlikePost(id) {
      this.likePost({ id }).then((res) => {
        if (res.success) {
          this.isLiked = !this.isLiked
          this.isLiked
            ? this.post.likes.push({ id: id })
            : this.post.likes.pop()
          // this.$emit('reloadSaved', this.isLiked)
        }
      })
    },
  },
}
</script>

<style lang="scss">
.divider {
  border: 3px solid #ebebeb;
  border-radius: 20px;
}
.text-muted {
  color: #7c7c7c;
}
.text-pink {
  color: #d64973;
}
.heart {
  color: #d64973;
}
.comments {
  color: #8bb1dd;
}

.save {
  color: #d0b4b4;
}

.add__comment input {
  background: #f0f2f5;
  border-radius: 53px;
  width: 100%;
  height: 58px;

  @media (max-width: 1279px) {
    height: 100%;
  }

  &:placeholder {
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
input::placeholder {
  margin-left: 1em;
}
</style>
