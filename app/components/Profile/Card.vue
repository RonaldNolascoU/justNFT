<template>
  <div class="relative my-3 xl:my-5 profile__card w-full">
    <div class="relative">
      <vs-card actionable class="w-full">
        <div slot="media">
          <img
            class="cover__photo"
            :src="
              contentCreator.cover
                ? contentCreator.cover
                : '/images/default_header.png'
            "
            :alt="contentCreator.name"
          />
        </div>
      </vs-card>
      <GeneralAvatar
        :isAbsolute="true"
        :image="
          contentCreator.profile_img
            ? $store.state.general.S3Bucket + '/' + contentCreator.profile_img
            : '/images/default_header.png'
        "
        :showAvailableStatus="false"
      />
    </div>
    <div class="-mt-4">
      <div class="personal__data">
        <h3 class="font-semibold fs-24">
          <span class="dark:text-white"
            >{{ $t('profile.posts') }}
            <span class="text-primary">{{
              (contentCreator.posts && contentCreator.posts.length) || 0
            }}</span></span
          >
          <span class="dark:text-white"
            >{{ $t('profile.likes') }}
            <span class="text-primary">{{
              (contentCreator.likes && contentCreator.likes.length) || 0
            }}</span></span
          >
        </h3>
      </div>
    </div>
    <div class="content mt-10 lg:mt-20">
      <div class="flex justify-between fs-24">
        <div class="info dark:text-white">
          <b>{{ contentCreator.name || '' }}</b>
          <p>
            {{ contentCreator.bio || '' }}
          </p>
        </div>
        <i class="fas fa-ellipsis-v text-gray" />
      </div>
      <div class="mt-8" v-if="!contentCreator.me">
        <div class="subscribe__button_wrapper flex justify-center fs-24">
          <a
            class="px-4 md:px-16 py-2 text-white bg-primary rounded-2xl flex justify-center items-center cursor-pointer"
            v-if="isSubscribed || contentCreator.isSubscribed"
          >
            <b>Subscribed</b>
          </a>
          <a
            v-else
            class="px-4 md:px-16 py-2 text-white bg-primary rounded-2xl flex justify-center items-center cursor-pointer"
            @click.prevent="subscribeTo"
          >
            <span class="material-icons-outlined mr-3"> lock </span>
            <span v-if="isSubscriptionPaid"
              ><b>{{ $t('profile.subscribeFrom') }}</b>
              {{ contentCreator.rate }} $JUST</span
            >
            <span v-else>
              <b>FREE</b>
            </span>
            <GeneralLoader v-if="loading" />
          </a>
        </div>
      </div>
      <div class="mt-5 hidden">
        <div class="pricing__wrapper">
          <ProfilePricingCards />
        </div>
      </div>
      <div class="mt-5" v-if="hasPosts">
        <div class="bg-gray-200 dark:bg-black media p-3">
          <div class="ctas flex justify-between">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              class="flex justify-center items-center rounded-full border-primary action__item hover:bg-primary hover:text-white text-white fs-10 py-3 px-2 xs:fs-16 sm:px-4 md:px-6 xl:px-10"
              @click="selectOption(tab)"
              :class="tab.active ? 'bg-primary text-white' : 'text-primary'"
            >
              <span class="material-icons-round mr-1 sm:mr-3">
                {{ tab.icon }}
              </span>
              {{ $t(`profile.${tab.slug}`) }}
            </button>
          </div>
          <div class="mt-5">
            <div class="media__content">
              <keep-alive
                ><ProfileMediaLayout :tab="selectedTab" />
              </keep-alive>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5" v-else>
        <h1 class="text-black dark:text-white fs-24 text-center">No posts</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import getAccounts from '@/scripts/metamask'
import Web3 from 'web3'

