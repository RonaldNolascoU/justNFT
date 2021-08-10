<template>
  <div class="pricing__card grid grid-cols-3 gap-4">
    <div
      class="card last:last__body_card"
      v-for="pack in packs"
      :key="pack.name"
    >
      <div
        class="heading dark:text-white fs-16"
        :style="`background: ${pack.color}`"
      >
        <span class="font-semibold"> {{ pack.name }}- </span>
        {{ pack.price }} $JUST
      </div>
      <div class="body dark:text-white p-4">
        <ul>
          <li
            v-for="(feature, index) in pack.features"
            :key="index"
            :style="feature.isPremiumFeature && `color: ${pack.color}`"
          >
            {{ feature.amount }}- {{ feature.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      packs: [
        {
          name: ' Explorer',
          color: 'rgba(214, 73, 115, 0.57);',
          price: 2,
          features: [
            {
              amount: 4,
              name: 'High-Res Pictures',
            },
            {
              amount: 2,
              name: 'Full HD Videos',
            },
            {
              amount: 1,
              name: 'Request during livestream*',
            },
            {
              amount: 1,
              name: 'Interactive live session',
            },
          ],
        },
        {
          name: ' Maruder',
          color: '#C53761',
          price: 5,
          features: [
            {
              amount: 7,
              name: 'High-Res Pictures',
            },
            {
              amount: 2,
              name: '4K Videos',
            },
            {
              amount: 2,
              name: 'Requests during livestream*',
            },
            {
              amount: 2,
              name: 'Interactive live sessions',
            },
            {
              amount: 1,
              name: '20 minute voice call',
              isPremiumFeature: true,
            },
          ],
        },
        {
          name: ' Priviliged One',
          color: '#B4923D',
          price: 12,
          features: [
            {
              amount: 10,
              name: 'High-Res Pictures',
            },
            {
              amount: 3,
              name: '4K Videos',
            },
            {
              amount: 3,
              name: 'Requests during livestream*',
            },
            {
              amount: 3,
              name: 'Interactive live sessions',
            },
            {
              amount: 1,
              name: '20 minute voice call',
            },
            {
              amount: 1,
              name: '30 minute video call',
              isPremiumFeature: true,
            },
          ],
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.pricing__card {
  .card {
    // max-width: 254px;
  }
  .heading {
    padding-top: 14px !important;
    // padding-left: 36px !important;
    // padding-right: 36px !important;
    text-align: center;
    background: #c53761;
    border-top-left-radius: 36px;
    border-top-right-radius: 36px;
    border: 2px solid rgba(197, 55, 97, 0.25);
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 7px rgba(63, 85, 168, 0.48));
  }

  .last\:last__body_card:last-child .body {
    @media (min-width: 1280px) and (max-width: 1536px) {
      height: 85%;
    }
  }
  .body {
    // height: 347px;
    height: 90%;
    // max-height: 347px;
    border-bottom-left-radius: 36px;
    border-bottom-right-radius: 36px;
    border: 2px solid rgba(197, 55, 97, 0.25);
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 7px rgba(63, 85, 168, 0.48));
    li {
      font-size: 16px;
      line-height: 20px;
      font-weight: 500;
      margin-bottom: 1.8em;
    }
  }

  @media (min-width: 1280px) and (max-width: 1536px) {
    // .card .body:last-child {
    //   height: 85%;
    // }
  }
}
</style>
