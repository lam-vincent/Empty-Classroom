<template>
  <div class="main-layout">
    <Header />

    <main class="main-content">
      <router-view />
    </main>

    <Footer />
  </div>
</template>
  
<script lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "MainLayout",
  components: {
    Header,
    Footer,
  },
};
</script>
  
<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  box-sizing: border-box;
}
</style>
  