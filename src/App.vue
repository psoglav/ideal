<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '@/scss/colors';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  background: $primary-background;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  color: $primary-foreground;
}

*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background: $subtle-light;
  border-radius: 3px;
}

*::-webkit-scrollbar-thumb:hover {
  background: $half-light;
}
</style>
