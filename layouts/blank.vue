<template>
  <div>
    <ModalAge v-if="$store.state.modals.age" />
    <Nuxt />
    <div class="translations relative">
      <GeneralTranslateDropdown />
    </div>
  </div>
</template>

<script>
import getCookie from '@/scripts/cookies.js'
export default {
  mounted() {
    let modalAge = getCookie('justyours_modal_age')
    if (modalAge) {
      this.$store.commit('CLOSE_AGE_MODAL')
    }
  },
}
</script>

<style lang="scss">
.translations {
  .translations__dropdown {
    top: initial !important;
    @media (max-width: 1280px) {
      display: flex;
      justify-content: center;
      margin-top: 1em;
    }
    right: 20%;
    bottom: 0;
    .code {
      color: #c53761;
    }
    .language {
      display: flex;
      justify-content: center;
    }
    .language__icon {
      display: block !important;
    }
    img {
      width: 70px !important;
      display: none;
    }
    .dropdown {
      top: -15em !important;
      padding: 1em;
      @media (max-width: 1280px) {
        bottom: initial !important;
      }
    }
  }
}
</style>
