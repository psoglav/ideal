<template>
  <div class="chat">
    <div class="chat_participants">
      <chat-participant :profile="user" status="typing" />
      <connection />
      <chat-participant :profile="me" me status="typing" />
    </div>
    <messages-box />
    <message-input @send-message="sendMessage" />
  </div>
</template>

<script>
import Connection from '~/Connection'
import ChatParticipant from '~/ChatParticipant'
import MessagesBox from '~/MessagesBox'
import MessageInput from '~/MessageInput'

export default {
  name: 'Chat',
  components: {
    Connection,
    ChatParticipant,
    MessagesBox,
    MessageInput,
  },
  data() {
    return {}
  },
  computed: {
    me() {
      return this.$store.getters.me
    },
    user() {
      return this.$store.getters.user
    },
  },
  methods: {
    sendMessage(text) {
      this.$store.commit('ADD_MESSAGE', {
        content: {
          text,
          attachments: [],
        },
        user: 1,
        at: +new Date(),
      })
    },
  },
}
</script>

<style lang="scss">
@import '@/scss/colors';

.chat {
  position: relative;
  height: 100vh;
  margin: 0 auto;
  max-width: 1300px;
  min-height: 500px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 2;
    pointer-events: none;
    background: linear-gradient(0deg, transparent, black);
  }

  &::after {
    top: auto;
    bottom: 120px;
    background: linear-gradient(180deg, transparent, black);
  }

  &_participants {
    position: relative;
    display: grid;
    height: 100%;
    align-content: space-between;
    padding: 60px 0;
  }
}
</style>
