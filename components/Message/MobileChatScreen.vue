<template>
  <nav class="messages_dropdown mobile_messages__dropdown__wrapper">
    <div class="wrapper_box bg-white dark:bg-black dark:box-messages">
      <div class="wrapper show">
        <!-- Chat Screen -->
        <ul class="setting-drop">
          <li class="flex items-center justify-between arrow back-setting-btn">
            <div class="flex items-center">
              <span
                class="fas fa-arrow-left cursor-pointer dark:text-white fs-20 mr-4"
                @click="back"
              ></span>
              <div class="flex items-center justify-between" v-if="chat">
                <div class="flex current_chat items-center">
                  <img
                    class="rounded-full absolute"
                    width="40"
                    height="40"
                    :src="require(`~/assets/img/msg/${chat.image}.png`)"
                  />
                  <div class="ml-16">
                    <div class="text-left fs-20 dark:text-white">
                      {{ chat.name }}
                    </div>
                    <div class="text-left fs-16 text-primary text-ellipsis">
                      Active {{ chat.date }} ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <i class="fas fa-ellipsis-v text-gray"></i>
          </li>
          <div class="mt-5">
            <div
              class="chat__screen h-screen overflow-y-scroll"
              ref="chatScreen"
            >
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
                class="mr-2 cursor-pointer fas fa-camera text-primary right-0"
              ></i>
            </div>
            <div
              class="absolute cursor-pointer left-0 bottom-0 flex items-center pr-3 pointer-events-none smily_face"
            >
              <i
                class="mr-2 cursor-pointer far fa-grin-alt text-primary left-0"
              ></i>
            </div>
          </div>
        </ul>
      </div>
    </div>
  </nav>
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
    scrollChatScreen(added = false) {
      let chatScreen = this.$refs.chatScreen
      console.log(chatScreen.scrollHeight)
      chatScreen.scrollTop = added
        ? chatScreen.scrollHeight
        : chatScreen.scrollHeight
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
        this.scrollChatScreen(true)
      })
    },
  },
}
</script>

<style scoped lang="scss">
// CHAT SCREEN
.messages_dropdown {
  padding-bottom: 1em;
  @media (min-width: 768px) and (max-width: 1023px) {
    padding-bottom: 2em;
  }
  .chat__screen {
    scroll-behavior: smooth;
    height: 600px;
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

  .add__message {
    padding-top: 1em;
    @media (min-width: 700px) and (max-width: 1023px) {
      padding-top: initial !important;
    }
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
