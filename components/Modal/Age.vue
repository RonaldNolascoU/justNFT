<template>
  <client-only>
    <div>
      <div class="age__modal">
        <p class="text-center">Are you 18 or older?</p>
        <div class="actions mt-2 flex justify-evenly">
          <button
            class="bg-primary rounded-xl px-10 xl:px-16 py-1 mr-3 text-white"
            @click="goToHomepage"
          >
            Yes
          </button>
          <button
            class="bg-navy rounded-xl px-10 xl:px-16 py-1 text-white"
            @click="returnBack"
          >
            No
          </button>
        </div>
      </div>
      <div class="overlay"></div>
    </div>
  </client-only>
</template>

<script>
export default {
  methods: {
    goToHomepage() {
      this.$cookies.set('justyours_modal_age', true)
      this.$store.commit('CLOSE_AGE_MODAL', true)
      this.$router.push('/')
    },
    returnBack() {
      window.location.href = 'https://google.com'
    },
  },
}
</script>

<style lang="scss" scoped>
.age__modal {
  font-size: 24px;
  padding: 1em 2em;
  font-weight: 500;
  background: #efefef;
  box-shadow: inset 0px 4px 96px rgba(13, 13, 13, 0.53);
  border-radius: 46px;
  @media (max-width: 1279px) {
    font-size: 16px;
  }
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 99999;
  transform: translate(-50%, -50%);
}

.overlay {
  background: rgba(0, 0, 0, 0.87);
  inset: 0px;
  opacity: 1;
  pointer-events: initial;
  position: fixed;
  transition: opacity 220ms ease 0s;
  z-index: 500;
}
</style>
