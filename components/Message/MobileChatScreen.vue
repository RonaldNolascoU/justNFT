<template>
  <div>
    <div class="chat__screen" ref="chatScreen">
      <div
        class="fixed w-full pt-2 bg-white dark:bg-black shadow-md top-0 left-0 px-4"
      >
        <li class="flex items-center justify-between arrow back-setting-btn">
          <div class="flex items-center">
            <span
              class="fas fa-arrow-left cursor-pointer dark:text-white fs-20 mr-4"
              @click="back"
            ></span>
            <div class="flex items-center justify-between" v-if="chat">
              <div class="flex current_chat items-center">
                <nuxt-img
                  class="rounded-full absolute"
                  width="40"
                  height="40"
                  :src="`/images/msg/${chat.image}.png`"
                />
                <div class="ml-16">
                  <div class="text-left fs-20 dark:text-white">
                    {{ chat.name }}
                  </div>
                  <div class="text-left fs-16 text-primary text-ellipsis">
                    {{ $t('navbar.messages.active') }} {{ chat.date }}
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
      </div>

      <div v-if="!showingMediaUpload" class="mt-20 mb-16 messages_dropdown">
        <div class="chat__screen h-screen overflow-y-scroll">
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
      <div v-else>
        <MessageUploadImage />
      </div>
    </div>

    <div
      class="fixed w-full flex justify-between flex-auto fixed__footer_chat px-4 pb-4 left-0 bg-white dark:bg-black"
    >
      <div
        class="flex items-center justify-between arrow back-setting-btn add__message relative flex-1"
      >
        <!-- <form @submit="addMessage" class="w-full"> -->
        <textarea
          type="text"
          placeholder="Say something..."
          class="dark:bg-gray-1000 dark:text-white flex-1"
          ref="addCommentTextArea"
          @keyup="textAreaAdjust($event)"
          @keydown.enter="addMessage"
          v-model="comment"
        />
        <!-- </form> -->
        <div
          class="absolute cursor-pointer right-0 bottom-0 flex items-center pr-3 action__icon"
        >
          <i
            class="mr-2 cursor-pointer fas fa-camera text-primary right-0"
            @click="showMediaUpload"
          ></i>
        </div>
        <div
          class="absolute cursor-pointer right-0 bottom-0 flex items-center pr-3 send__icon"
        >
          <i
            class="mr-2 cursor-pointer text-primary right-0 fas fa-paper-plane"
            @click="addMessage"
          ></i>
        </div>
        <div
          class="absolute cursor-pointer left-0 bottom-0 flex items-center pr-3 smily_face"
        >
          <i
            class="mr-2 cursor-pointer far fa-grin-alt text-primary left-0"
            @click="addEmoji"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  transition: 'slide-left',
  props: {
    chat: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
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
      showingMediaUpload: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollChatScreen()
    })
  },
  methods: {
    back() {
      this.$router.back()
    },
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
    scrollChatScreen() {
      let chatScreen = this.$refs.chatScreen
      window.scrollTo({ top: chatScreen.scrollHeight, behavior: 'smooth' })
    },
    addMessage() {
      if ((this.comment && this.comment.length == 0) || !this.comment) return
      let message = { userId: 1, msg: this.comment }
      let replyMessage = {
        userId: this.chat.userId,
        msg: 'Hey, this is a reply text',
      }
      this.chatMessages.push(message, replyMessage)
      this.comment = null
      this.$refs.addCommentTextArea.style.height = 35
      this.$nextTick(() => {
        this.scrollChatScreen()
      })
    },
    showMediaUpload() {
      // We must do something similar to this: https://stackoverflow.com/questions/52517523/add-slidedown-effect-on-modal-close-css
      this.showingMediaUpload = !this.showingMediaUpload
    },
    addEmoji() {
      console.log('adding emoji')
    },
  },
}
</script>

<style scoped lang="scss">
// CHAT SCREEN

.messages_dropdown {
  padding-bottom: 1em;
  @media (min-width: 768px) and (max-width: 1279px) {
    padding-bottom: 2em;
  }

  .chat_screen__wrapper {
    height: 73vh;
    @media (max-width: 360px) {
      height: 66vh;
    }
    @media (min-width: 361px) and (max-width: 400px) {
      height: 73vh;
    }

    @media (min-width: 401px) and (max-width: 500px) {
      height: 71vh;
    }

    @media (orientation: landscape) {
      height: 40vh;
    }
  }
  .chat__screen {
    scroll-behavior: smooth;
    height: 100%;
  }
  .message {
    // width: 75%;
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
}

.fixed__footer_chat {
  bottom: 65px;
  @media (min-width: 678px) and (max-width: 1279px) {
    bottom: 81px;
  }
  .add__message {
    padding-top: 1em;
    textarea {
      overflow: hidden;
      resize: none;
      width: 100%;
      min-height: 35px !important;
      height: 35px;
      max-height: 100px !important;
      border-radius: 23px;
      // height: auto !important;
      padding-top: 0.4em;
      padding-left: 2.5em;
      padding-right: 2.5em;
      background: #f1f0f0;
    }

    .send__icon {
      right: 3em;
      bottom: 0.6em !important;
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
