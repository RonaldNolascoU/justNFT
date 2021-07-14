<template>
  <div class="px-3 suggestions lg:w-3/4 3xl:w-4/3">
    <p
      class="fs-24 btn-letter-spacing text-center dark:text-white bg-white dark:bg-black"
    >
      SUGGESTED
    </p>
    <div id="scroll-suggestion" class="lg:h-screen lg:overflow-y-scroll">
      <div
        v-for="(suggestion, index) in suggestions"
        :key="index"
        class="mt-7 mb-16 pb-0.5"
      >
        <vs-card actionable class="cardx">
          <div slot="media" class="relative">
            <img :src="`/images/${suggestion.img}`" />
            <div class="absolute flex justify-center w-full center top-80">
              <vs-button block class="w-full truncate pills" color="#c53761">
                <span class="block text-white truncate fs-20">
                  {{ suggestion.title }}
                </span>
              </vs-button>
            </div>
          </div>
        </vs-card>
        <div
          v-if="suggestions.length == index + 1"
          class="flex justify-center my-16 pb-24"
        >
          <vs-button class="pills" color="#c53761" block>
            <span class="fs-24 btn-letter-spacing">VIEW ALL </span>
          </vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Suggestions',
  data() {
    return {
      suggestions: [
        {
          title: 'Lana Fernandes - 12 $JUST',
          price: 12,
          img: 'suggestion3.png',
        },
        {
          title: 'Sarina Izvyk - 7 $JUST',
          price: 7,
          img: 'suggestion2.png',
        },
        {
          title: 'Mariska XX - 5 $JUST',
          price: 5,
          img: 'suggestion1.png',
        },
      ],
    }
  },
}
</script>

<style scoped>
.top-80 {
  top: 75%;
  @media (min-width: 1024px) {
    top: 60%;
  }
  @media (min-width: 1450px) {
    top: 75%;
  }
}
.vs-button {
  width: 85% !important;
}
</style>
