<template>
  <transition name="box">
    <div class="absolute translations__dropdown">
      <div class="relative" v-click-outside="hide">
        <div
          class="language cursor-pointer dark:text-white"
          @click="openDropdown()"
        >
          <nuxt-img
            class="mr-2"
            :src="`/locales/${selectedLanguage.code}_flag.png`"
          />
          <span class="code">
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
            <span class="code">
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
      locales: [
        {
          slug: 'en',
          name: 'English',
        },
        {
          slug: 'es',
          name: 'Spanish',
        },
        {
          slug: 'fr',
          name: 'French',
        },
        {
          slug: 'zh',
          name: 'Chinesse',
        },
        {
          slug: 'ja',
          name: 'Japan',
        },
        {
          slug: 'ru',
          name: 'Russian',
        },
      ],
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
    console.log(this.$i18n)
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
      this.$router.push(`/${language.code}`)
      this.$store.commit('UPDATE_LANG', this.selectedLanguage.code || 'en')
    },
    hide() {
      this.isLanguagesDropdownOpen = false
    },
  },
}
</script>

<style scoped lang="scss">
.translations__dropdown {
  top: 30%;
  @media (min-width: 1280px) and (max-width: 1439px) {
    .code {
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
}

.dropdown {
  box-shadow: 0px 0px 20px rgba(188, 188, 188, 0.3);
  left: -10px;
  padding: 1em 2em 1em 0.5em;
  border-radius: 16px;
  img {
    width: 30px;
    height: 30px;
  }

  @media (min-width: 1280px) and (max-width: 1439px) {
    padding-right: 0.2em;
    img {
      width: 100%;
    }
  }
}
</style>
