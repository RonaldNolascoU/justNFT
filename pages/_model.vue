<template>
  <div class="user__profile px-4">
    <div class="flex flex-col items-center subscription__cards">
      <ProfileCard :model="model" />
    </div>
  </div>
</template>

<script>
export default {
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
}
</script>

<style></style>
