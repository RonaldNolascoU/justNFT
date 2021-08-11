<template>
  <div>
    <div v-if="isBlankRoute">
      <nav class="w-full max-w-full bg-primary border-lighter">
        <div
          class="container py-4 cursor-pointer pl-4 xl:pl-0"
          @click="$router.push('/')"
        >
          <img
            class="self-start my-3 xl:my-0"
            src="/just_logo_white.png"
            @click="$router.push('/')"
            style="width: 200px"
          />
        </div>
      </nav>
    </div>
    <div v-if="!$store.state.general.loading" class="hidden lg:block">
      <BadgeBuyJust></BadgeBuyJust>
    </div>
    <ModalAge v-if="$store.state.modals.age"></ModalAge>
    <Nuxt></Nuxt>
    <div
      class="container translations relative"
      v-if="!$store.state.general.loading"
    >
      <GeneralTranslateDropdown></GeneralTranslateDropdown>
    </div>
    <client-only v-if="!$store.state.general.loading">
      <LayoutCookiesDisclaimer></LayoutCookiesDisclaimer>
    </client-only>
  </div>
</template>

<script>
export default {
  computed: {
    isBlankRoute() {
      return ['privacy-policy', 'creator-signup', 'wallet'].includes(
        this.$nuxt.$route.name
      )
    },
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
