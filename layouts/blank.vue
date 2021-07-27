<template>
  <div>
    <div class="hidden lg:block">
      <BadgeBuyJust />
    </div>
    <ModalAge v-if="$store.state.modals.age" />
    <Nuxt />
    <div class="container translations relative">
      <GeneralTranslateDropdown />
    </div>
    <client-only>
      <LayoutCookiesDisclaimer />
    </client-only>
  </div>
</template>

<script>
export default {}
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
