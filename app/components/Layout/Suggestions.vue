<template>
  <div class="px-3 suggestions xl:w-3/4 3xl:w-4/3">
    <p
      class="fs-24 btn-letter-spacing text-center dark:text-white bg-white dark:bg-black font-semibold"
    >
      {{ $t('suggestions.title') }}
      <!-- SUGGESTED -->
    </p>
    <div id="scroll-suggestion" class="xl:h-screen xl:overflow-y-scroll">
      <div
        v-for="(suggestion, index) in suggestionsArray"
        :key="index"
        class="mt-7 mb-5 xl:mb-16 pb-0.5"
      >
        <vs-card actionable class="cardx">
          <div slot="media" class="relative">
            <img
              class="suggested-img-card"
              :src="`${
                suggestion.profile_img
                  ? $store.state.general.S3Bucket + '/' + suggestion.profile_img
                  : '/images/default_header.png'
              }`"
            />
            <div class="absolute flex justify-center w-full center top-80">
              <vs-button block class="w-full truncate pills" color="#c53761">
                <nuxt-link
                  class="block text-white truncate fs-20"
                  :to="nameToSlug(suggestion.username)"
                >
                  {{ suggestion.name }} -
                  {{
                    suggestion.rate > 0 ? suggestion.rate + ' $JUST' : 'Free'
                  }}
                </nuxt-link>
              </vs-button>
            </div>
          </div>
        </vs-card>
        <div
          v-if="suggestionsArray.length == index + 1"
          class="flex justify-center xl:my-16 xl:pb-24"
          @click="viewAll = !viewAll"
        >
          <vs-button class="pills" color="#c53761" block>
            <span class="fs-20 btn-letter-spacing"
              >{{ $t('suggestions.viewAll') }}
            </span>
          </vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import stringToSlug from '@/scripts/slug.js'
export default {
  name: 'Suggestions',
  data() {
    return {
      viewAll: false,
      suggestions: [],
      suggestionsTemp: [],
    }
  },
  mounted() {
    this.gettingSuggestions()
  },
  computed: {
    suggestionsArray() {
      return this.viewAll ? this.suggestions : this.suggestionsTemp
    },
  },
  methods: {
    ...mapActions('suggestions', ['getSuggestions']),
    nameToSlug(str) {
      return stringToSlug(str)
    },
    gettingSuggestions() {
      this.getSuggestions().then((res) => {
        if (res.success) {
          this.suggestions = res.suggestions
          this.suggestionsTemp = res.suggestions.slice(0, 3).map((i) => i)
        }
      })
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
.text-white {
  color: white !important;
}
</style>
