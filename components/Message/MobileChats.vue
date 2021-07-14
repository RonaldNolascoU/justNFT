<template>
  <nav class="messages_dropdown mobile_messages__dropdown__wrapper">
    <div class="wrapper_box bg-white dark:bg-black dark:box-messages">
      <div class="wrapper show">
        <ul class="menu-bar">
          <div class="flex w-full mt-2 mb-3 content-inputs dark:bg-input">
            <vs-input
              block
              type="text"
              icon-after
              v-model="msgSearchValue"
              placeholder="Search Messages"
              icon="search"
            >
            </vs-input>
          </div>
          <div class="overflow-y-scroll messages_boxes h-screen mt-8">
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
                    :src="require(`~/assets/img/msg/${msg.image}.png`)"
                  />
                  <div v-if="!!msg.count" class="text-center status-circle">
                    <span class="relative dark:text-black">
                      {{ msg.count }}
                    </span>
                  </div>
                </div>
                <div class="ml-6 names">
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
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      msgSearchValue: '',
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
    openChat(msg) {
      this.$router.push(`/chats/${msg.id}`)
    },
  },
}
</script>
<style lang="scss">
.dark {
  .mobile_messages__dropdown__wrapper {
    .vs-input--placeholder {
      color: white;
    }
    .vs-icon {
      color: #999999;
    }
    input {
      color: white;
    }
  }
}

.mobile_messages__dropdown__wrapper {
  .names {
    max-width: 50%;
    @media (min-width: 500px) and (max-width: 1023px) {
      max-width: 100%;
    }
  }
  .vs-input--placeholder {
    top: initial;
    color: #999999;
  }

  .vs-icon {
    color: white;
  }
  input {
    border-radius: 53px !important;
  }
  .vs-con-input-label {
    width: 100%;
  }

  .messages_boxes {
    height: 80% !important;
  }
  .menu-bar {
    width: 100%;
    height: 100vh !important;
  }
}

.messages__dropdown__wrapper {
  .wrapper ul.setting-drop {
    display: none;
  }
  .vs-con-input-label {
    width: 100% !important;
    input {
      border-radius: 53px;
    }
  }

  .vs-input--placeholder {
    top: initial;
  }

  .message-box {
    transition: all 0.3s ease;
    width: 100%;

    .show {
      display: block;
      display: flex;
    }

    .wrapper ul {
      width: 100%;
      // width: 100%;
      list-style: none;
      padding: 10px;
      transition: all 0.3s ease;
    }
  }
}
</style>
