<template>
  <div class="user__profile xl:px-4 pb-8 xl:pb-0">
    <div class="flex flex-col items-center subscription__cards">
      <ProfileCard :contentCreator="contentCreator" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  asyncData({ env, params, $axios, redirect }) {
    return $axios
      .get(`users/${params.model}`)
      .then((creator) => {
        console.log(creator, 'CREATOR')
        const { user, success } = creator.data
        if (!success) redirect('/')
        return {
          contentCreator: success ? user : {},
        }
      })
      .catch((err) => {})
  },
  data() {
    return {
      // HARD CODED FOR NOW
      model: {
        name: 'Alisha Soprano',
        subscribed_at: 'Subscribed since 12th march',
        cover: '/images/subscriptions/1.png',
        profile_pic: '/images/subscriptions/2.png',
        active: true,
      },
    }
  },
  methods: {
    ...mapActions('general', ['getContentCreatorDetails', 'isSubscribed']),
  },
}
</script>

<style></style>
