<template>
  <div class="wallet xl:container py-10 xl:py-20">
    <template>
      <img src="/just_logo.svg" class="logo" alt="Just Yours Logo" />

      <p
        class="mt-5 text-center fs-16 xl:fs-20 text-primary xl:text-black wallet_created"
      >
        {{ $t('wallet.newWallet') }}
      </p>
      <div class="rounded-full mt-3 wallet__container">
        <div
          class="header hidden xl:block p-3 bg-primary text-center rounded-t-2xl"
        >
          <p class="fs-24 text-white font-semibold">
            {{ $t('wallet.phrase') }}
          </p>
        </div>
        <div class="secret__words rounded-b-2xl p-5">
          <div>
            <div class="bg-navy rounded-full inline-flex info__icon">
              <i class="fas fa-info text-white fs-16"></i>
            </div>
            <p class="inline font-medium">
              {{ $t('wallet.backup') }}
            </p>
          </div>
          <div
            class="words grid grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-4 mt-10 px-5"
          >
            <span
              v-for="(word, index) in walletWords"
              :key="index"
              class="cursor-pointer border-b b-1 border-black pb-3 font-medium transform transition duration-300 ease-in-out hover:scale-110"
            >
              <span class="mr-2">
                {{ index + 1 }}
              </span>

              {{ word }}
            </span>
          </div>
          <div
            class="actions flex flex-col xl:flex-row items-center xl:justify-around mt-5"
          >
            <a
              class="fs-16 xl:fs-20 py-2 px-5 xl:px-20 w-full justify-center flex xl:block md:w-1/2 xl:w-auto bg-primary text-white rounded-full cursor-pointer font-semibold"
              @click="$router.push('/')"
            >
              {{ $t('wallet.recoveryKey') }}
            </a>
            <a
              @click="showKey = !showKey"
              class="fs-16 xl:fs-20 py-2 px-5 xl:px-16 w-full justify-center flex xl:block md:w-1/2 xl:w-auto border-primary border-2 text-primary rounded-full cursor-pointer font-semibold mt-4 xl:mt-0"
            >
              {{ $t('wallet.privatekey') }}
            </a>
          </div>
          <div class="mt-5" v-if="privateKey && showKey">
            <p class="fs-20">
              <b>Private Key:</b>
              {{ privateKey }}
            </p>
          </div>
        </div>
      </div>
      <p
        class="text-center text-navy cursor-pointer fs-20 font-medium hover:underline"
      >
        {{ $t('wallet.whatIsThis') }}
      </p>
    </template>
    <!-- <template v-else>
      <p
        class="mt-5 text-center fs-16 xl:fs-20 text-primary xl:text-black wallet_created"
      >
        {{ $t('wallet.alreadyCreatedWallet') }}
      </p>
      <a
        class="fs-16 xl:fs-20 py-2 px-5 xl:px-20 justify-center flex bg-primary text-white rounded-full cursor-pointer font-semibold"
        @click="$router.push('/')"
      >
        {{ $t('wallet.home') }}
      </a>
    </template> -->
    <ModalNeverShareWallet v-if="$store.state.modals.agree" />
  </div>
</template>

<script>
export default {
  name: 'NewWalletCreated',
  asyncData({ route, app, $axios, store, redirect }) {
    const { token, key } = route.query
    if (store.state.auth.loggedIn) redirect('/')
    $axios
      .get('/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((result) => {
        const { user } = result.data
        app.$auth.setUser({ ...user, token })
        app.$auth.strategy.token.set(token)
      })
      .catch((err) => {
        console.log(err, 'err')
        redirect('/')
        // store.commit('general/disconnect')
      })
    return { privateKey: key }
  },
  layout: 'blank',
  data() {
    return {
      walletWords: [
        'Mystery',
        'God',
        'Phrasal',
        'Ramekin',
        'Fragance',
        'Beautiful',
        'Life',
        'Demonic',
        'Typhoon',
        'Absurd',
        'Lane',
        'Fruit',
        'Sun',
        'Mercury',
        'Fun',
        'Limb',
        'Group',
        'Rise',
        'Tycoon',
        'Coster',
        'Astute',
        'Tart',
        'Roller',
        'Fall',
      ],
      showKey: false,
    }
  },
  mounted() {
    this.$store.commit('OPEN_AGREE_MODAL')
  },
}
</script>

<style lang="scss" scoped>
.wallet {
  .wallet_created {
    letter-spacing: 4.5px;
    font-weight: bold;
  }

  .info__icon {
    padding: 0.25em 0.6em;
  }

  .wallet__container {
    max-width: 1072px;
    @media (max-width: 1279px) {
      max-width: 100%;
    }
    margin: 1em auto;
  }

  .logo {
    height: 99px;
    transform: scale(7);
    @media (max-width: 768px) {
      transform: scale(3);
    }
    @media (min-width: 769px) and (max-width: 1280px) {
      transform: scale(5);
    }
    margin: 0 auto;
  }

  .secret__words {
    background: #ededed;
    @media (max-width: 1280px) {
      background: white;
    }
  }
}
</style>
