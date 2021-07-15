<template>
  <div>
    <div class="warning__wallet flex flex-col items-center">
      <img src="/images/warning.svg" alt="Warning icon" />
      <p class="text-center font-semibold">
        Warning: Never share this with anyone, including Just Yours Support.
      </p>
      <div class="actions mt-2 flex justify-evenly">
        <button
          class="bg-navy rounded-xl px-10 xl:px-16 py-1 mr-3 text-white font-semibold"
          @click="agree"
        >
          I agree
        </button>
      </div>
    </div>
    <div class="overlay"></div>
  </div>
</template>

<script>
export default {
  methods: {
    agree() {
      this.$store.commit('CLOSE_AGREE_MODAL')
    },
  },
}
</script>

<style lang="scss" scoped>
.warning__wallet {
  p {
    max-width: 50%;
  }
  width: 25%;
  @media (min-width: 1280px) {
    width: 50%;
  }
  @media (min-width: 1440px) {
    width: 40%;
  }

  @media (max-width: 1279px) {
    width: 90%;
  }
  font-size: 24px;
  padding: 1em 2em;
  font-weight: 500;
  background: #efefef;
  box-shadow: inset 0px 4px 96px rgba(13, 13, 13, 0.53);
  border-radius: 36px;
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
