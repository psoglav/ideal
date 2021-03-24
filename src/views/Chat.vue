<template>
  <div class="chat">
    <chat-participant name="wwwolfie" status="typing" />
    <connection />
    <chat-participant me status="typing" />
  </div>
</template>

<script>
import Connection from '~/Connection'
import ChatParticipant from '~/ChatParticipant'

export default {
  name: 'Chat',
  components: {
    Connection,
    ChatParticipant,
  },
  data() {
    return { connectionSegments: 10 }
  },
}
</script>

<style lang="scss">
.chat {
  position: relative;
  display: grid;
  min-height: 500px;
  height: calc(100vh - 70px);
  padding: 60px 0;
  align-content: space-between;
}
</style>
