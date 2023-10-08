<template>
  <div class="auth-layout">
    <div class="auth-container">

      <main class="auth-content">
        <router-view />
      </main>

    </div>
  </div>
</template>

<script lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "AuthLayout",
  components: {
    Header,
    Footer,
  },
};
</script>
  
<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to left,
      var(--gray),
      var(--light-gray));
}

.auth-container {
  width: 100%;
  max-width: 600px;
  height: 100%;
  max-height: 400px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 30px;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  box-sizing: border-box;
}
</style>
  