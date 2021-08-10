<template>
  <div
    class="pro__image rounded-lg flex justify-center items-center p-4 transform transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
    :style="`background: url(${media.img})`"
  ></div>
</template>

<script>
export default {
  props: {
    media: {
      type: Object,
    },
  },
}
</script>

<style scoped lang="scss">
.pro__image {
  width: 100%;
  height: 226.62px;
  @media (max-width: 768px) {
    height: 100px;
  }
  @media (min-width: 769px) and (max-width: 1080px) {
    height: 150px;
  }
  background-size: cover !important;
  background-position: center center !important;
  border-radius: 29px;
  margin: 0 auto;
}
</style>
