<template>
  <div class="dealer-container">
    <div class="dealer-container__avatar">
      <!-- profile pic -->
    </div>
    <div class="dealer-container__status" :class="[status]">
      <div class="dealer-container__status-text">
        {{ fullStatusDict[status] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dealer',
  props: {
    status: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      fullStatusDict: {
        staring: 'is staring.',
        typing: 'is typing...',
        left: 'has left you.',
      },
    }
  },
}
</script>

<style lang="scss">
.dealer-container {
  display: flex;
  align-items: center;

  &__avatar {
    border-radius: 100%;
    background-color: #b5c2c0;
    width: 60px;
    height: 60px;
  }

  &__status {
    margin-left: 13px;
    transition: all 0.5s;
    display: grid;
    align-content: center;
    justify-items: center;
    overflow: hidden;
    height: 30px;

    &-text {
      font-family: Montserrat;
      font-size: 1.1rem;
      letter-spacing: 1px;
    }
  }
}

@keyframes typing {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.6;
  }

  100% {
    opacity: 1;
  }
}

@keyframes staring {
  0% {
    transform: scaleY(1);
    opacity: 1;
  }

  1% {
    opacity: 0.3;
    transform: scaleY(0);
  }

  2% {
    opacity: 1;
    transform: scaleY(1);
  }

  10% {
    opacity: 1;
    transform: scaleY(1);
  }

  11% {
    opacity: 0.3;
    transform: scaleY(0);
  }

  12% {
    opacity: 1;
    transform: scaleY(1);
  }

  60% {
    opacity: 1;
    transform: scaleY(1);
  }

  61% {
    opacity: 0.3;
    transform: scaleY(0);
  }

  62% {
    opacity: 1;
    transform: scaleY(1);
  }

  100% {
    transform: scaleY(1);
  }
}

.typing {
  animation: 1s ease-in-out 0s typing infinite;
}

.staring {
  animation: 8s ease-in-out 0s staring infinite alternate-reverse;
}

.left {
  opacity: 0.6;
}
</style>
