<template>
  <div class="px-3 suggestions xl:w-3/4 3xl:w-4/3">
    <p
      class="fs-24 btn-letter-spacing text-center dark:text-white bg-white dark:bg-black font-semibold"
    >
      SUGGESTED
    </p>
    <div id="scroll-suggestion" class="xl:h-screen xl:overflow-y-scroll">
      <div
        v-for="(suggestion, index) in suggestions"
        :key="index"
        class="mt-7 mb-16 pb-0.5"
      >
        <vs-card actionable class="cardx">
          <div slot="media" class="relative">
            <nuxt-img :src="`/images/${suggestion.img}`" />
            <div class="absolute flex justify-center w-full center top-80">
              <vs-button block class="w-full truncate pills" color="#c53761">
                <nuxt-link
                  class="block text-white truncate fs-20"
                  :to="nametoSlug(suggestion.name)"
                >
                  {{ suggestion.name }} - {{ suggestion.price }} $JUST
                </nuxt-link>
              </vs-button>
            </div>
          </div>
        </vs-card>
        <div
          v-if="suggestions.length == index + 1"
          class="flex justify-center my-16 pb-24"
        >
          <vs-button class="pills" color="#c53761" block>
            <span class="fs-20 btn-letter-spacing">VIEW ALL </span>
          </vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import stringToSlug from '@/scripts/slug.js'
export default {
  name: 'Suggestions',
  data() {
    return {
      suggestions: [
        {
          name: 'Lana Fernandes',
          price: 12,
          img: 'suggestion3.png',
        },
        {
          name: 'Sarina Izvyk',
          price: 7,
          img: 'suggestion2.png',
        },
        {
          name: 'Mariska XX',
          price: 5,
          img: 'suggestion1.png',
        },
      ],
    }
  },
  methods: {
    nametoSlug(str) {
      return stringToSlug(str)
    },
  },
}
</script>

<style scoped>
.top-80 {
  top: 75%;
  @media (min-width: 1280px) {
    top: 60%;
  }
  @media (min-width: 1536px) {
    top: 75%;
  }
}
.vs-button {
  width: 85% !important;
}
</style>
