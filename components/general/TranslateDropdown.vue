<template>
  <transition name="box">
    <div class="xl:absolute translations__dropdown">
      <div class="relative text-center" v-click-outside="hide">
        <div
          class="language cursor-pointer dark:text-white"
          @click="openDropdown()"
        >
          <nuxt-img
            class="mr-2 order-2 xl:order-1"
            :src="`/locales/${selectedLanguage.code}_flag.png`"
          />
          <i
            class="fas fa-globe language__icon text-primary mr-2 order-1 xl:order-2"
          ></i>
          <span class="code code-name mr-2 fs-20">
            {{ selectedLanguage.name }}
          </span>
        </div>
        <div
          v-if="isLanguagesDropdownOpen"
          class="dropdown absolute bg-white dark:bg-black"
        >
          <div
            class="language cursor-pointer dark:text-white"
            v-for="(language, index) in filteredLocales"
            :key="index"
            @click="selectLanguage(language)"
          >
            <nuxt-img
              class="mr-2"
              :src="`/locales/${language.code}_flag.png`"
            />
            <span class="code fs-20">
              {{ language.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isLanguagesDropdownOpen: false,
      selectedLanguage: { code: 'en', name: 'English' },
    }
  },
  computed: {
    filteredLocales() {
      return this.$i18n.locales.filter((locale) => {
        return locale.code != this.selectedLanguage.code
      })
    },
  },
  mounted() {
    this.selectedLanguage = {
      code: this.$i18n.locale,
      name: this.$i18n.locales.find((x) => {
        return x.code == this.$i18n.locale
      }).name,
    }
  },
  methods: {
    openDropdown() {
      this.isLanguagesDropdownOpen = !this.isLanguagesDropdownOpen
    },
    selectLanguage(language) {
      this.selectedLanguage = language
      this.$i18n.setLocaleCookie(language.code)
      this.$i18n.setLocale(language.code)
      this.$store.commit('UPDATE_LANG', language.code || 'en')
    },
    hide() {
      this.isLanguagesDropdownOpen = false
    },
  },
}
</script>

<style scoped lang="scss">
.translations__dropdown {
  .language__icon {
    display: none;
  }
  top: 30%;
  @media (min-width: 1280px) and (max-width: 1439px) {
    .code-name {
      display: none;
    }
  }
}
img {
  width: 30px;
  height: 30px;
}

.language {
  margin-bottom: 0.5em;
  display: flex;
  align-items: center;
  width: 105px;
  max-width: 105px;
}

.dropdown {
  box-shadow: 0px 0px 20px rgba(188, 188, 188, 0.3);
  left: -10px;
  padding: 1em 2em 1em 0.5em;
  border-radius: 16px;
  z-index: 201;
  img {
    width: 30px;
    height: 30px;
  }
  @media (max-width: 1279px) {
    img {
      width: 25px !important;
      height: 20px !important;
    }
    bottom: 100%;
  }
  @media (min-width: 1280px) and (max-width: 1439px) {
    left: auto;
    right: 30px;
  }
}
</style>
