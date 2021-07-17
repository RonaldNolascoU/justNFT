<template>
  <transition name="box">
    <nav class="notifications__dropdown" v-click-outside="hide">
      <div
        class="px-3 py-3 wrapper_box bg-white dark:bg-messages dark:box-messages"
      >
        <div class="wrapper show">
          <ul class="menu-bar">
            <div class="flex justify-between">
              <span class="fs-20 dark:text-white font-semibold">{{
                $t('navbar.notifications.title')
              }}</span>
              <span
                ><i class="cursor-pointer fas fa-ellipsis-v text-gray"
              /></span>
            </div>
            <div class="mt-2 mb-3 content-inputs dark:bg-input">
              <span
                class="text-primary text-separate fs-18 uppercase font-semibold"
                >{{ $t('navbar.notifications.latest') }}</span
              >
              <div
                class="border border-1 divider bg-primary border-primary"
              ></div>
            </div>
            <div class="overflow-y-scroll messages_boxes">
              <li
                class="flex items-center justify-between mb-4 rounded-lg setting-item dark:hover:bg-light-gray"
                v-for="(notification, index) in $store.state.notifications"
                :key="index"
                @click="goToNotification(notification)"
              >
                <div class="flex icon">
                  <div class="relative pb-1">
                    <nuxt-img
                      class="rounded-full"
                      :src="`/images/msg/${notification.image}.png`"
                    />
                  </div>
                  <div class="ml-6">
                    <div class="text-left fs-20 dark:text-white">
                      <span
                        :class="{
                          'text-navy font-semibold':
                            notification.isSubscription,
                        }"
                      >
                        {{ notification.name }}
                      </span>
                      <span
                        class="text-left fs-16 text-secondary text-ellipsis"
                        :class="{
                          'text-primary font-bold': notification.isSubscription,
                        }"
                      >
                        {{ $t(`navbar.notifications.${notification.i18n}`) }}
                      </span>
                    </div>
                  </div>
                </div>
                <span class="text-secondary">{{
                  getFormattedTime(notification.date)
                }}</span>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  </transition>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
  },
  computed: {},
  mounted() {},
  methods: {
    getFormattedTime(date) {
      return this.$dateFns.formatDistance(
        new Date(),
        this.$dateFns.parseISO(date),
        {
          addSuffix: true,
        }
      )
    },
    hide() {
      this.$emit('hidden')
    },
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.transformOrigin = 'left'
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
      Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    leave: function (el, done) {
      Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
      Velocity(
        el,
        {
          rotateZ: '45deg',
          translateY: '30px',
          translateX: '30px',
          opacity: 0,
        },
        { complete: done }
      )
    },
  },
}
</script>
<style lang="scss" scoped>
.message-box {
  transition: all 0.3s ease;

  .show {
    display: block;
    display: flex;
  }

  .wrapper ul {
    width: 600px;
    list-style: none;
    padding: 10px;
    transition: all 0.3s ease;
  }
  width: 600px;
  height: 500px;
  right: 3%;

  @media (max-width: 1279px) {
    left: calc(50% - 200px);
    width: 400px;
  }
  @media (max-width: 400px) {
    left: calc(50% - 160px);
    width: 320px;
  }
}

.notifications__dropdown {
  .divider {
    width: 80%;
    position: relative;
    top: -0.3em;
    left: 7em;
  }

  .chat__screen {
    height: 500px;
    scroll-behavior: smooth;
  }
  .message {
    width: auto;
    max-width: 90%;
    padding: 1em;
    font-size: 16px;
  }

  .message-out {
    color: white;
    float: right;
    background: linear-gradient(180deg, #d64973 0%, #233d9b 100%);
    border-radius: 18px 5px 18px 18px;
  }
  .message-in {
    border-radius: 5px 18px 18px 18px;
    background: #f1f0f0;
    float: left;
  }

  .add__message {
    textarea {
      overflow: hidden;
      resize: none;
      width: 100%;
      min-height: 46px !important;
      height: 46px;
      max-height: 100px !important;
      border-radius: 23px;
      // height: auto !important;
      padding-top: 0.4em;
      padding-left: 1.7em;
      padding-right: 1.7em;
      background: #f1f0f0;
    }
    .action__icon {
      bottom: 0.6em !important;
    }
    .smily_face {
      left: 1em;
      bottom: 0.6em !important;
    }
  }
}
</style>
