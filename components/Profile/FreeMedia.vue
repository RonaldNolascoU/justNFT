<template>
  <div
    class="rounded-lg blurred__image flex justify-center items-center p-4 transform transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
  >
    <img src="/just_logo.png" class="blurred" />
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.dark {
  .blurred__image {
    box-shadow: 0px 8px 32px 0 rgba(188, 188, 188, 0.37);
  }
}
.blurred__image {
  height: 226.62px;
  @media (max-width: 768px) {
    height: 100px;
  }
  @media (min-width: 769px) and (max-width: 1080px) {
    height: 150px;
  }

  border-radius: 29px;
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: transparent;
  text-shadow: 0 0 5px rgb(0 0 0 / 50%);

  .blurred {
    filter: blur(8px);
    -webkit-filter: blur(8px);
  }
}
</style>
