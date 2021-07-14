<template>
  <div class="pricing__card flex justify-between">
    <div class="card">
      <div
        class="heading dark:text-white py-2 px-4 lg:px-0 lg:py-4 xl:py-2 xl:px-4 3xl:px-10"
      >
        Explorer - 2 $JUST
      </div>
      <div class="body dark:text-white p-4">
        <ul>
          <li>4 - Requests</li>
          <li>4 - Requests</li>
          <li>4 - Requests</li>
          <li>4 - Requests</li>
        </ul>
      </div>
    </div>
    <div class="card">
      <div
        class="heading dark:text-white py-2 px-4 lg:px-0 lg:py-4 xl:py-2 xl:px-4 3xl:px-10"
      >
        Explorer - 2 $JUST
      </div>
      <div class="body dark:text-white p-4">
        <ul>
          <li>4 - Requests</li>
          <li>4 - Requests</li>
          <li>4 - Requests</li>
          <li>4 - Requests</li>
        </ul>
      </div>
    </div>
    <div class="card">
      <div
        class="heading dark:text-white py-2 px-4 lg:px-0 lg:py-4 xl:py-2 xl:px-4 3xl:px-10"
      >
        Explorer - 2 $JUST
      </div>
      <div class="body dark:text-white p-4">
        <ul>
          <li>4 - Requests</li>
          <li>4 - Requests</li>
          <li>4 - Requests</li>
          <li>4 - Requests</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.pricing__card {
  .card {
  }
  .heading {
    background: #c53761;
    border-top-left-radius: 36px;
    border-top-right-radius: 36px;
    border: 2px solid rgba(197, 55, 97, 0.25);
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 7px rgba(63, 85, 168, 0.48));
  }
  .body {
    border-bottom-left-radius: 36px;
    border-bottom-right-radius: 36px;
    border: 2px solid rgba(197, 55, 97, 0.25);
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 7px rgba(63, 85, 168, 0.48));
    li {
      font-size: 16px;
      line-height: 20px;
      font-weight: 500;
      margin-bottom: 1em;
    }
  }
}
</style>
