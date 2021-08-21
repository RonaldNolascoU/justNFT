<template>
  <div>
    <div class="block xl:hidden">
      <client-only>
        <LayoutCookiesDisclaimer />
      </client-only>
    </div>
    <div
      :class="[
        'px-2 pt-5 pb-8 lg:p-5 xl:overflow-hidden xl:p-0 dark:bg-black layout-container',
        { 'h-screen': scroll },
      ]"
    >
      <ModalAge v-if="$store.state.modals.age" />
      <div class="xl:container">
        <LayoutNavbar />
      </div>
      <div class="infinity-divider w-screen hidden xl:block"></div>
      <div
        id="body-container"
        class="flex flex-wrap w-full xl:container pb-10 md:h-screen"
      >
        <div
          class="flex-col justify-start hidden px-2 pt-12 sidebar-container xl:flex"
        >
          <LayoutSidebar />
        </div>
        <div
          id="nuxt__container"
          :class="[
            'w-full xl:pb-20 xl:border-l xl:border-r border-lighter page-container xl:w-full xl:pt-12',
            { 'xl:overflow-y-scroll md:h-screen': !scroll },
          ]"
        >
          <Nuxt />
        </div>
        <div
          class="hidden xl:flex items-start justify-center pt-12 pb-20 suggestions-container"
        >
          <LayoutSuggestions />
        </div>
      </div>
      <div class="hidden xl:block">
        <client-only>
          <LayoutCookiesDisclaimer />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Web3 from 'web3'
export default {
  name: 'default',
  middleware: ['router-auth'],
  computed: {
    scroll() {
      let routes = ['subscriptions']
      return routes.includes(this.$nuxt.$route.name)
    },
  },
  methods: {
    ...mapActions('general', ['signUpWithMetamask']),
  },
  mounted() {
    if (
      ['dark', 'system'].includes(this.$colorMode.preference) &&
      !this.$store.state.darkMode
    ) {
      this.$store.commit('TOGGLE_DARK_MODE')
    }
  },
  created() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        console.log('accountsChanges', accounts)
        this.signUpWithMetamask({ wallet_address: accounts[0] })
          .then(async (res) => {
            if (res.success) {
              console.log(window.ethereum)
              if (window.ethereum === null)
                this.$store.commit('general/disconnect')
              if (!this.$auth.user.wallet_address) return
              let minABI = [
                {
                  constant: true,
                  inputs: [{ name: '_owner', type: 'address' }],
                  name: 'balanceOf',
                  outputs: [{ name: 'balance', type: 'uint256' }],
                  type: 'function',
                },
                // decimals
                {
                  constant: true,
                  inputs: [],
                  name: 'decimals',
                  outputs: [{ name: '', type: 'uint8' }],
                  type: 'function',
                },
              ]

              let justYoursTokenAddress =
                '0x37c045be4641328dfeb625f1dde610d061613497'
              // Get ERC20 Token contract instance
              let web3 = new Web3(ethereum)
              let contract = new web3.eth.Contract(
                minABI,
                justYoursTokenAddress
              )

              // Call balanceOf function
              await contract.methods
                .balanceOf(accounts[0])
                .call()
                .then(async (result) => {
                  console.log(result, 'result')
                  await contract.methods
                    .decimals()
                    .call()
                    .then((decimals) => {
                      this.$store.commit(
                        'general/setWalletBalance',
                        (Math.round((+result / 10 ** +decimals) * 10) / 10)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      )
                    })
                    .catch((err) => {
                      console.log(err, 'Error getting decimals')
                      this.$store.commit('general/disconnect')
                    })
                })
                .catch((err) => {
                  console.log(err, 'Error getting balance')
                  this.$store.commit('general/disconnect')
                })
              this.$auth.setUserToken(res.token, res.token)
              this.$auth.setUser(res.user)
            } else {
              this.$store.commit('general/disconnect')
            }
          })
          .catch((err) => {
            this.$store.commit('general/disconnect')
            console.log(err)
          })
      })
    }
  },
}
</script>

<style>
#wrap-container,
#scroll-suggestion {
  /* overflow-y: scroll; */
  height: 100vh;
  @media (max-width: 1279px) {
    height: 100% !important;
  }
}
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
