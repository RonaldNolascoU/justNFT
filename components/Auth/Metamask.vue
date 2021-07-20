<template>
  <div>
    <button class="w-full" @click="connectToMetamask()">
      <div class="flex">
        <div
          class="rounded-l-3xl border border-2 border-color-primary flex justify-center items-center bg-white icon width metamask__icon"
        >
          <img src="/images/metamask.svg" class="mx-5" />
        </div>
        <div
          class="w-11/12 bg-primary text-white w-full rounded-r-3xl input-height fs-24 flex justify-start pl-6 items-center"
        >
          <div>
            {{ $t('login.metamask') }}
          </div>
        </div>
      </div>
    </button>
  </div>
</template>

<script>
import Web3 from 'web3'
export default {
  props: {
    userMessage: {
      type: String,
      default: 'null',
    },
  },
  data() {
    return {
      web3: null,
      MetaMaskId: '1', // main net netID
      netID: '1', // user metamask id
      MetaMaskAddress: '', // user Address
      metaMaskBalance: 0,
      Web3Interval: null,
      AccountInterval: null,
      NetworkInterval: null,
      stateLog: null,
      isComplete: false,
      type: 'INIT',
      MetamaskMsg: {
        LOAD_MATAMASK_WALLET_ERROR: 'Loading metamask error, please try later',
        EMPTY_METAMASK_ACCOUNT:
          'Please log in to your metamask to continue with this app.',
        NETWORK_ERROR: 'The connection is abnormal, please try again',
        METAMASK_NOT_INSTALL: 'Please install metamask for this application',
        METAMASK_TEST_NET: 'Currently not in the main network.',
        METAMASK_MAIN_NET: 'Currently Main network',
        USER_DENIED_ACCOUNT_AUTHORIZATION: 'User denied account authorization',
      },
      installing: false,
    }
  },
  methods: {
    checkWeb3() {
      let web3 = window.web3
      if (typeof web3 === 'undefined') {
        this.web3 = null
        this.Log(this.MetamaskMsg.METAMASK_NOT_INSTALL, 'NO_INSTALL_METAMASK')
      }
    },
    checkAccounts() {
      if (this.web3 === null) return
      this.web3.eth.getAccounts((err, accounts) => {
        if (err != null)
          return this.Log(this.MetamaskMsg.NETWORK_ERROR, 'NETWORK_ERROR')
        if (accounts.length === 0) {
          this.MetaMaskAddress = ''
          this.Log(this.MetamaskMsg.EMPTY_METAMASK_ACCOUNT, 'NO_LOGIN')
          return
        }
        this.MetaMaskAddress = accounts[0] // user Address
        this.getBalance()
      })
    },
    getBalance() {
      this.web3.eth
        .getBalance(this.MetaMaskAddress)
        .then((result) => {
          this.metaMaskBalance = result
        })
        .catch((err) => {
          console.log(err, 'err')
          this.metaMaskBalance = 0
        })
    },
    checkNetWork() {
      console.log('running...')
      this.web3.eth.net.getId((err, netID) => {
        // Main Network: 1
        // Ropsten Test Network: 3
        // Kovan Test Network: 42
        // Rinkeby Test Network: 4
        // Fantom Opera Network: 250
        if (err !== null)
          return this.Log(this.MetamaskMsg.NETWORK_ERROR, 'NETWORK_ERROR')

        this.netID = netID //User MetaMask's current status
        if (this.MetaMaskAddress !== '') {
          if (netID === '1')
            return this.Log(this.MetamaskMsg.METAMASK_TEST_NET, 'MAINNET')
          if (netID === '3')
            return this.Log(this.MetamaskMsg.METAMASK_TEST_NET, 'ROPSTEN')
          if (netID === '42')
            return this.Log(this.MetamaskMsg.METAMASK_TEST_NET, 'LOVAN')
          if (netID === '4')
            return this.Log(this.MetamaskMsg.METAMASK_TEST_NET, 'RINKEBY')
          if (netID === '250') {
            return this.Log(this.MetamaskMsg.METAMASK_TEST_NET, 'FTM')
          }
          return this.Log(this.MetamaskMsg.METAMASK_MAIN_NET, 'MAINNET')
        }
      })
    },
    Log(msg, type = '') {
      console.log(type, 'type')
      const letType = type
      if (letType === this.type) return
      const message = this.userMessage === 'null' ? msg : this.userMessage
      this.type = type
      this.$emit('onComplete', {
        web3: this.web3,
        type,
        metaMaskAddress: this.MetaMaskAddress,
        message,
        netID: this.netID,
        balance: this.metaMaskBalance,
      })
    },
    web3TimerCheck(web3) {
      this.web3 = web3
      console.log(this.web3)
      this.checkAccounts()
      this.checkNetWork()
      this.Web3Interval = this.checkWeb3()
      this.AccountInterval = this.checkAccounts()
      this.NetworkInterval = this.checkNetWork()
    },
    async connectToMetamask() {
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
          this.web3TimerCheck(window.web3)
        } catch (error) {
          this.Log(
            this.MetamaskMsg.USER_DENIED_ACCOUNT_AUTHORIZATION,
            'USER_DENIED_ACCOUNT_AUTHORIZATION'
          )
        }
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider)
        this.web3TimerCheck(window.web3)
      } else {
        this.web3 = null
        this.Log(this.MetamaskMsg.METAMASK_NOT_INSTALL, 'NO_INSTALL_METAMASK')
        console.error(
          'Non-Ethereum browser detected. You should consider trying MetaMask!'
        )
      }
    },
    isMetamaskInstalled() {
      const { ethereum } = window
      return Boolean(ethereum && ethereum.isMetaMask)
    },
  },
  async mounted() {
    // this.connectToMetamask()
  },
}
</script>
