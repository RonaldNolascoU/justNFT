<template>
  <div class="pb-10 xl:pb-0">
    <h4 class="store__heading dark:text-white fs-24 mt-1">
      {{ $i18n.locale == 'en' ? 'The' : null }} <span class="text-navy">J</span>
      <span class="text-primary y__text">Y</span>
      {{ $t('store.title.store') }}
    </h4>
    <div class="md:grid store-template gap-4 xl:gap-1 xl:mt-10">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="store-card m-0.5 mb-4 md:mb-0 last:w-full last:last__card"
      >
        <div class="card-store rounded-xl flex flex-col justify-center">
          <div
            :class="[
              'text-center flex flex-col flex-grow pt-16 relative',
              `card-store-bg--${index + 1}`,
            ]"
          >
            <div class="price-number pt-2">{{ item.msgNumber }}</div>
            <div
              class="fs-24 text-blue absolute top-store-card-title w-11/12 text-center"
            >
              {{ $t('store.plans.messages') }}
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-navy text-center rounded-b-lg flex-none py-1"
          >
            <img src="/images/wallet-icon.png" alt="JUST Icon" />
            <span class="fs-24 ml-2 font-bold text-white"
              >{{ item.cost }} JUST</span
            >
          </div>
        </div>
        <div class="card__overlay"></div>
        <div class="overlay__text">
          <a href="#" class="bg-navy rounded-lg px-4 py-2">
            <span class="text-white fs-24 font-bold">{{
              $t('store.plans.confirm')
            }}</span>
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
  @media (max-width: 1279px) {
    margin-right: -1%;
    margin-left: -1%;
  }
}

.last\:last__card:last-child {
  @media (min-width: 768px) and (max-width: 1500px) {
    justify-self: center;
    grid-column: 1 / -1;
    width: 50%;
  }
  @media (max-width: 500px) {
    // width: 75%;
    justify-self: center;
    grid-column: 1 / -1;
  }
}
</style>
