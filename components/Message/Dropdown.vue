<template>
  <transition name="box">
    <nav class="messages_dropdown" v-click-outside="hide">
      <div
        class="px-3 py-3 wrapper_box bg-white dark:bg-messages dark:box-messages"
      >
        <div class="wrapper show">
          <ul class="menu-bar">
            <div class="flex justify-between">
              <span class="fs-20 dark:text-white font-semibold">{{
                $t('navbar.messages.title')
              }}</span>
              <span
                ><i class="cursor-pointer fas fa-ellipsis-v text-gray"
              /></span>
            </div>
            <div
              class="flex justify-center mt-2 mb-3 content-inputs dark:bg-input"
            >
              <vs-input
                block
                type="text"
                icon-after
                v-model="msgSearchValue"
                :placeholder="$t('navbar.messages.search')"
                icon="search"
              >
              </vs-input>
            </div>
            <div class="overflow-y-scroll messages_boxes">
              <li
                class="flex items-center justify-between mb-4 rounded-lg setting-item dark:hover:bg-light-gray"
                v-for="(msg, index) in filteredMessages"
                :key="index"
                @click="openChat(msg)"
              >
                <div class="flex icon">
                  <div class="relative pb-1">
                    <img
                      class="rounded-full"
                      :src="`/images/msg/${msg.image}.png`"
                    />
                    <div v-if="!!msg.count" class="text-center status-circle">
                      <span class="relative dark:text-black">
                        {{ msg.count }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-6">
                    <div class="text-left fs-20 dark:text-white">
                      {{ msg.name }}
                    </div>
                    <div class="text-left fs-16 text-secondary text-ellipsis">
                      {{ msg.msg }}
                    </div>
                  </div>
                </div>
                <span class="text-secondary">{{ msg.date }}</span>
              </li>
            </div>
          </ul>
          <!-- Chat Screen -->
          <ul class="setting-drop">
            <li
              class="flex items-center justify-between arrow back-setting-btn"
            >
              <div class="flex items-center">
                <span
                  class="fas fa-arrow-left cursor-pointer"
                  @click="back"
                ></span>
                <div
                  class="flex items-center justify-between"
                  v-if="currentChat"
                >
                  <div class="flex current_chat items-center">
                    <nuxt-img
                      class="rounded-full absolute"
                      width="40"
                      height="40"
                      :src="`/images/msg/${currentChat.image}.png`"
                    />
                    <div class="ml-16">
                      <div class="text-left fs-20 dark:text-white">
                        {{ currentChat.name }}
                      </div>
                      <div class="text-left fs-16 text-primary text-ellipsis">
                        {{ $t('navbar.messages.active') }}
                        {{
                          ['es'].includes($i18n.locale)
                            ? $t('navbar.messages.since')
                            : ''
                        }}
                        {{ currentChat.date }}
                        {{
                          !['es'].includes($i18n.locale)
                            ? $t('navbar.messages.ago')
                            : ''
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <i class="fas fa-ellipsis-v text-gray"></i>
            </li>
            <div class="mt-5">
              <div class="chat__screen overflow-y-scroll" ref="chatScreen">
                <div
                  v-for="(message, index) in chatMessages"
                  :key="index"
                  class="w-full inline-block"
                >
                  <div
                    class="message mb-3 dark:text-white break-all"
                    :class="{
                      'message-out': message.userId === 1,
                      'message-in dark:bg-gray-1000': message.userId !== 1,
                    }"
                  >
                    <p class="dark:text-white">
                      {{ message.msg }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex items-center justify-between arrow back-setting-btn add__message relative"
            >
              <textarea
                type="text"
                placeholder="Say something..."
                class="dark:bg-gray-1000 dark:text-white"
                ref="addCommentTextArea"
                @keyup="textAreaAdjust($event)"
                @keydown.enter="addMessage"
                v-model="comment"
              />
              <div
                class="absolute cursor-pointer right-0 bottom-0 flex items-center pr-3 pointer-events-none action__icon"
              >
                <i
                  @click="addEmoji"
                  class="mr-2 cursor-pointer fas fa-camera text-primary right-0"
                ></i>
              </div>
              <div
                class="absolute cursor-pointer left-0 bottom-0 flex items-center pr-3 pointer-events-none smily_face"
              >
                <i
                  @click="upload"
                  class="mr-2 cursor-pointer far fa-grin-alt text-primary left-0"
                ></i>
              </div>
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
    return {
      msgSearchValue: '',
      currentChat: null,
      chatMessages: [
        {
          userId: 1,
          msg:
            'Hey, how are you? It’s like you seem to me like a fairy tale!✨',
        },
        {
          userId: 2,
          msg: 'Hey, beautiful! How are you?👄',
        },
        {
          userId: 1,
          msg: 'I’m good. Kinda thirsty to see you on a call.',
        },
        {
          userId: 1,
          msg:
            '😵‍💫I mean it’s difficult to resist after seeing the naughty content you had sent to me that day!',
        },
        {
          userId: 2,
          msg: 'Of course. Everyone is here for the naughty stuff.👅👅👅',
        },
        {
          userId: 2,
          msg:
            'I charge 7500 for a clip of 5 minutes. But this clip would be unique and just made for you.',
        },
        {
          userId: 1,
          msg: 'Okay! I’m up for that steamy stuff!!!🔥',
        },
      ],
      comment: null,
    }
  },
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    filteredMessages() {
      if (this.msgSearchValue == '') return this.messages
      return this.messages.filter((entry) => {
        return (
          entry.name
            .toLowerCase()
            .includes(this.msgSearchValue.toLowerCase()) ||
          entry.msg.toLowerCase().includes(this.msgSearchValue.toLowerCase())
        )
      })
    },
  },
  mounted() {},
  methods: {
    isEnterKey(keyCode) {
      return keyCode == 13
    },
    isBackspaceKey(keyCode) {
      return keyCode == 8
    },
    textAreaAdjust(event) {
      if (this.isEnterKey(event.keyCode)) {
        this.comment = null
        return
      }
      let element = this.$refs.addCommentTextArea
      let numberOfLines =
        ((this.comment && this.comment.match(/\n/g)) || '').length + 1
      let textCharacters = this.comment && this.comment.length
      if (
        element.style.height < 100 &&
        (numberOfLines > 1 || textCharacters > 41)
      ) {
        element.style.height = '1px'
        element.style.height = 25 + element.scrollHeight + 'px'
      }
      if (
        element.scrollHeight > 50 &&
        element.scrollHeight < 100 &&
        this.isBackspaceKey(event.keyCode) &&
        textCharacters > 1
      ) {
        element.style.height = -25 + element.scrollHeight + 'px'
      }
    },
    scrollChatScreen(added = false) {
      let chatScreen = this.$refs.chatScreen
      chatScreen.scrollTop = added
        ? chatScreen.scrollHeight + 100
        : chatScreen.scrollHeight
    },
    addMessage() {
      if ((this.comment && this.comment.length == 0) || !this.comment) return
      let message = { userId: 1, msg: this.comment }
      let replyMessage = {
        userId: this.currentChat.userId,
        msg: 'Hey, this is a reply text',
      }
      this.chatMessages.push(message, replyMessage)
      this.messages.find((msg) => {
        return msg.userId == this.currentChat.userId
      }).msg = this.chatMessages[this.chatMessages.length - 1].msg
      this.comment = null
      this.$refs.addCommentTextArea.style.height = 46
      this.$nextTick(() => {
        this.scrollChatScreen(true)
      })
    },
    addEmoji() {
      console.log('emoji')
    },
    upload() {
      console.log('upload')
    },
    hide() {
      this.$emit('hidden')
    },
    openChat(msg) {
      this.currentChat = msg
      const menu_bar = document.querySelector('.menu-bar')
      const setting_drop = document.querySelector('.setting-drop')
      menu_bar.style.marginLeft = '-600px'
      setTimeout(() => {
        setting_drop.style.display = 'block'
        this.scrollChatScreen()
      }, 100)
    },
    back() {
      const menu_bar = document.querySelector('.menu-bar')
      const setting_drop = document.querySelector('.setting-drop')
      menu_bar.style.marginLeft = '0px'
      setting_drop.style.display = 'none'
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
<style lang="scss">
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

.messages_dropdown {
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
