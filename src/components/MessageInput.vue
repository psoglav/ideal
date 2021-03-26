<template>
  <div
    class="message-input common"
    :class="{ focused: inputFocused }"
    @click="focusInput"
  >
    <span v-if="!input" class="message-input_placeholder">Start typing...</span>
    {{ input }}
    <div class="message-input_container common">
      <textarea
        class="message-input_container_input"
        ref="input"
        type="text"
        @keypress.enter.prevent="handleSubmit"
        @keydown.ctrl.enter="enterNewLine"
        v-model="input"
      ></textarea>
    </div>
    <div
      @click="handleSubmit"
      :class="{ hidden: submitHidden || !inputFocused }"
      class="message-input_submit"
    >
      Send
    </div>
  </div>
</template>

<script>
export default {
  name: 'message-input',
  data() {
    return {
      input: '',
      inputFocused: false,
      initialInputHeight: '',
      prevInputHeight: '',
      inputRect: null,
      submitHidden: false,
    }
  },
  watch: {
    input() {
      const t = this
      setTimeout(() => {
        if (t.prevInputHeight != t.inputHeight()) {
          t.prevInputHeight = t.inputHeight()

          t.submitHidden = t.initialInputHeight != t.inputHeight()
        }
      }, 10)
    },
  },
  methods: {
    focusInput() {
      this.$refs.input.focus()
    },
    handleSubmit() {
      if (!this.input) return
      this.$emit('send-message', this.input)
      this.input = ''
    },
    enterNewLine() {
      this.input += '\n'
    },
    handleInputFocusEvent() {
      this.inputFocused = true
    },
    handleInputBlurEvent() {
      this.inputFocused = false
    },
    inputHeight() {
      this.inputRect = this.$refs.input.getBoundingClientRect()
      return this.inputRect.height
    },
  },
  beforeDestroy() {
    this.$refs.input.removeEventListener('focus', this.handleInputFocusEvent)
    this.$refs.input.removeEventListener('blur', this.handleInputBlurEvent)
  },
  mounted() {
    this.$refs.input.addEventListener('focus', this.handleInputFocusEvent)
    this.$refs.input.addEventListener('blur', this.handleInputBlurEvent)

    this.initialInputHeight = this.inputHeight()
    this.prevInputHeight = this.inputHeight()

    this.$refs.input.focus()
  },
}
</script>

<style lang="scss">
@import '@/scss/colors';

.common {
  position: absolute;
  padding: 0.5rem 0;
  padding-left: 1rem;
  padding-right: 0.5rem;
}

.message-input {
  left: 3%;
  padding-left: 1.1rem;
  bottom: 67px;
  z-index: 10;
  width: 40%;
  height: auto;
  z-index: 100;
  min-height: 38px;
  max-height: 30vh;

  transition: height 0.1s, box-shadow 0.4s, opacity 0.3s;
  overflow: hidden;

  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px 2px black, 0 0 10px 1px transparentize($light, 1);
  background-color: #00000033;

  color: transparent;
  font-size: 1rem;
  font-family: 'Open Sans', Montserrat, sans-serif;
  letter-spacing: 0.1rem;
  word-break: break-all;
  text-align: left;
  user-select: none;
  cursor: text;

  &.focused {
    box-shadow: 0 0 10px 2px black, 0 0 100px 1px transparentize($light, 0.7);
  }

  &_placeholder {
    letter-spacing: 0;
    color: $half-light;
    font-style: italic;
  }

  &_container {
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 10;
    width: 100%;
    height: 100%;
    user-select: none;

    &_input {
      pointer-events: all;
      overflow-x: hidden;
      position: relative;
      width: 100%;
      height: 100%;
      border: none;
      word-break: break-all;
      resize: none;
      color: white;
      background-color: transparent;
      font-family: 'Open Sans', Montserrat, sans-serif;
      font-size: 1rem;

      &:focus {
        outline: none;
      }

      &::selection {
        background-color: $subtle-light;
      }
    }
  }

  &_submit {
    letter-spacing: 0;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 60px;
    background-color: black;
    cursor: pointer;
    text-align: center;
    color: white;
    display: grid;
    align-content: center;
    font-size: 0.9rem;
    transition: all 0.2s;
    z-index: 200;

    &:hover {
      background-color: $subtle-light;
    }

    &.hidden {
      // z-index: 5;
      opacity: 0;
      filter: blur(50px);
    }
  }
}
</style>
