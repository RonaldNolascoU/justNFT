<template>
  <div ref="myModal" class="modal closed">
    <span class="close">&times;</span>
    <PostCreateNewPost />
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  overflow: hidden;
  left: 0;
  bottom: 35px;
  width: 100%;
  height: auto;
  background-color: black;
  color: white;
  transition: opacity 0.4s, bottom 0.4s; /* animate these properties */
  opacity: 1; /* open state is shown */
}

.modal.closed {
  // opacity: 0; /* close state is hidden and off screen */
  // bottom: -300px;
}

.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
</style>
