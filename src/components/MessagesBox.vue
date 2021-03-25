<template>
  <div class="container">
    <div class="container_messages">
      <div
        v-for="(stack, i) in stacks"
        :key="i"
        :class="{ opposite: me.id != stack[0].user }"
        class="container_messages-stack"
      >
        <div class="container_messages-stack_time">
          <span class="expanded">
            {{ formatTime(stack[0].at, true) }}
          </span>
          <span class="collapsed">
            {{ formatTime(stack[0].at) }}
          </span>
        </div>
        <div
          v-for="(message, k) in stack"
          :key="k"
          class="container_messages-stack_item"
          :class="{ stacked: stack.length > 1 }"
        >
          <div class="highlight"></div>
          {{ message.content.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'MessagesBox',
  data() {
    return {
      stacks: [],
      messages: [
        {
          content: {
            text: 'Query parameters can also be provided, either with the query option or directly in the url (example: http://localhost/users?token=abc).',
            attachments: [
              {
                type: 'image',
                url:
                  'https://sun9-61.userapi.com/impg/AAUWN4BdMpMFYZ2P4IcPAGmKHD85z2PoPdwBWw/uk5z5GJFvQs.jpg?size=563x751&quality=96&sign=eb6853c14b4ee76fc5517e2de382513c&type=album',
              },
            ],
          },
          user: 1,
          at: +new Date() + 63510 * 3,
        },
        {
          content: {
            text: 'Creates a new Manager for the given URL, and attempts to reuse an existing Manager for subsequent calls, unless the multiplex option is passed with false. Passing this option is the equivalent of passing "force new connection": true or forceNew: true.',
            attachments: [
              {
                type: 'image',
                url:
                  'https://sun9-61.userapi.com/impg/AAUWN4BdMpMFYZ2P4IcPAGmKHD85z2PoPdwBWw/uk5z5GJFvQs.jpg?size=563x751&quality=96&sign=eb6853c14b4ee76fc5517e2de382513c&type=album',
              },
            ],
          },
          user: 8932489,
          at: +new Date() + 61394 * 7,
        },
        {
          content: {
            text: 'A new Socket instance is returned for the namespace specified by the pathname in the URL, defaulting to /. For example, if the url is http://localhost/users, a transport connection will be established to http://localhost and a Socket.IO connection will be established to /users.',
            attachments: [
              {
                type: 'image',
                url:
                  'https://sun9-61.userapi.com/impg/AAUWN4BdMpMFYZ2P4IcPAGmKHD85z2PoPdwBWw/uk5z5GJFvQs.jpg?size=563x751&quality=96&sign=eb6853c14b4ee76fc5517e2de382513c&type=album',
              },
            ],
          },
          user: 8932489,
          at: +new Date() + 61396 * 7,
        },
        {
          content: {
            text:
              "Hay friends I was trying to make this code. Actually in this code there is no error according to console but I am facing a problem I am not able to control perspective origin and perspective with javascript. If anyone knows why it's not working then I will be very thankful to him/her. I had done many of successful code with same pattern as in this code they all are working but I failed to found error in this code. Before giving answer its humble request that first change do the experiment for yourself by editing code and then give me answer.\n\nNote : I dont want to use css because it is like a controller and if I will use css for this it will not be like a controller anymore.",
            attachments: [
              {
                type: 'image',
                url:
                  'https://sun9-61.userapi.com/impg/AAUWN4BdMpMFYZ2P4IcPAGmKHD85z2PoPdwBWw/uk5z5GJFvQs.jpg?size=563x751&quality=96&sign=eb6853c14b4ee76fc5517e2de382513c&type=album',
              },
            ],
          },
          user: 8932489,
          at: +new Date() + 67400 * 8,
        },
        {
          content: {
            text:
              'Offload aged data from your Atlas cluster to a lower-cost, queryable storage tier. Create an Online Archive to start saving on storage costs.',
            attachments: [
              {
                type: 'image',
                url:
                  'https://sun9-61.userapi.com/impg/AAUWN4BdMpMFYZ2P4IcPAGmKHD85z2PoPdwBWw/uk5z5GJFvQs.jpg?size=563x751&quality=96&sign=eb6853c14b4ee76fc5517e2de382513c&type=album',
              },
            ],
          },
          user: 1,
          at: +new Date() + 67400 * 8,
        },
      ],
    }
  },
  watch: {
    messages: {
      immediate: true,
      handler(v) {
        let messages = [...v].sort((a, b) => a.at - b.at)

        let ts = 0
        let next = null
        let prev = null

        this.stacks = []

        while (messages.length) {
          let l = this.stacks.length
          next = messages.shift()

          if (!ts || ts + 60000 <= next.at || next.user != prev?.user) {
            ts = next.at
            this.stacks.push([next])
            prev = next
          } else {
            this.stacks[l - 1].push(next)
          }
        }
      },
    },
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
    formatTime(ts, expand) {
      const d = moment(ts)

      return expand ? d.format('MMMM Do YYYY, h:mm:ss a') : d.format('LT')
    },
  },
}
</script>

<style lang="scss">
@import '@/scss/colors';

$msg-bg: linear-gradient(125deg, $darkness, $subtle-light);
$opp-msg-bg: linear-gradient(45deg, $subtle-light, $darkness);
$msg-fg: #eeeeffee;
$msg-min-radius: 5px;
$msg-max-radius: 0.9rem;
$msg-padding: 1rem;
$msg-font-size: 0.95rem;
$msg-gap: 5px;
$stacks-gap: 15px;

$msg-hover-time: 0.4s;

.container {
  position: absolute;
  padding: 80px 0;
  z-index: 0;
  top: 0;
  height: calc(100% - 80px);
  width: 100%;
  overflow: auto;
  overflow-x: hidden;

  &_messages {
    width: 100%;
    grid-gap: $stacks-gap;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    &-stack {
      width: 43%;
      display: flex;
      flex-direction: column;
      grid-gap: $msg-gap;
      position: relative;
      transform-style: preserve-3d;
      perspective: 1200px;
      perspective-origin: 100% 0%;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-10px);
      }

      &:hover &_item {
        transform: rotateX(-5deg) rotateY(7deg);
      }

      &.opposite:hover &_item {
        transform: rotateX(-5deg) rotateY(-4deg);
      }

      &:hover &_item .highlight {
        transform: translateX(-120%) rotate(45deg);
      }

      &.opposite:hover &_item .highlight {
        transform: translateX(120%) rotate(45deg);
      }

      &.opposite {
        align-self: flex-end;
      }

      &_item {
        max-width: 400px;
        text-align: left;
        background: $msg-bg;
        padding: $msg-padding;
        font-size: $msg-font-size;
        font-family: 'Open Sans', Montserrat, sans-serif;
        font-weight: 500;
        color: $msg-fg;
        align-self: flex-start;
        white-space: pre-wrap;
        word-break: break-all;
        border-radius: 0 $msg-max-radius $msg-max-radius $msg-max-radius;
        overflow: hidden;
        position: relative;
        transition: transform $msg-hover-time;

        .highlight {  
          position: absolute;
          top: 10%;
          left: 0;
          border-radius: 100%;
          width: 300px;
          height: 300px;
          opacity: 0.2;
          transform: translateX(120%) rotate(45deg);
          filter: blur(35px);
          transition: all $msg-hover-time;
          background-color: #fff;
          pointer-events: none;
        }

        &::selection {
          background-color: $subtle-light;
        }

        &.stacked {
          border-radius: 0 $msg-min-radius $msg-min-radius 0;
        }

        &.stacked:last-child {
          border-radius: 0 $msg-min-radius $msg-max-radius $msg-max-radius;
        }

        &.stacked:first-child {
          border-radius: 0 $msg-max-radius $msg-min-radius 0;
        }
      }

      &.opposite &_item {
        align-self: flex-end;
        background: $opp-msg-bg;
        border-radius: $msg-max-radius 0 $msg-max-radius $msg-max-radius;

        .highlight {
          transform: translateX(-120%) rotate(45deg);
        }

        &.stacked {
          border-radius: $msg-min-radius 0 0 $msg-min-radius;
        }

        &.stacked:last-child {
          border-radius: $msg-min-radius 0 $msg-max-radius $msg-max-radius;
        }

        &.stacked:first-child {
          border-radius: $msg-max-radius 0 0 $msg-min-radius;
        }
      }

      &_time {
        left: 0;
        bottom: -0.4rem;
        position: absolute;
        text-align: left;
        font-size: 0.8rem;
        opacity: 0;
        width: 100%;
        transition: opacity 0.2s;
        pointer-events: none;

        .expanded,
        .collapsed {
          display: block;
          position: absolute;
          transition: opacity 0.2s;
          top: 0;
        }
        .expanded {
          opacity: 0;
        }
        .collapsed {
          opacity: 1;
        }
      }

      &.opposite &_time {
        right: 0;
        text-align: right;

        .expanded,
        .collapsed {
          right: 0;
        }
      }

      &:hover &_time {
        opacity: 0.5;
        transition: opacity 0.4s;

        .expanded,
        .collapsed {
          transition-delay: 1s;
        }
        .expanded {
          opacity: 1;
        }
        .collapsed {
          opacity: 0;
        }
      }
    }
  }
}
</style>
