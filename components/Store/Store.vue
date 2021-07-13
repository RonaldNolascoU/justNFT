<template>
  <div class="pb-10 lg:pb-0">
    <h4 class="store__heading dark:text-white fs-24">
      The <span class="text-navy">J</span>
      <span class="text-primary y__text">Y</span>
      Store
    </h4>
    <div class="grid store-template gap-4 lg:gap-2">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="store-card m-0.5 last:w-full last:last__card"
      >
        <div class="card-store rounded-xl flex flex-col justify-center">
          <div
            :class="[
              'text-center flex flex-col flex-grow pt-16',
              `card-store-bg--${index + 1}`,
            ]"
          >
            <p class="price-number pt-2">{{ item.msgNumber }}</p>
            <p class="fs-24 text-blue">INTERACTIVE MESSAGES</p>
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

<style lang="scss">
.store__heading {
  letter-spacing: 8.68333px;
  text-align: center;
  font-weight: 600;
  line-height: 29px;
  margin-bottom: 1em;
}

.y__text {
  // margin-right: -1%;
  // margin-left: -3%;
  @media (max-width: 1023px) {
    margin-right: -1%;
    margin-left: -1%;
  }
}

.last\:last__card:last-child {
  @media (min-width: 501px) and (max-width: 1500px) {
    justify-self: center;
    grid-column: 1 / -1;
    width: 50%;
  }
  @media (max-width: 500px) {
    width: 75%;
    justify-self: center;
    grid-column: 1 / -1;
  }
}
</style>
