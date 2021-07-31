<template>
  <div>
    <div class="loader__wrapper" v-if="$store.state.general.loading">
      <GeneralLoader></GeneralLoader>
    </div>
    <AuthLogin v-if="!$store.state.general.loading"></AuthLogin>
  </div>
</template>

<script>
export default {
  middleware: ['router-auth'],
  layout: 'blank',
}
</script>

<style scoped lang="scss">
.loader__wrapper {
  background: white;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .loader {
    border-top: 0.5em solid rgba(0, 0, 0, 0.5) !important;
    border-right: 0.5em solid rgba(0, 0, 0, 0.5) !important;
    border-bottom: 0.5em solid rgba(0, 0, 0, 0.5) !important;
    border-left: 0.5em solid #000 !important;
    width: 10em !important;
    height: 10em !important;
  }
}
</style>
