<template>
  <div class="relative w-full">
    <vs-input
      block
      type="text"
      icon-after
      :placeholder="$t('navbar.search')"
      icon="search"
      @click.prevent.stop="categoriesBox = true"
    >
    </vs-input>
    <div
      v-click-outside="hide"
      v-if="categoriesBox"
      class="absolute w-full p-3 bg-white dark:bg-black z-50 rounded-b-xl search__bar__results"
    >
      <div class="grid category-template">
        <div
          v-for="(category, index) in $store.state.categories"
          :key="index"
          :class="[
            'text-white font-bold text-center rounded-full  py-2  md:py-2 border-2 fs-res-12 cursor-pointer',
            { 'border-color-primary': isSelected(category.color) },
          ]"
          :style="`background-color: ${category.color};`"
          @click="selected(category.color)"
        >
          {{ category.name }}
        </div>
      </div>

      <div class="mt-4">
        <div
          v-for="(result, index) in $store.state.searchResult"
          :key="index"
          class="flex items-center mt-2"
        >
          <img class="rounded-full" :src="`/images/msg/${result.image}.png`" />
          <div class="fs-18 ml-3 dark:text-gray">{{ result.name }}</div>
        </div>
      </div>

      <div
        class="mt-4 flex items-center overflow-y-auto cursor-pointer"
        @click="showAll"
      >
        <span class="material-icons-outlined text-secondary dark:text-gray">
          search
        </span>
        <span class="text-secondary font-bold ml-2 dark:text-gray"
          >Show all result for <span class="text-primary">Ana</span></span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoriesBox: false,
      categorySelected: [],
    }
  },
  methods: {
    selected(slug) {
      if (this.categorySelected.includes(slug)) {
        const index = this.categorySelected.indexOf(slug)
        if (index > -1) {
          this.categorySelected.splice(index, 1)
        }
      } else {
        this.categorySelected.push(slug)
      }
    },
    isSelected(slug) {
      return this.categorySelected.includes(slug)
    },
    showAll() {
      console.log('showAll')
    },
    hide() {
      this.categoriesBox = false
    },
  },
}
</script>

<style>
.search__bar__results {
  box-shadow: 0px 0px 20px rgba(188, 188, 188, 0.3);
}
</style>