export default {
  props: {
    contentCreator: {
      type: Object,
    },
  },
  data() {
    return {
      selectedTab: 'images',
      isMenuOpen: false,
      tabs: [
        {
          slug: 'images',
          icon: 'image',
          name: 'Images',
          active: true,
        },
        {
          slug: 'videos',
          icon: 'videocam',
          name: 'Videos',
          active: false,
        },
        {
          slug: 'livestreams',
          icon: 'sensors',
          name: 'Livestreams',
          active: false,
        },
      ],
      isSubscribed: false,
      loading: false,
      metamaskAddress: null,
    }
  },
  computed: {
    isSubscriptionPaid() {
      return (this.contentCreator.rate && this.contentCreator.rate > 0) || false
    },
    hasPosts() {
      return (
        (this.contentCreator.posts && this.contentCreator.posts > 0) || false
      )
    },
  },
  methods: {
    ...mapActions('subscriptions', ['subscribeToContentCreator']),
    openOptions() {
      this.isMenuOpen = !this.isMenuOpen
    },
    hide() {
      this.isMenuOpen = false
    },
    selectOption(tab) {
      this.selectedTab = tab.slug
      this.tabs.map((x) => {
        x.active = false
      })
      tab.active = !tab.active
    },
    async subscribeTo() {
      this.loading = true
      if (!this.isSubscriptionPaid) {
        this.subscribeToContentCreator({
          creator_id: this.contentCreator._id,
          transactionId: 'free',
          amount: this.contentCreator.rate || 0,
          wallet_address: this.contentCreator.wallet_address,
        })
          .then((res) => {
            const { success } = res
            if (success) {
              this.isSubscribed = true
            }
            this.loading = false
          })
          .catch((err) => {
            console.log(err)
          })
        return
      }
      try {
        const {
          amountToPaid,
          wallet_address,
          subscriptionRate,
        } = this.contentCreator
        if (!window.ethereum) {
          alert(
            'Non-Ethereum browser detected. You should consider trying MetaMask!'
          )
          this.loading = false
        }
        getAccounts()
          .then(async (result) => {
            console.log(result, 'result')
            this.metamaskAddress = result
            // Use BigNumber
            let decimals = Web3.utils.toBN(10)
            let amount = Web3.utils.toBN(this.contentCreator.rate)

            let minABI = [
              // transfer
              {
                constant: false,
                inputs: [
                  {
                    name: '_to',
                    type: 'address',
                  },
                  {
                    name: '_value',
                    type: 'uint256',
                  },
                ],
                name: 'transfer',
                outputs: [
                  {
                    name: '',
                    type: 'bool',
                  },
                ],
                type: 'function',
              },
            ]
            // Get ERC20 Token contract instance
            // PRODUCTIOM:
            let justYoursTokenAddress =
              '0x37c045be4641328dfeb625f1dde610d061613497'
            // END PRODUCTION
            // DEVELOPMENT:
            // let justYoursTokenAddress = '0x5502644A6B8b90264a78088D03f25f8E77D56CB8'
            // END DEVELOPMENT
            var web3 = new Web3(Web3.givenProvider)
            let contract = new web3.eth.Contract(minABI, justYoursTokenAddress)
            console.log(amount)
            let value = amount.mul(Web3.utils.toBN(10).pow(decimals))
            console.log(value, 'value')
            // TESTING PURPOSES WALLET
            // let toAddress = '0xE1D92283220A68593f2C6f2Ba07f6FaAAA58fcF8'
            let toAddress = this.contentCreator.wallet_address
            //
            contract.methods
              .transfer(toAddress, value)
              .send({ from: result })
              .on('transactionHash', (hash) => {
                console.log(hash)
                let receiptInterval = setInterval(() => {
                  getReceipt(this)
                }, 1000)
                function getReceipt(instance) {
                  web3.eth.getTransactionReceipt(hash, (error, receipt) => {
                    console.log(error, receipt, 'receipt response')
                    if (receipt) {
                      setTimeout(() => {
                        instance
                          .subscribeToContentCreator({
                            creator_id: instance.contentCreator._id,
                            transactionId: hash,
                            amount: instance.contentCreator.rate,
                            wallet_address: instance.metamaskAddress,
                          })
                          .then((res) => {
                            console.log(res)
                            const { success } = res
                            if (success) {
                              instance.isSubscribed = true
                            }
                            instance.loading = false
                          })
                          .catch((err) => {
                            console.log(err)
                            instance.loading = false
                          })
                      }, 5000)
                      clearReceiptInterval()
                      return
                    }
                  })
                }

                const clearReceiptInterval = () => {
                  clearInterval(receiptInterval)
                }
              })
              .catch((error) => {
                console.log(error)
                this.loading = false
              })
          })
          .catch((err) => {
            console.log(err, 'err')
            this.loading = false
          })
      } catch (error) {
        console.error(error)
        this.loading = false
      }
    },
  },
}
</script>

<style scoped lang="scss">
.profile__card {
  .personal__data {
    position: relative;
    margin-left: 20%;
    @media (max-width: 1280px) {
      text-align: center;
      margin-left: 0;
    }
  }

  .cover__photo {
    max-height: 200px;
  }

  .content {
    .info {
      line-height: 29px;
      letter-spacing: 0.183333px;
      font-weight: 500;
      @media (max-width: 1280px) {
        text-align: center;
      }
      p {
        max-width: 60%;
        @media (max-width: 1280px) {
          max-width: 100%;
          text-align: center;
        }
      }
    }

    .pricing__wrapper {
      box-shadow: 0px 0px 20px rgba(188, 188, 188, 0.3);
      border-radius: 38px;
      padding: 0.5em;
    }
  }

  .media {
    box-shadow: 0px 0px 20px rgba(188, 188, 188, 0.3);
    border-radius: 50px;
  }
}
</style>
