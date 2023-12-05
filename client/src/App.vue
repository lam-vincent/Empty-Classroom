<script setup lang="ts">
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

#app {
  --main-bg-color: #f5f6f8;
  --secondary-bg-color: white;
  --main-text-color: black;
  --light-gray: #f2f3f7;
  --light-dark-gray: #D9D9D9;
  --gray: #9ca3af;
  --dark-gray: #4b5563;
  --blue: #3b82f6;
  --dark-blue: #153e96;
  --green: #10b981;
  --red: #ef4444;

  font-family: 'Roboto', sans-serif;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
