<template>
  <MessageMobileChatScreen :chat="chat" />
</template>

<script>
export default {
  data() {
    return {
      chat: null,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.chat =
        this.$store.state.messages.find((msg) => {
          return msg.id == this.$route.params.id
        }) || {}
    })
  },
}
</script>

<style></style>
