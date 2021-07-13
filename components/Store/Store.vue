<template>
  <div class="sm:grid store-template">
    <div v-for="(item, index) in items" :key="index" class="store-card m-0.5">
      <div class="card-store rounded-lg flex flex-col justify-center">
        <div
          :class="[
            'text-center flex flex-col flex-grow pt-16',
            `card-store-bg--${index + 1}`,
          ]"
        >
          <p class="price-number pt-2">{{ item.msgNumber }}</p>
          <p class="fs-24 fs-res-24 text-blue">INTERACTIVE MESSAGES</p>
        </div>
        <div
          class="flex items-center justify-center bg-navy text-center rounded-b-lg flex-none"
        >
          <img src="~/assets/img/wallet-icon.png" alt="" />
          <span class="fs-24 ml-2 font-bold text-white"
            >{{ item.cost }} JUST</span
          >
        </div>
      </div>
      <div class="card__overlay"></div>
      <div class="overlay__text">
        <a href="#" class="bg-navy rounded-lg px-4 py-2">
          <span class="mx-2 my-1 text-white fs-24 font-bold">Confirm</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { cost: '3,000', msgNumber: 10 },
        { cost: '5,000', msgNumber: 20 },
        { cost: '5,000', msgNumber: 30 },
      ],
    }
  },
}
</script>

<style></style>
